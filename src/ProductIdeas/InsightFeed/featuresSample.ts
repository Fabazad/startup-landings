import { CONFIG } from 'src/config-global';
import { RawFeature } from 'src/types/ProductIdea';

export const FEATURES_SAMPLE: RawFeature[] = [
  {
    icon: 'mdi:check',
    title: {
      fr: 'Identification automatique des SaaS concurrents.',
      en: 'Automatic identification of SaaS competitors.',
    },
    pain: {
      fr: 'Ne sais pas quoi faire ?',
      en: "Don't know what to do?",
    },
    items: [
      {
        icon: 'mdi:magnify-scan',
        title: {
          fr: 'Identification automatique des SaaS concurrents.',
          en: 'Automatic identification of SaaS competitors.',
        },
      },
      {
        icon: 'mdi:file-document-outline',
        title: {
          fr: 'Fiches complètes.',
          en: 'Complete profiles.',
        },
        description: {
          fr: 'CA, employés, création, localisation.',
          en: 'CA, employees, creation, location.',
        },
      },
      {
        icon: 'mdi:chart-box-outline',
        title: {
          fr: 'Vue claire du paysage concurrentiel.',
          en: 'Clear view of the competitive landscape.',
        },
      },
    ],
    imgUrl: `${CONFIG.assetsDir}/assets/images/home/home-chart.webp`,
  },
  {
    icon: 'mdi:check',
    title: {
      fr: 'Analyser leur marché.',
      en: 'Analyze their market.',
    },
    pain: {
      fr: 'Identification automatique des SaaS concurrents.',
      en: 'Automatic identification of SaaS competitors.',
    },
    items: [
      {
        icon: 'mdi:check',
        title: {
          fr: 'Avis clients triés par thèmes & évolution dans le temps.',
          en: 'Customer reviews sorted by themes & evolution over time.',
        },
      },
      {
        icon: 'mdi:file-document-outline',
        title: {
          fr: 'Comparatif des features, cibles et stratégies.',
          en: 'Comparison of features, targets and strategies.',
        },
      },
      {
        icon: 'mdi:chart-box-outline',
        title: {
          fr: 'Données fiables pour détecter forces & faiblesses.',
          en: 'Reliable data to detect strengths & weaknesses.',
        },
      },
    ],
    imgUrl: `${CONFIG.assetsDir}/assets/images/home/home-chart.webp`,
  },
  {
    icon: 'lucide:check-line',
    title: {
      fr: 'Surveiller leurs moves en temps réel.',
      en: 'Monitor their moves in real time.',
    },
    pain: {
      fr: 'Identification automatique des SaaS concurrents.',
      en: 'Automatic identification of SaaS competitors.',
    },
    items: [
      {
        icon: 'mdi:check',
        title: {
          fr: 'Avis clients',
          en: 'Customer reviews',
        },
        description: {
          fr: 'Avis clients triés par thèmes & évolution dans le temps..',
          en: 'Customer reviews sorted by themes & evolution over time..',
        },
      },
      {
        icon: 'mdi:file-document-outline',
        title: {
          fr: 'Fonctionnalités',
          en: 'Features',
        },
        description: {
          fr: 'Comparatif des fonctionnalités, cibles et stratégies.',
          en: 'Comparison of features, targets and strategies.',
        },
      },
      {
        icon: 'mdi:chart-box-outline',
        title: {
          fr: 'Cibles',
          en: 'Targets',
        },
        description: {
          fr: 'Données fiables pour détecter forces & faiblesses.',
          en: 'Reliable data to detect strengths & weaknesses.',
        },
      },
    ],
    imgUrl: `${CONFIG.assetsDir}/assets/images/home/home-chart.webp`,
  },
];
