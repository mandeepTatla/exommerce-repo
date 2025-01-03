'use client';

import { MegaMenu } from 'lib/shopify/types';
import Link from 'next/link';
import { useState } from 'react';

export default function DesktopMenu({ menu }: { menu: MegaMenu[] }) {
  const [hoveredMenu, setHoveredMenu] = useState<string | null>(null);

  const handleMouseEnter = (title: string) => setHoveredMenu(title);
  const handleMouseLeave = () => setHoveredMenu(null);

  return (
    <nav className="hidden items-center justify-center md:flex">
      <ul className="flex space-x-6">
        {menu.map((item) => (
          <li className="relative"
            key={item.title}
            onMouseEnter={() => handleMouseEnter(item.title)}
            onMouseLeave={handleMouseLeave}
          >
            <Link href={item.path} className="text-lg font-medium hover:underline capitalize">
              {item.title}
            </Link>
            {item.items && item.items.length > 0 && hoveredMenu === item.title && (
              <ul className="absolute left-[-70px] top-full z-50 h-[350px] w-80 border border-gray-200 bg-white px-4 pt-4 text-black shadow-lg">
                {item.items.map((nestedItem) => (
                  <li
                    key={nestedItem.title}
                    className="border-b border-gray-100 px-8 last:border-0 hover:bg-gray-100"
                  >
                    <Link href={nestedItem.path} className="block px-8 py-2 text-sm">
                      {nestedItem.title}
                    </Link>
                  </li>
                ))}
              </ul>
            )}
          </li>
        ))}
      </ul>
    </nav>
  );
}
