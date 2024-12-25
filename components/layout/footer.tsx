import { getMenu } from 'lib/shopify';
import { SubscribeForm } from './SubscribeForm';

const { SITE_NAME } = process.env;

export default async function Footer() {
  const currentYear = new Date().getFullYear();
  const copyrightDate = 2023 + (currentYear > 2023 ? `-${currentYear}` : '');
  const menu = await getMenu('next-js-frontend-footer-menu');
  const copyrightName = SITE_NAME || '';

  return (
    <footer className="bg-black">
      <div className="mx-auto max-w-screen-2xl items-center justify-between overflow-hidden p-[1rem_1rem_0.5rem] px-4 md:p-4 lg:px-6">
        <nav
          aria-label="Footer"
          className="-mb-6 flex flex-wrap justify-center gap-x-12 gap-y-3 text-sm/6"
        >
          {menu.map((item) => (
            <a key={item.title} href={item.path} className="text-white hover:text-white">
              {item.title}
            </a>
          ))}
        </nav>
        <div className="mt-16 border-t border-white/10 pt-8 sm:mt-20 lg:mt-20 lg:flex lg:items-center lg:justify-between">
          <div>
            <h3 className="text-md/10 font-semibold text-white">Subscribe to our newsletter</h3>
            <p className="text-md/5 mt-2 text-gray-300">
              Get notified about latest products, discounts, announcements and articles.
            </p>
          </div>
          <SubscribeForm />
        </div>
      </div>
      <p className="align-center mt-2 flex justify-center bg-white p-4 text-sm/6 text-[#666666] md:order-1 md:mt-0">
        &copy; {copyrightDate} {copyrightName}. All rights reserved.
      </p>
    </footer>
  );
}
