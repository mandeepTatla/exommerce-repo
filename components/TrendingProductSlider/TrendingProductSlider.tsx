import { getCollectionProducts } from 'lib/shopify';
import ProductSlider from '../ProductSilider/ProductSlider';

export async function TrendingProductSlider() {
  // Collections that start with `hidden-*` are hidden from the search page.
  const products = await getCollectionProducts({ collection: 'hidden-trending-products-carousel' });
  console.log(products);

  if (!products?.length) return null;

  return <ProductSlider title=" Trending Products" products={products} />;
}
