"use client";

import { useState } from "react";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import { ChevronLeft, ChevronRight, X } from "lucide-react";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

export interface AboutGalleryImage {
  src: string;
  alt: string;
}

interface Props {
  images: AboutGalleryImage[];
}

export default function AboutGalleryCarousel({ images }: Props) {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  function previousImage() {
    setActiveIndex((index) => (index === null ? null : (index - 1 + images.length) % images.length));
  }

  function nextImage() {
    setActiveIndex((index) => (index === null ? null : (index + 1) % images.length));
  }

  return (
    <div className="relative about-gallery-carousel">
      <div className="mb-5 flex items-center justify-end gap-3">
        <button
          type="button"
          className="about-gallery-prev flex h-11 w-11 items-center justify-center rounded-full border border-[#002D62]/10 bg-white text-[#002D62] shadow-md transition-colors hover:bg-[#002D62] hover:text-white disabled:cursor-not-allowed disabled:opacity-40"
          aria-label="Previous gallery images"
        >
          <ChevronLeft className="h-5 w-5" />
        </button>
        <button
          type="button"
          className="about-gallery-next flex h-11 w-11 items-center justify-center rounded-full border border-[#002D62]/10 bg-white text-[#002D62] shadow-md transition-colors hover:bg-[#002D62] hover:text-white disabled:cursor-not-allowed disabled:opacity-40"
          aria-label="Next gallery images"
        >
          <ChevronRight className="h-5 w-5" />
        </button>
      </div>

      <Swiper
        modules={[Navigation, Pagination]}
        navigation={{
          prevEl: ".about-gallery-prev",
          nextEl: ".about-gallery-next",
          disabledClass: "opacity-40",
        }}
        pagination={{ clickable: true }}
        spaceBetween={16}
        slidesPerView={1.08}
        breakpoints={{
          640: { slidesPerView: 2.1 },
          1024: { slidesPerView: 3.2 },
          1280: { slidesPerView: 4 },
        }}
        className="!pb-12"
      >
        {images.map((image, index) => (
          <SwiperSlide key={image.src}>
            <button
              type="button"
              onClick={() => setActiveIndex(index)}
              className="group relative block aspect-[4/3] w-full overflow-hidden rounded-2xl bg-white shadow-md border border-white cursor-zoom-in"
              aria-label={`Open gallery image ${index + 1}`}
            >
              <Image
                src={image.src}
                alt={image.alt}
                fill
                sizes="(max-width: 640px) 92vw, (max-width: 1024px) 46vw, (max-width: 1280px) 31vw, 25vw"
                className="object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#002D62]/25 via-transparent to-transparent" />
            </button>
          </SwiperSlide>
        ))}
      </Swiper>

      {activeIndex !== null && (
        <div
          role="dialog"
          aria-label="Gallery image preview"
          className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center px-4"
          onClick={() => setActiveIndex(null)}
        >
          <button
            type="button"
            onClick={() => setActiveIndex(null)}
            className="absolute top-4 right-4 text-white/80 hover:text-white"
            aria-label="Close gallery image preview"
          >
            <X className="h-8 w-8" />
          </button>
          <button
            type="button"
            onClick={(event) => {
              event.stopPropagation();
              previousImage();
            }}
            className="absolute left-3 md:left-6 text-white/80 hover:text-white"
            aria-label="Previous preview image"
          >
            <ChevronLeft className="h-10 w-10" />
          </button>
          <div
            className="relative w-full max-w-6xl h-[72vh]"
            onClick={(event) => event.stopPropagation()}
          >
            <Image
              src={images[activeIndex].src}
              alt={images[activeIndex].alt}
              fill
              sizes="100vw"
              className="object-contain"
            />
          </div>
          <button
            type="button"
            onClick={(event) => {
              event.stopPropagation();
              nextImage();
            }}
            className="absolute right-3 md:right-6 text-white/80 hover:text-white"
            aria-label="Next preview image"
          >
            <ChevronRight className="h-10 w-10" />
          </button>
          <div className="absolute bottom-5 text-white/70 text-sm font-medium">
            {activeIndex + 1} / {images.length}
          </div>
        </div>
      )}
    </div>
  );
}
