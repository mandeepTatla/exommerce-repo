import { Search } from 'components/algoliaSearch/algoliaSearch';
import CartModal from 'components/cart/modal';
import { getMenu } from 'lib/shopify';
import Link from 'next/link';
import { Suspense } from 'react';
import DesktopMenu from './desktop-menu';
import DynamicMessages from './DynamicMessages';
import MobileMenu from './mobile-menu';

const { SITE_NAME } = process.env;

export async function Navbar() {
  const menu = await getMenu('next-js-frontend-header-menu');
  const messages = [
    'Welcome to our store, where quality meets value!',
    'Enjoy free shipping on orders over $50!',
    'Fast and reliable delivery to your doorstep.'
  ];

  return (
    <div className="sticky top-0 z-50 mb-3 border-b border-lightGray bg-white shadow-md">
      <DynamicMessages messages={messages} />
      <nav className="relative mx-auto flex max-w-screen-2xl items-center justify-between p-[1rem_1rem_0.5rem] px-4 md:p-4 lg:px-6">
        <div className="block flex-none md:hidden">
          <Suspense fallback={null}>
            <MobileMenu menu={menu} />
          </Suspense>
        </div>
        <div className="flex w-full items-center">
          <div className="flex w-full md:w-1/3">
            <Link
              href="/"
              prefetch={true}
              className="mr-2 flex w-full items-center justify-center md:w-auto lg:mr-6"
            >
              <div className="ml-2 flex-none text-lg font-medium uppercase">{SITE_NAME}</div>
            </Link>
          </div>
          <div style={{ minHeight: '46px' }} className="hidden justify-center md:flex md:w-1/3">
            <Search />
          </div>
          <div className="flex justify-end md:w-1/3">
            <CartModal />
          </div>
        </div>
      </nav>
      <div
        style={{ minHeight: '54px' }}
        className="block w-full p-[0rem_1rem_0.5rem] md:hidden md:p-0"
      >
        <Search />
      </div>

      <DesktopMenu menu={menu} />
    </div>
  );
}
