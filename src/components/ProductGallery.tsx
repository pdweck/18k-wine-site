"use client";

import { useState, useCallback, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";

interface ProductGalleryProps {
  images: string[];
  alt: string;
}

export default function ProductGallery({ images, alt }: ProductGalleryProps) {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const open = useCallback((index: number) => setLightboxIndex(index), []);
  const close = useCallback(() => setLightboxIndex(null), []);

  const goPrev = useCallback(() => {
    if (lightboxIndex === null) return;
    setLightboxIndex((lightboxIndex - 1 + images.length) % images.length);
  }, [lightboxIndex, images.length]);

  const goNext = useCallback(() => {
    if (lightboxIndex === null) return;
    setLightboxIndex((lightboxIndex + 1) % images.length);
  }, [lightboxIndex, images.length]);

  useEffect(() => {
    if (lightboxIndex === null) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
      if (e.key === "ArrowLeft") goPrev();
      if (e.key === "ArrowRight") goNext();
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [lightboxIndex, close, goPrev, goNext]);

  if (!images?.length) return null;

  return (
    <>
      <div className="pp-gallery-grid" role="list">
        {images.map((src, index) => (
          <button
            key={`${src}-${index}`}
            type="button"
            className="pp-gallery-item"
            onClick={() => open(index)}
            aria-label={`Ver imagem ${index + 1} de ${images.length}`}
          >
            <Image
              src={src}
              alt={`${alt} — imagem ${index + 1}`}
              width={400}
              height={300}
              sizes="(max-width: 768px) 50vw, 33vw"
              className="pp-gallery-img"
            />
          </button>
        ))}
      </div>

      <AnimatePresence>
        {lightboxIndex !== null && (
          <motion.div
            className="pp-lightbox"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            role="dialog"
            aria-modal="true"
            aria-label="Galeria em tela cheia"
          >
            <button
              type="button"
              className="pp-lightbox-backdrop"
              onClick={close}
              aria-label="Fechar galeria"
            />
            <button
              type="button"
              className="pp-lightbox-prev"
              onClick={goPrev}
              aria-label="Imagem anterior"
            >
              <span aria-hidden>‹</span>
            </button>
            <div className="pp-lightbox-content">
              <Image
                src={images[lightboxIndex]}
                alt={`${alt} — imagem ${lightboxIndex + 1}`}
                fill
                sizes="90vw"
                className="pp-lightbox-img"
                priority
              />
            </div>
            <button
              type="button"
              className="pp-lightbox-next"
              onClick={goNext}
              aria-label="Próxima imagem"
            >
              <span aria-hidden>›</span>
            </button>
            <button
              type="button"
              className="pp-lightbox-close"
              onClick={close}
              aria-label="Fechar"
            >
              ×
            </button>
            <span className="pp-lightbox-counter" aria-live="polite">
              {lightboxIndex + 1} / {images.length}
            </span>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
