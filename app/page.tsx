import { FeaturedProductSlider } from '@/components/FeaturedProductSlider/FeaturedProductSlider';
import HeroSection from '@/components/Homepage/HeroSection';
import { TrendingProductSlider } from '@/components/TrendingProductSlider/TrendingProductSlider';
import Footer from 'components/layout/footer';
import { getMetaobject } from 'lib/shopify';

export const metadata = {
  description: 'High-performance ecommerce store built with Next.js, Vercel, and Shopify.',
  openGraph: {
    type: 'website'
  }
};

export default async function HomePage() {
  const data = await getMetaobject('hero_content');

  const heroContent = data.map((item: any) =>
    item.fields.reduce((acc: any, field: any) => {
      acc[field.key] = field.value;
      return acc;
    }, {})
  );
  return (
    <>
      <HeroSection heroData={heroContent} />
      <div className="px-4">
        <FeaturedProductSlider />
        <TrendingProductSlider />
      </div>
      <Footer />
    </>
  );
}
