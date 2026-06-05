"use client";

import Image from "next/image";
import ImagePlaceholder from "./ImagePlaceholder";

interface Logo {
  name: string;
  src?: string;
  alt: string;
  width?: number;
  height?: number;
}

interface Props {
  logos: Logo[];
  speed?: number;
  className?: string;
}

export default function LogoMarquee({ logos, speed = 30, className = "" }: Props) {
  return (
    <div className={`overflow-hidden ${className}`} aria-label="Partner logos">
      <div
        className="flex gap-12 w-max"
        style={{ animation: `marquee ${speed}s linear infinite` }}
      >
        {[...logos, ...logos].map((logo, i) => (
          <div key={`${logo.name}-${i}`} className="flex items-center justify-center h-16 w-40 grayscale hover:grayscale-0 transition-all opacity-60 hover:opacity-100 flex-shrink-0">
            {logo.src ? (
              <Image
                src={logo.src}
                alt={logo.alt}
                width={logo.width ?? 160}
                height={logo.height ?? 60}
                className="max-h-12 max-w-[120px] object-contain"
              />
            ) : (
              <ImagePlaceholder
                name={`${logo.name}.webp`}
                alt={logo.alt}
                width={logo.width ?? 160}
                height={logo.height ?? 60}
                className="rounded-md"
              />
            )}
          </div>
        ))}
      </div>
      <style>{`
        @keyframes marquee {
          0%   { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
      `}</style>
    </div>
  );
}
