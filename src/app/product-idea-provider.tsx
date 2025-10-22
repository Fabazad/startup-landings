'use client';

import { createContext, useContext, useEffect, useState } from 'react';
import { LanguageValue, useTranslate } from 'src/locales';
import { ProductIdea, RawProductIdea, translateProductIdea } from 'src/types/ProductIdea';

const Ctx = createContext<ProductIdea | null>(null);

export const useProductIdea = () => {
  const productIdea = useContext(Ctx);
  if (!productIdea) throw new Error('useProductIdea must be use inside ProductIdeaProvider');
  return productIdea;
};

export const ProductIdeaProvider = ({
  rawProductIdea,
  children,
}: {
  rawProductIdea: RawProductIdea;
  children: React.ReactNode;
}) => {
  const { currentLang } = useTranslate();
  const [productIdea, setProductIdea] = useState<ProductIdea>(
    translateProductIdea(rawProductIdea, currentLang.value as LanguageValue)
  );
  useEffect(() => {
    setProductIdea(translateProductIdea(rawProductIdea, currentLang.value as LanguageValue));
  }, [currentLang]);
  return <Ctx.Provider value={productIdea}>{children}</Ctx.Provider>;
};
