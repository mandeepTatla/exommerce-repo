import { AddToCart } from 'components/cart/add-to-cart';
import Price from 'components/price';
import Prose from 'components/prose';
import { Product } from 'lib/shopify/types';
import PaymentAndTrust from './Payment-and-trust';
import { ShortProductDescription } from './short-description';
import { VariantSelector } from './variant-selector';

export function ProductDescription({ product }: { product: Product }) {
  return (
    <>
      <div className="mt-2 flex flex-col pb-2">
        <h1 className="text-[1.1rem] mb-1 font-bold italic">{product.title}</h1>
        <div className="mb-1 text-[1rem] font-bold">
          <Price
            amount={product.priceRange.maxVariantPrice.amount}
            currencyCode={product.priceRange.maxVariantPrice.currencyCode}
          />
        </div>
      </div>
      <ShortProductDescription product={product} />
      <VariantSelector options={product.options} variants={product.variants} />
      <AddToCart product={product} />
      <PaymentAndTrust />
      {product.descriptionHtml ? (
        <Prose className="mt-6 text-sm leading-tight" html={product.descriptionHtml} />
      ) : null}
    </>
  );
}
