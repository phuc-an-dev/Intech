"use client";

import { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import { motion, AnimatePresence } from "framer-motion";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";
import ImagePlaceholder from "./ImagePlaceholder";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

interface GalleryImage {
  src?: string;
  alt: string;
  name: string;
}

interface Props {
  images: GalleryImage[];
  title?: string;
}

export default function TourGallery({ images, title = "Photo Gallery" }: Props) {
  const [lightboxIdx, setLightboxIdx] = useState<number | null>(null);

  function prev() {
    setLightboxIdx((i) => (i === null ? null : (i - 1 + images.length) % images.length));
  }
  function next() {
    setLightboxIdx((i) => (i === null ? null : (i + 1) % images.length));
  }

  return (
    <section className="py-16 bg-[#F4F7F9]">
      <div className="max-w-5xl mx-auto px-4">
        <h2 className="text-2xl md:text-3xl font-heading font-bold text-[#002D62] mb-8">{title}</h2>
        <Swiper
          modules={[Navigation, Pagination]}
          spaceBetween={16}
          slidesPerView={1}
          navigation
          pagination={{ clickable: true }}
          breakpoints={{
            640: { slidesPerView: 2 },
            1024: { slidesPerView: 3 },
          }}
          className="rounded-2xl overflow-hidden"
        >
          {images.map((img, idx) => (
            <SwiperSlide key={idx}>
              <button
                onClick={() => setLightboxIdx(idx)}
                className="group w-full aspect-video relative overflow-hidden rounded-xl cursor-zoom-in"
                aria-label={`View ${img.alt}`}
              >
                {img.src ? (
                  <Image
                    src={img.src} alt={img.alt} fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                ) : (
                  <ImagePlaceholder
                    name={img.name}
                    width={800} height={450}
                    fill
                    className="group-hover:scale-105 transition-transform duration-500"
                  />
                )}
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300 flex items-center justify-center">
                  <span className="text-white opacity-0 group-hover:opacity-100 transition-opacity text-sm font-medium">
                    Click to enlarge
                  </span>
                </div>
              </button>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      <AnimatePresence>
        {lightboxIdx !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center"
            onClick={() => setLightboxIdx(null)}
          >
            <button
              onClick={() => setLightboxIdx(null)}
              className="absolute top-4 right-4 text-white/80 hover:text-white"
              aria-label="Close"
            >
              <X className="w-8 h-8" />
            </button>

            <button
              onClick={(e) => { e.stopPropagation(); prev(); }}
              className="absolute left-4 text-white/80 hover:text-white"
              aria-label="Previous"
            >
              <ChevronLeft className="w-10 h-10" />
            </button>

            <motion.div
              key={lightboxIdx}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="relative w-full max-w-4xl mx-16 aspect-video"
              onClick={(e) => e.stopPropagation()}
            >
              {images[lightboxIdx].src ? (
                <Image
                  src={images[lightboxIdx].src!}
                  alt={images[lightboxIdx].alt}
                  fill
                  sizes="100vw"
                  className="object-contain"
                />
              ) : (
                <ImagePlaceholder
                  name={images[lightboxIdx].name}
                  width={1200} height={675}
                  fill
                />
              )}
            </motion.div>

            <button
              onClick={(e) => { e.stopPropagation(); next(); }}
              className="absolute right-4 text-white/80 hover:text-white"
              aria-label="Next"
            >
              <ChevronRight className="w-10 h-10" />
            </button>

            <div className="absolute bottom-4 text-white/60 text-sm">
              {lightboxIdx + 1} / {images.length}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
