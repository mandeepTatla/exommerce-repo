'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useRef, useState } from 'react';
import { FaAngleLeft, FaAngleRight } from 'react-icons/fa6';
import { A11y, Navigation, Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import Price from '../price';
import styles from './ProductSlider.module.css';

const ProductSlider = ({ title, products }: { title: string; products: any[] }) => {
  const prevButtonRef = useRef<HTMLButtonElement>(null);
  const nextButtonRef = useRef<HTMLButtonElement>(null);

  const [isBeginning, setIsBeginning] = useState(true);
  const [isEnd, setIsEnd] = useState(false);

  if (!products || products.length === 0) return null;

  return (
    <div className={`${styles.container} mx-auto mb-6 mt-6 max-w-[1500px] px-4`}>
      <div className="flex items-center justify-between gap-4 pb-4">
        <h2 className="text-customGray text-[1.2rem] font-bold">{title}</h2>
        <div className="flex items-center gap-2">
          <div>See more</div>
          <button
            ref={prevButtonRef}
            disabled={isBeginning}
            className={`rounded-full bg-gray-200 p-2 hover:bg-gray-300 ${
              isBeginning ? 'cursor-not-allowed opacity-50' : ''
            }`}
            aria-label="Previous"
          >
            <FaAngleLeft />
          </button>
          <button
            ref={nextButtonRef}
            disabled={isEnd}
            className={`rounded-full bg-gray-200 p-2 hover:bg-gray-300 ${
              isEnd ? 'cursor-not-allowed opacity-50' : ''
            }`}
            aria-label="Next"
          >
            <FaAngleRight />
          </button>
        </div>
      </div>
      <Swiper
        modules={[Pagination, A11y, Navigation]}
        navigation={{
          prevEl: prevButtonRef.current,
          nextEl: nextButtonRef.current
        }}
        pagination={{
          type: 'bullets',
          clickable: true,
          dynamicBullets: true
        }}
        slidesPerView={2}
        breakpoints={{
          640: { slidesPerView: 2 },
          768: { slidesPerView: 2 },
          1024: { slidesPerView: 3 },
          1280: { slidesPerView: 4 }
        }}
        className="w-full"
        onBeforeInit={(swiper) => {
          if (swiper.params.navigation && typeof swiper.params.navigation !== 'boolean') {
            swiper.params.navigation.prevEl = prevButtonRef.current;
            swiper.params.navigation.nextEl = nextButtonRef.current;
          }
          swiper.navigation.update();
        }}
        onSlideChange={(swiper) => {
          setIsBeginning(swiper.isBeginning);
          setIsEnd(swiper.isEnd);
        }}
      >
        {products.map((product, index) => (
          <SwiperSlide key={index}>
            <div className="flex flex-col overflow-hidden rounded-lg bg-white shadow">
              <Link
                href={`/product/${product.handle}`}
                className="relative inline-block h-full w-full"
                prefetch={true}
              >
                {/* Product Image */}
                <Image
                  alt={product.title}
                  src={product.featuredImage?.url}
                  width={255}
                  height={255}
                  className="bg-white-200 aspect-square w-full rounded-md object-contain group-hover:opacity-75"
                />
                {/* Product Details */}
                <div className="pb-4 pt-4 text-center">
                  <h3 className="text-sm font-medium text-gray-900">{product.title}</h3>
                  <div className="mt-4">
                    <Price
                      amount={product.priceRange.maxVariantPrice.amount}
                      currencyCode={product.priceRange.maxVariantPrice.currencyCode}
                    />
                  </div>
                </div>
              </Link>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default ProductSlider;
