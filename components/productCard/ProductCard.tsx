import Price from 'components/price';
import { Product } from 'lib/shopify/types';
import Image from 'next/image';
import Link from 'next/link';

type Products = {
  products: Product[];
};

export default function ProductCard(props: Products) {
  return (
    <div className="mx-auto max-w-7xl overflow-hidden sm:px-6 lg:px-8">
      <div className="-mx-px grid grid-cols-2 border-l border-gray-200 sm:mx-0 md:grid-cols-3 lg:grid-cols-4">
        {props.products.map((product) => (
          <div
            key={product.id}
            className="group relative border-b border-r border-t border-gray-200 p-4 sm:p-6"
          >
            <Link
              className="relative inline-block h-full w-full"
              href={`/product/${product.handle}`}
              prefetch={true}
            >
              <Image
                alt={product.title}
                src={product.featuredImage?.url}
                width={255}
                height={255}
                className="bg-white-200 aspect-square rounded-md object-contain group-hover:opacity-75"
              />

              <div className="pb-4 pt-10 text-center">
                <h3 className="text-sm font-medium text-gray-900">{product.title}</h3>
                <div className="mt-4">
                  <Price
                    amount={product.priceRange.maxVariantPrice.amount}
                    currencyCode={product.priceRange.maxVariantPrice.currencyCode}
                  />
                </div>
              </div>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}
