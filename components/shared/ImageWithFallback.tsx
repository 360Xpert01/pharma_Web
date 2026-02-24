"use client";

import { useState, useEffect } from "react";
import Image, { ImageProps } from "next/image";

interface ImageWithFallbackProps extends Omit<ImageProps, "src" | "onError"> {
  src?: string | null;
  fallbackSrc: string;
}

export default function ImageWithFallback({
  src,
  alt,
  width,
  height,
  className,
  fallbackSrc,
  ...props
}: ImageWithFallbackProps) {
  const getNormalizedSrc = (s: string | null | undefined) => {
    if (!s || s === "/girlPic.png" || s === "/images/MedicinePlaceholder.svg") {
      return fallbackSrc;
    }
    return s;
  };

  const [imgSrc, setImgSrc] = useState<string>(getNormalizedSrc(src));

  useEffect(() => {
    setImgSrc(getNormalizedSrc(src));
  }, [src, fallbackSrc]);

  return (
    <Image
      {...props}
      src={imgSrc}
      alt={alt || "Image"}
      width={width}
      height={height}
      className={className}
      onError={() => {
        setImgSrc(fallbackSrc);
      }}
    />
  );
}
