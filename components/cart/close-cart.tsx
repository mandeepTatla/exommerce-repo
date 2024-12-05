import { XMarkIcon } from '@heroicons/react/24/outline';
import clsx from 'clsx';

export default function CloseCart({ className }: { className?: string }) {
  return (
    <div className="relative flex h-12 w-12 items-center justify-center  text-white transition-colors">
      <XMarkIcon className={clsx('h-7 transition-all ease-in-out hover:scale-110', className)} />
    </div>
  );
}
