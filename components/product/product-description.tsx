import { AddToCart } from 'components/cart/add-to-cart';
import Price from 'components/price';
import Prose from 'components/prose';
import { Product } from 'lib/shopify/types';
import { ShortProductDescription } from './short-description';
import { VariantSelector } from './variant-selector';

export function ProductDescription({ product }: { product: Product }) {
  return (
    <>
      <div className="mb-6 flex flex-col border-b pb-6">
        <h1 className="mb-3 text-3xl font-bold">{product.title}</h1>
        <div className="mb-3 text-3xl font-bold">
          <Price
            amount={product.priceRange.maxVariantPrice.amount}
            currencyCode={product.priceRange.maxVariantPrice.currencyCode}
          />
        </div>
      </div>
      <VariantSelector options={product.options} variants={product.variants} />
      <ShortProductDescription product={product} />
      <AddToCart product={product} />
      {product.descriptionHtml ? (
        <Prose className="mt-6 text-sm leading-tight" html={product.descriptionHtml} />
      ) : null}
    </>
  );
}
