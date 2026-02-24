"use client";

import Image from "next/image";
import { useState } from "react";

const PLACEHOLDER = "/images/placeholder.jpg";

interface ProductImageProps {
  src: string;
  alt: string;
  priority?: boolean;
  className?: string;
  sizes?: string;
}

export default function ProductImage({
  src,
  alt,
  priority = false,
  className = "",
  sizes = "(min-width: 768px) 50vw, 100vw",
}: ProductImageProps) {
  const [currentSrc, setCurrentSrc] = useState(src);
  const [failed, setFailed] = useState(false);

  const handleError = () => {
    if (!failed) {
      setFailed(true);
      setCurrentSrc(PLACEHOLDER);
    }
  };

  return (
    <div className={`product-image-inner ${className}`}>
      <Image
        src={currentSrc}
        alt={alt}
        fill
        sizes={sizes}
        className="product-image"
        style={{ objectFit: "contain" }}
        onError={handleError}
        priority={priority}
      />
    </div>
  );
}
