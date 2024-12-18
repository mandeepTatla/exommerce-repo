'use client';

import { Dialog, Transition } from '@headlessui/react';
import Link from 'next/link';
import { usePathname, useSearchParams } from 'next/navigation';
import { Fragment, Suspense, useEffect, useState } from 'react';

import { ChevronDownIcon, XMarkIcon } from '@heroicons/react/24/outline';
import { MegaMenu, Menu } from 'lib/shopify/types';
import { FaBars } from 'react-icons/fa6';
import Search, { SearchSkeleton } from './search';

export default function MobileMenu({ menu }: { menu: Menu[] }) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [isOpen, setIsOpen] = useState(false);
  const [expandedItems, setExpandedItems] = useState<string[]>([]);

  const openMobileMenu = () => setIsOpen(true);
  const closeMobileMenu = () => setIsOpen(false);

  const toggleItem = (title: string) => {
    setExpandedItems((prev) =>
      prev.includes(title) ? prev.filter((item) => item !== title) : [...prev, title]
    );
  };

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 768) {
        setIsOpen(false);
      }
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [isOpen]);

  useEffect(() => {
    setIsOpen(false);
  }, [pathname, searchParams]);

  const renderMenuItems = (items: MegaMenu[], level = 0) => (
    <ul className={`pl-${level * 2 + 1} space-y-2`}>
      {items.map((item) => (
        <li key={item.title} className="flex flex-col">
          <div
            className="flex items-center justify-between border-b border-[#D8D8D8] p-3 text-lg text-black hover:bg-gray-100"
            onClick={() =>
              item.items && item.items.length ? toggleItem(item.title) : closeMobileMenu()
            }
          >
            <Link href={item.path} prefetch={true} className="flex-1">
              {item.title}
            </Link>
            {item.items && item.items.length > 0 && (
              <ChevronDownIcon
                className={`h-5 transform transition-transform ${
                  expandedItems.includes(item.title) ? 'rotate-180' : 'rotate-0'
                }`}
              />
            )}
          </div>
          {item.items && item.items.length > 0 && expandedItems.includes(item.title) && (
            <div className="p-2">{renderMenuItems(item.items, level + 1)}</div>
          )}
        </li>
      ))}
    </ul>
  );

  return (
    <>
      <button className="pt-[7px]" onClick={openMobileMenu} aria-label="Open mobile menu">
        <FaBars className='text-[22px]' />
      </button>
      <Transition show={isOpen}>
        <Dialog onClose={closeMobileMenu} className="relative z-50">
          <Transition.Child
            as={Fragment}
            enter="transition-all ease-in-out duration-300"
            enterFrom="opacity-0 backdrop-blur-none"
            enterTo="opacity-100 backdrop-blur-[.5px]"
            leave="transition-all ease-in-out duration-200"
            leaveFrom="opacity-100 backdrop-blur-[.5px]"
            leaveTo="opacity-0 backdrop-blur-none"
          >
            <div className="fixed inset-0 bg-black/30" aria-hidden="true" />
          </Transition.Child>
          <Transition.Child
            as={Fragment}
            enter="transition-all ease-in-out duration-300"
            enterFrom="translate-x-[-100%]"
            enterTo="translate-x-0"
            leave="transition-all ease-in-out duration-200"
            leaveFrom="translate-x-0"
            leaveTo="translate-x-[-100%]"
          >
            <Dialog.Panel className="fixed bottom-0 left-0 right-0 top-0 flex h-full w-full flex-col overflow-y-auto bg-white">
              <div>
                <button
                  className="mb-4 flex h-11 w-11 items-center justify-center text-black transition-colors"
                  onClick={closeMobileMenu}
                  aria-label="Close mobile menu"
                >
                  <XMarkIcon className="h-8" />
                </button>

                <div className="mb-4 w-full p-2">
                  <Suspense fallback={<SearchSkeleton />}>
                    <Search />
                  </Suspense>
                </div>
                {menu.length ? renderMenuItems(menu) : null}
              </div>
            </Dialog.Panel>
          </Transition.Child>
        </Dialog>
      </Transition>
    </>
  );
}
