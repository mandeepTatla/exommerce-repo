'use client';

import { Dialog, Transition } from '@headlessui/react';
import { MegaMenu, Menu } from 'lib/shopify/types';
import Link from 'next/link';
import { usePathname, useSearchParams } from 'next/navigation';
import { Fragment, useEffect, useState } from 'react';
import { FaBars, FaMinus, FaPlus, FaXmark } from 'react-icons/fa6';

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

  // Render Menu Items - Non-clickable parent if it has children
  const renderMenuItems = (items: MegaMenu[], level = 0) => (
    <ul className={`pl-${level * 2 + 1} space-y-2`}>
      {items.map((item) => (
        <li key={item.title} className="flex flex-col">
          <div
            className={`flex items-center justify-between border-b border-[#ededed] px-4 py-2 text-lg text-black hover:bg-gray-100 ${
              level === 1 ? 'ml-6 mr-6' : ''
            }`}
          >
            {item.items && item.items.length > 0 ? (
              // Non-clickable title for parent with children
              <span className="flex-1 cursor-pointer">{item.title}</span>
            ) : (
              // Clickable link for items without children
              <Link href={item.path} prefetch={true} className="flex-1">
                {item.title}
              </Link>
            )}
            {item.items && item.items.length > 0 && (
              <button
                onClick={() => toggleItem(item.title)}
                aria-label={`Toggle ${item.title}`}
                className="flex items-center"
              >
                {expandedItems.includes(item.title) ? (
                  <>
                    {/* @ts-ignore */}
                    <FaMinus className="h-5 w-5 text-black" />
                  </>
                ) : (
                  <>
                    {/* @ts-ignore */}
                    <FaPlus className="h-5 w-5 text-black" />
                  </>
                )}
              </button>
            )}
          </div>

          {/* "Shop All" Link for Parent Categories */}
          {item.items && item.items.length > 0 && expandedItems.includes(item.title) && (
            <div className="overflow-hidden rounded-lg border-b border-[#ededed]">
              <Link
                href={item.path}
                prefetch={true}
                className="ml-6 mr-6 block border-b border-[#ededed] px-4 py-2 text-lg text-black hover:bg-gray-100"
              >
                Shop All {item.title}
              </Link>
              {renderMenuItems(item.items, level + 1)}
            </div>
          )}
        </li>
      ))}
    </ul>
  );

  return (
    <>
      <button className="pt-[7px]" onClick={openMobileMenu} aria-label="Open mobile menu">
        {/* @ts-ignore */}
        <FaBars className="text-[22px]" />
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
            <Dialog.Panel className="fixed bottom-0 left-0 right-0 top-0 flex h-full w-full flex-col overflow-y-auto bg-white shadow-lg">
              <div>
                <div className="flex items-center justify-between border-b border-[#D8D8D8] px-4 py-5 shadow-sm">
                  <div className="text-md font-bold">Menu</div>
                  <button onClick={closeMobileMenu} aria-label="Close mobile menu">
                    {/* @ts-ignore */}
                    <FaXmark className="h-6 w-6" />
                  </button>
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
