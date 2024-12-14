'use client';
import Image from 'next/image';
import Link from 'next/link';
import { A11y, Autoplay, Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';

const HeroSection = ({ heroData }: { heroData: any[] }) => {
  if (!heroData || heroData.length === 0) return null;

  return (
    <div className="d-grid w-100 relative mx-auto mb-1 mt-[-0.75rem] pt-0">
      <Swiper
        modules={[Pagination, A11y, Autoplay]}
        pagination={{ type: 'bullets' }}
        loop={true}
        autoplay={{
          delay: 2000,
          disableOnInteraction: true
        }}
      >
        {heroData.map((slide, index) => (
          <SwiperSlide key={index}>
            <div className="w-100 h-[514px] lg:h-[650px]">
              <Image
                loading="eager"
                className="d-block h-full w-full object-cover"
                src={slide.image_url}
                fill
                alt={slide.title}
                quality={100}
              />

              <div className="d-flex flex-column absolute top-[300px] h-full w-full">
                <div className="z-1 d-grid mr-lg-auto ml-lg-auto mb-auto mt-auto">
                  <div className="ml-auto mr-auto mt-1 text-center">
                    <h1 className="mb-4 text-4xl font-bold text-white">{slide.title}</h1>
                    <Link
                      href={slide.url}
                      className="inline-block rounded bg-black px-6 py-3 text-white"
                    >
                      {slide.cta_text}
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default HeroSection;
