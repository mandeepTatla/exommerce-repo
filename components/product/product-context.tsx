'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import React, { createContext, useContext, useMemo, useState } from 'react';

type ProductState = {
  [key: string]: string;
} & {
  image?: string;
  price?: string;
};

type ProductContextType = {
  state: ProductState;
  updateOption: (name: string, value: string) => void;
  updateImage: (index: string) => void;
};

const ProductContext = createContext<ProductContextType | undefined>(undefined);

export function ProductProvider({
  children,
  initialVariants
}: {
  children: React.ReactNode;
  initialVariants: any;
}) {
  const searchParams = useSearchParams();

  const [variants] = useState(initialVariants);

  const getInitialState = () => {
    const params: ProductState = {};
    for (const [key, value] of searchParams.entries()) {
      params[key] = value;
    }
    return params;
  };

  const [state, setState] = useState<ProductState>(getInitialState());

  console.log(state, 'state');

  const updateOption = (name: string, value: string) => {
    const newState = { ...state, [name.toLowerCase()]: value };

    // Attempt to find the matching variant
    const selectedVariant = variants.find((variant: any) =>
      variant.selectedOptions.every((opt: any) => newState[opt.name.toLowerCase()] === opt.value)
    );

    if (selectedVariant) {
      newState.price = selectedVariant.price.amount;
    }

    setState(newState);
  };

  const updateImage = (index: string) => {
    const newState = { image: index };
    setState(newState);
  };

  const value = useMemo(
    () => ({
      state,
      updateOption,
      updateImage
    }),
    [state]
  );

  return <ProductContext.Provider value={value}>{children}</ProductContext.Provider>;
}

export function useProduct() {
  const context = useContext(ProductContext);
  if (context === undefined) {
    throw new Error('useProduct must be used within a ProductProvider');
  }
  return context;
}

export function useUpdateURL() {
  const router = useRouter();

  return (state: ProductState) => {
    const newParams = new URLSearchParams(window.location.search);
    const { price, ...urlState } = state;
    Object.entries(urlState).forEach(([key, value]) => {
      newParams.set(key, value);
    });
    router.push(`?${newParams.toString()}`, { scroll: false });
  };
}
