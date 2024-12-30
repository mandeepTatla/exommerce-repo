'use client';

import { useProduct } from 'components/product/product-context';

export const PriceDisplayPDP = ({ product }: any) => {
  const { state } = useProduct();

  const price = state.price || product.priceRange.minVariantPrice.amount;
  const currencyCode = product.priceRange.minVariantPrice.currencyCode;

  return (
    <p className="text-xl font-bold">
      {new Intl.NumberFormat('en-AU', {
        style: 'currency',
        currency: currencyCode
      }).format(parseFloat(price))}
    </p>
  );
};
