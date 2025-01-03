'use client';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { Autoplay, Navigation, Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import classes from './gallery.module.css';

import Image from 'next/image';

export function Gallery({ images }: { images: { src: string; altText: string }[] }) {
  const showControls = images.length > 1;

  return (
    <div
      className={` ${classes.container} border-grey-200 relative flex aspect-square h-full max-h-[644px] w-full items-center justify-center overflow-hidden rounded-lg border bg-white`}
    >
      <Swiper
        style={
          {
            '--swiper-navigation-size': '20px'
          } as React.CSSProperties
        }
        modules={[Autoplay, Navigation, Pagination]}
        autoplay={{
          delay: 4000,
          disableOnInteraction: true,
          pauseOnMouseEnter: true
        }}
        loop={showControls}
        navigation={showControls}
        pagination={showControls ? { clickable: true } : false}
        className="h-full w-full"
      >
        {images.map((image, index) => (
          <SwiperSlide key={index}>
            <Image
              className="max-h-full max-w-full object-contain"
              fill
              sizes="(min-width: 1024px) 66vw, 100vw"
              alt={image.altText}
              src={image.src}
              priority
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
