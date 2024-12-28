import Image from 'next/image';
import { FaApplePay, FaGooglePay, FaLock, FaPaypal, FaStore } from 'react-icons/fa6';
import MasterCard from './Images/mastercard.svg';

import { RiVisaLine } from 'react-icons/ri';
import { TbTruckDelivery } from 'react-icons/tb';

export default function PaymentAndTrust() {
  return (
    <div className="mt-6 space-y-6">
      {/* Payment Options */}
      <div className="flex flex-col items-center hidden">
        <div className="flex items-center justify-center space-x-6">
          {/* @ts-expect-error */}
          <FaGooglePay className="text-4xl sm:text-5xl" />
          {/* @ts-expect-error */}
          <FaApplePay className="text-4xl sm:text-5xl" />
          {/* @ts-expect-error */}
          <FaPaypal className="text-1xl sm:text-3xl" />
          {/* @ts-expect-error */}
          <RiVisaLine className="text-4xl sm:text-5xl" />
          <Image
            src={MasterCard}
            alt="Mastercard"
            width={50}
            height={50}
            className="w-8 sm:w-10 lg:w-14"
          />
        </div>
      </div>

      <div className="mt-3 flex gap-2.5">
        <div className="flex transform flex-col items-center bg-[#f5f5f5] p-3 text-center transition-transform hover:scale-105">
          {/* @ts-expect-error */}
          <FaLock className="mb-3 text-2xl text-gray-700" />
          <p className="text-sm font-medium text-gray-800">Secure Checkout</p>
        </div>

        <div className="flex transform flex-col items-center bg-[#f5f5f5] p-3 text-center transition-transform hover:scale-105">
          {/* @ts-expect-error */}
          <FaStore className="mb-3 text-2xl text-gray-700" />
          <p className="text-sm font-medium text-gray-800">Australian Owned</p>
        </div>

        <div className="flex transform flex-col items-center bg-[#f5f5f5] p-3 text-center transition-transform hover:scale-105">
          {/* @ts-expect-error */}
          <TbTruckDelivery className="mb-3 text-2xl text-gray-700" />
          <p className="text-sm font-medium text-gray-800">Guaranteed Delivery</p>
        </div>
      </div>
    </div>
  );
}
