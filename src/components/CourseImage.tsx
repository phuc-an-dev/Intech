"use client";

import { useState } from "react";
import { BookOpen } from "lucide-react";

interface CourseImageProps {
  src: string;
  alt: string;
  title: string;
}

export default function CourseImage({ src, alt, title }: CourseImageProps) {
  const [failed, setFailed] = useState(false);

  if (!src || failed) {
    return (
      <div className="flex flex-col items-center gap-3 text-gray-400">
        <BookOpen className="w-16 h-16 opacity-30" />
        <span className="text-sm font-medium">{title}</span>
      </div>
    );
  }

  return (
    <img
      src={src}
      alt={alt}
      className="w-full h-full object-cover"
      onError={() => setFailed(true)}
    />
  );
}
