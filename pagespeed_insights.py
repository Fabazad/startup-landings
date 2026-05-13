"""Analyse les performances d'une URL avec l'API Google PageSpeed Insights.

Usage:
    python pagespeed_insights.py [URL]
    python pagespeed_insights.py https://example.com

Variable d'environnement optionnelle:
    PAGESPEED_API_KEY - Clé API Google (recommandée pour éviter le rate limiting)
"""

from __future__ import annotations

import json
import os
import sys
from typing import Any
from urllib.parse import urlencode
from urllib.request import Request, urlopen
from urllib.error import HTTPError, URLError

API_ENDPOINT = "https://www.googleapis.com/pagespeedonline/v5/runPagespeed"
DEFAULT_URL = "https://votre-site.com"
STRATEGIES = ("mobile", "desktop")


def fetch_pagespeed(url: str, strategy: str, api_key: str | None = None) -> dict[str, Any]:
    """Appelle l'API PageSpeed Insights et retourne la réponse JSON."""
    params: dict[str, str] = {
        "url": url,
        "strategy": strategy,
        "category": "performance",
    }
    if api_key:
        params["key"] = api_key

    request_url = f"{API_ENDPOINT}?{urlencode(params, doseq=True)}"
    # category doit être répété pour chaque catégorie - mais ici on n'en demande qu'une
    request = Request(request_url, headers={"Accept": "application/json"})

    with urlopen(request, timeout=60) as response:
        return json.loads(response.read().decode("utf-8"))


def extract_core_metrics(data: dict[str, Any]) -> dict[str, dict[str, Any]]:
    """Extrait les Core Web Vitals (LCP, FID/INP, CLS) depuis la réponse API.

    Note: FID est déprécié depuis mars 2024 et remplacé par INP. On retourne les deux
    si disponibles.
    """
    metrics: dict[str, dict[str, Any]] = {}
    lighthouse = data.get("lighthouseResult", {})
    audits = lighthouse.get("audits", {})

    audit_map = {
        "LCP": "largest-contentful-paint",
        "CLS": "cumulative-layout-shift",
        "TBT": "total-blocking-time",
        "FCP": "first-contentful-paint",
        "SI": "speed-index",
    }

    for label, audit_id in audit_map.items():
        audit = audits.get(audit_id)
        if audit:
            metrics[label] = {
                "display": audit.get("displayValue", "N/A"),
                "score": audit.get("score"),
                "numeric_value": audit.get("numericValue"),
            }

    # Données terrain (CrUX) - FID et INP si disponibles
    loading_experience = data.get("loadingExperience", {})
    field_metrics = loading_experience.get("metrics", {})

    fid = field_metrics.get("FIRST_INPUT_DELAY_MS")
    if fid:
        metrics["FID (terrain)"] = {
            "display": f"{fid.get('percentile', 'N/A')} ms",
            "category": fid.get("category"),
        }

    inp = field_metrics.get("INTERACTION_TO_NEXT_PAINT")
    if inp:
        metrics["INP (terrain)"] = {
            "display": f"{inp.get('percentile', 'N/A')} ms",
            "category": inp.get("category"),
        }

    return metrics


def extract_top_opportunities(data: dict[str, Any], limit: int = 3) -> list[dict[str, Any]]:
    """Extrait les opportunités d'optimisation triées par économie de temps."""
    lighthouse = data.get("lighthouseResult", {})
    audits = lighthouse.get("audits", {})

    opportunities = []
    for audit_id, audit in audits.items():
        details = audit.get("details", {})
        if details.get("type") != "opportunity":
            continue
        savings_ms = details.get("overallSavingsMs", 0) or 0
        if savings_ms <= 0:
            continue
        opportunities.append({
            "id": audit_id,
            "title": audit.get("title", audit_id),
            "description": audit.get("description", ""),
            "display_value": audit.get("displayValue", ""),
            "savings_ms": savings_ms,
        })

    opportunities.sort(key=lambda x: x["savings_ms"], reverse=True)
    return opportunities[:limit]


def format_score(score: float | None) -> str:
    """Convertit un score Lighthouse (0-1) en pourcentage avec indicateur visuel."""
    if score is None:
        return "N/A"
    pct = round(score * 100)
    if pct >= 90:
        indicator = "[BON]"
    elif pct >= 50:
        indicator = "[MOYEN]"
    else:
        indicator = "[FAIBLE]"
    return f"{pct}/100 {indicator}"


def print_report(url: str, strategy: str, data: dict[str, Any]) -> None:
    """Affiche un rapport formaté pour une stratégie donnée."""
    header = f" RAPPORT {strategy.upper()} - {url} "
    print("\n" + "=" * 70)
    print(header.center(70, "="))
    print("=" * 70)

    lighthouse = data.get("lighthouseResult", {})
    perf_category = lighthouse.get("categories", {}).get("performance", {})
    perf_score = perf_category.get("score")
    print(f"\nScore de performance global : {format_score(perf_score)}")

    print("\n--- Core Web Vitals & Métriques principales ---")
    metrics = extract_core_metrics(data)
    if not metrics:
        print("  Aucune métrique disponible.")
    else:
        for label, info in metrics.items():
            display = info.get("display", "N/A")
            score = info.get("score")
            category = info.get("category")
            extra = ""
            if score is not None:
                extra = f"  (score: {format_score(score)})"
            elif category:
                extra = f"  (catégorie: {category})"
            print(f"  - {label:18s} : {display}{extra}")

    print("\n--- Top 3 opportunités d'optimisation ---")
    opportunities = extract_top_opportunities(data, limit=3)
    if not opportunities:
        print("  Aucune opportunité d'optimisation détectée.")
    else:
        for idx, opp in enumerate(opportunities, start=1):
            savings_s = opp["savings_ms"] / 1000
            print(f"\n  {idx}. {opp['title']}")
            print(f"     Économie estimée : ~{savings_s:.2f} s")
            if opp["display_value"]:
                print(f"     Détail : {opp['display_value']}")
            description = opp["description"].split(".")[0]
            if description:
                print(f"     {description}.")


def analyze(url: str, api_key: str | None = None) -> int:
    """Lance l'analyse pour Mobile et Desktop et affiche les rapports."""
    print(f"Analyse PageSpeed Insights pour : {url}")
    if not api_key:
        print("(Aucune clé API fournie - définissez PAGESPEED_API_KEY pour éviter le rate limiting)")

    exit_code = 0
    for strategy in STRATEGIES:
        print(f"\n>>> Requête en cours ({strategy})...")
        try:
            data = fetch_pagespeed(url, strategy, api_key)
        except HTTPError as e:
            body = e.read().decode("utf-8", errors="replace")
            print(f"Erreur HTTP {e.code} pour {strategy} : {body[:300]}")
            exit_code = 1
            continue
        except URLError as e:
            print(f"Erreur réseau pour {strategy} : {e.reason}")
            exit_code = 1
            continue

        if "error" in data:
            err = data["error"]
            print(f"Erreur API ({strategy}) : {err.get('message', 'inconnue')}")
            exit_code = 1
            continue

        print_report(url, strategy, data)

    return exit_code


def main() -> int:
    url = sys.argv[1] if len(sys.argv) > 1 else DEFAULT_URL
    api_key = os.environ.get("PAGESPEED_API_KEY")
    return analyze(url, api_key)


if __name__ == "__main__":
    sys.exit(main())
