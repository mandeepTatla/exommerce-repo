import { FaXmark } from 'react-icons/fa6';

export default function CloseCart() {
  return (
    <div className="relative flex h-12 w-12 items-center justify-end text-white">
      {/* @ts-ignore */}
      <FaXmark title="Close cart" className="h-6 w-6" />
    </div>
  );
}
