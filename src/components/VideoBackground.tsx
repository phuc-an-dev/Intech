"use client";

import Image from "next/image";
import { useState } from "react";

interface VideoBackgroundProps {
  src: string;
  poster: string;
  alt: string;
  className?: string;
}

function prefersReducedMotion() {
  return typeof window !== "undefined"
    && typeof window.matchMedia === "function"
    && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

export default function VideoBackground({
  src,
  poster,
  alt,
  className = "",
}: VideoBackgroundProps) {
  const [showPoster, setShowPoster] = useState(prefersReducedMotion);

  if (showPoster) {
    return (
      <Image
        src={poster}
        alt={alt}
        fill
        sizes="100vw"
        className={`object-cover hidden md:block ${className}`}
        priority
      />
    );
  }

  return (
    <video
      data-testid="video-background"
      className={`absolute inset-0 h-full w-full object-cover hidden md:block ${className}`}
      poster={poster}
      autoPlay
      muted
      loop
      playsInline
      preload="metadata"
      aria-label={alt}
      onError={() => setShowPoster(true)}
    >
      <source src={src} type="video/mp4" />
    </video>
  );
}
