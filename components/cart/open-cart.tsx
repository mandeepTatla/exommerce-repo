import { ShoppingCartIcon } from '@heroicons/react/24/outline';
import clsx from 'clsx';

export default function OpenCart({
  className,
  quantity
}: {
  className?: string;
  quantity?: number;
}) {
  return (
    <div className="relative flex items-center justify-center  text-black transition-colors">
      <ShoppingCartIcon
        className={clsx('h-7 transition-all ease-in-out hover:scale-110', className)}
      />

      {quantity ? (
        <div className="absolute right-0 top-0 -mr-2 -mt-2 h-4 w-4 rounded bg-black text-[11px] font-medium text-white">
          {quantity}
        </div>
      ) : null}
    </div>
  );
}
