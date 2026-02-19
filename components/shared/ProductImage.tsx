"use client";

import React, { useState } from "react";
import Image, { ImageProps } from "next/image";

interface ProductImageProps extends Omit<ImageProps, "src" | "onError"> {
  src?: string | null;
  fallbackSrc?: string;
}

export default function ProductImage({
  src,
  alt,
  width,
  height,
  className,
  fallbackSrc = "/images/MedicinePlaceholder.svg",
  ...props
}: ProductImageProps) {
  const [imgSrc, setImgSrc] = React.useState<string>(src || fallbackSrc);

  React.useEffect(() => {
    setImgSrc(src || fallbackSrc);
  }, [src, fallbackSrc]);

  return (
    <Image
      {...props}
      src={imgSrc}
      alt={alt || "Product Image"}
      width={width}
      height={height}
      className={className}
      onError={() => {
        setImgSrc(fallbackSrc);
      }}
    />
  );
}
