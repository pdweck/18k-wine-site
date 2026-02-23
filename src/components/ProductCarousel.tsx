"use client";

import { useCallback, useEffect, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import Link from "next/link";
import { products } from "@/data/products";

export default function ProductCarousel() {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    align: "center",
    loop: true,
    skipSnaps: false,
  });

  const [selectedIndex, setSelectedIndex] = useState(0);
  const [scrollProgress, setScrollProgress] = useState(0);

  const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi]);

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setSelectedIndex(emblaApi.selectedScrollSnap());
  }, [emblaApi]);

  const onScroll = useCallback(() => {
    if (!emblaApi) return;
    const progress = Math.max(0, Math.min(1, emblaApi.scrollProgress()));
    setScrollProgress(progress * 100);
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    onSelect();
    onScroll();
    emblaApi.on("select", onSelect);
    emblaApi.on("scroll", onScroll);
    return () => {
      emblaApi.off("select", onSelect);
      emblaApi.off("scroll", onScroll);
    };
  }, [emblaApi, onSelect, onScroll]);

  return (
    <div className="carousel-wrapper">
      <div className="carousel-viewport" ref={emblaRef}>
        <div className="carousel-container">
          {products.map((product, index) => (
            <div
              key={product.slug}
              className="carousel-slide"
              style={{
                opacity: index === selectedIndex ? 1 : 0.5,
              }}
            >
              <Link
                href={`/produto/${product.slug}`}
                className="carousel-slide-inner"
              >
                <img
                  src={product.cardImage}
                  alt={product.title}
                  className="carousel-image"
                  draggable={false}
                />
              </Link>
            </div>
          ))}
        </div>
      </div>

      <div className="carousel-nav">
        <div className="carousel-progress">
          <div
            className="carousel-progress-bar"
            style={{ width: `${scrollProgress}%` }}
          />
        </div>
        <div className="carousel-arrows">
          <button
            type="button"
            className="carousel-arrow"
            onClick={scrollPrev}
            aria-label="Anterior"
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M15 18l-6-6 6-6" />
            </svg>
          </button>
          <button
            type="button"
            className="carousel-arrow"
            onClick={scrollNext}
            aria-label="Próximo"
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M9 18l6-6-6-6" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}
