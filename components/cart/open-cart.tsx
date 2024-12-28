'use client';

import { FaBagShopping } from 'react-icons/fa6';

export default function OpenCart({
  className,
  quantity
}: {
  className?: string;
  quantity?: number;
}) {
  return (
    <div className="relative flex items-center justify-center text-black transition-colors">
      {/* @ts-expect-error */}
      <FaBagShopping className="text-[22px]" />

      {quantity ? (
        <div className="absolute right-[-2px] top-[-2px] -mr-2 -mt-2 h-4 w-4 rounded bg-black text-[11px] font-medium text-white">
          {quantity}
        </div>
      ) : null}
    </div>
  );
}
