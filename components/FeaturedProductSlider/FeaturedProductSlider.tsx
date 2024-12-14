import { getCollectionProducts } from 'lib/shopify';
import ProductSlider from '../ProductSilider/ProductSlider';

export async function FeaturedProductSlider() {
  // Collections that start with `hidden-*` are hidden from the search page.
  const products = await getCollectionProducts({ collection: 'hidden-featured-products-carousel' });

  if (!products?.length) return null;

  return <ProductSlider title="Featured Product" products={products} />;
}
