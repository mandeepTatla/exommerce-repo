import { AddToCart } from 'components/cart/add-to-cart';

import Prose from 'components/prose';
import { Product } from 'lib/shopify/types';
import PaymentAndTrust from './Payment-and-trust';
import { PriceDisplayPDP } from './price-display-pdp';
import { ShortProductDescription } from './short-description';
import { VariantSelector } from './variant-selector';

export function ProductDescription({ product }: { product: Product }) {
  return (
    <>
      <div className="mt-2 flex flex-col pb-2">
        <h1 className="mb-1 text-[1.1rem] font-bold leading-tight">{product.title}</h1>
        <div className="mb-1 text-[1rem] font-bold">
          <PriceDisplayPDP product={product} />
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
