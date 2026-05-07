import Image from "next/image";

interface Props {
  name: string;
  width: number;
  height: number;
  className?: string;
  ready?: boolean;
  src?: string;
  alt?: string;
  fill?: boolean;
  sizes?: string;
  priority?: boolean;
}

export default function ImagePlaceholder({
  name, width, height, className = "", ready = false,
  src, alt = "", fill, sizes, priority,
}: Props) {
  if (ready && src) {
    if (fill) {
      return (
        <Image
          src={src} alt={alt} fill sizes={sizes}
          className={`object-cover ${className}`}
          priority={priority}
        />
      );
    }
    return (
      <Image
        src={src} alt={alt} width={width} height={height}
        className={`object-cover ${className}`}
        priority={priority}
      />
    );
  }

  return (
    <div
      className={`flex flex-col items-center justify-center bg-gradient-to-br from-slate-100 to-slate-200 border-2 border-dashed border-slate-300 ${className}`}
      style={fill ? { position: "absolute", inset: 0 } : { width, height }}
      aria-label={`Placeholder: ${name} (${width}×${height})`}
    >
      <svg className="w-8 h-8 text-slate-400 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
      </svg>
      <span className="text-xs text-slate-500 font-mono text-center px-2 leading-tight">{name}</span>
      <span className="text-[10px] text-slate-400 mt-0.5">{width}×{height}</span>
    </div>
  );
}
