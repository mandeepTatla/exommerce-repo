import CartModal from 'components/cart/modal';
import { getMenu } from 'lib/shopify';
import Link from 'next/link';
import { Suspense } from 'react';
import DesktopMenu from './desktop-menu';
import MobileMenu from './mobile-menu';
import Search, { SearchSkeleton } from './search';

const { SITE_NAME } = process.env;

export async function Navbar() {
  const menu = await getMenu('next-js-frontend-header-menu');

  return (
    <div className="border-lightGray mb-3 border-b sticky top-0 bg-white z-50 shadow-md">
      <div className="flex justify-center bg-black p-1 text-white">Welcome to the store</div>
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
              <div className="ml-2 flex-none text-lg font-medium uppercase">
                {SITE_NAME}
              </div>
            </Link>
          </div>
          <div className="hidden justify-center md:flex md:w-1/3">
            <Suspense fallback={<SearchSkeleton />}>
              <Search />
            </Suspense>
          </div>
          <div className="flex justify-end md:w-1/3">
            <CartModal />
          </div>
        </div>
      </nav>
      <div className="block w-full p-[0rem_1rem_0.5rem] md:hidden md:p-0">
        <Suspense fallback={<SearchSkeleton />}>
          <Search />
        </Suspense>
      </div>

      <DesktopMenu  menu={menu} />
    </div>
  );
}
