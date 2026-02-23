"use client";

import { useState, useEffect, useMemo, useCallback, useRef } from "react";
import { useRouter } from "next/navigation";
import { products, categories } from "@/data/products";
import CarouselNav from "@/components/CarouselNav";

type CategoryId = "vinho" | "suco" | "frisante" | "all";

const AUTOPLAY_INTERVAL = 5000;
const DRAG_THRESHOLD_PX = 50;

export default function CircularCarousel() {
  const router = useRouter();
  const [activeCategory, setActiveCategory] = useState<CategoryId>("all");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isHovering, setIsHovering] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const dragStartX = useRef(0);
  const justDragged = useRef(false);

  const filteredProducts = useMemo(() => {
    if (activeCategory === "all") return products;
    return products.filter((p) => p.category === activeCategory);
  }, [activeCategory]);

  const totalItems = filteredProducts.length;

  const handleCategoryChange = (categoryId: CategoryId) => {
    setActiveCategory(categoryId);
    setCurrentIndex(0);
  };

  const goTo = useCallback(
    (index: number) => {
      if (totalItems === 0) return;
      const safeIndex = (index + totalItems) % totalItems;
      setCurrentIndex(safeIndex);
    },
    [totalItems]
  );

  const next = useCallback(() => {
    if (totalItems <= 1) return;
    goTo(currentIndex + 1);
  }, [currentIndex, goTo, totalItems]);

  const prev = useCallback(() => {
    if (totalItems <= 1) return;
    goTo(currentIndex - 1);
  }, [currentIndex, goTo, totalItems]);

  const handlePointerDown = useCallback((e: React.PointerEvent) => {
    dragStartX.current = e.clientX;
    setIsDragging(true);
  }, []);

  const handlePointerMove = useCallback((e: React.PointerEvent) => {
    if (!isDragging) return;
    // opcional: poderia mostrar feedback visual do arrasto
  }, [isDragging]);

  const handlePointerUp = useCallback(
    (e: React.PointerEvent) => {
      if (!isDragging) return;
      const deltaX = e.clientX - dragStartX.current;
      if (Math.abs(deltaX) > DRAG_THRESHOLD_PX && totalItems > 1) {
        if (deltaX > 0) prev();
        else next();
        justDragged.current = true;
      }
      setIsDragging(false);
    },
    [isDragging, totalItems, prev, next]
  );

  const handleClickCapture = useCallback((e: React.MouseEvent) => {
    if (justDragged.current) {
      e.preventDefault();
      e.stopPropagation();
      justDragged.current = false;
    }
  }, []);

  // Reset índice quando muda a categoria
  useEffect(() => {
    setCurrentIndex(0);
  }, [activeCategory]);

  // Autoplay com pausa no hover
  useEffect(() => {
    if (isHovering || totalItems <= 1) return;
    const id = setInterval(() => {
      setCurrentIndex((prev) => ((prev + 1) % totalItems));
    }, AUTOPLAY_INTERVAL);
    return () => clearInterval(id);
  }, [isHovering, totalItems]);

  if (!totalItems) return null;

  return (
    <section
      className="products-section"
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
    >
      <div className="category-filters">
        <button
          type="button"
          className={`filter-btn ${activeCategory === "all" ? "active" : ""}`}
          onClick={() => handleCategoryChange("all")}
        >
          Destaques
        </button>
        {categories.map((cat) => (
          <button
            key={cat.id}
            type="button"
            className={`filter-btn ${activeCategory === cat.id ? "active" : ""}`}
            onClick={() => handleCategoryChange(cat.id as CategoryId)}
          >
            {cat.label}
          </button>
        ))}
      </div>

      <div className="carousel-wrapper">
        <div
          className="carousel-container"
          style={{ cursor: totalItems > 1 ? (isDragging ? "grabbing" : "grab") : "default" }}
          onPointerDown={handlePointerDown}
          onPointerMove={handlePointerMove}
          onPointerUp={handlePointerUp}
          onPointerLeave={() => setIsDragging(false)}
          onClickCapture={handleClickCapture}
        >
          <div className="carousel-track">
            {filteredProducts.map((product, index) => {
              const diff = (index - currentIndex + totalItems) % totalItems;
              let positionClass = "carousel-card--hidden";
              if (diff === 0) {
                positionClass = "carousel-card--center";
              } else if (diff === 1) {
                positionClass = "carousel-card--right";
              } else if (diff === totalItems - 1) {
                positionClass = "carousel-card--left";
              }

              return (
                <div
                  key={product.slug}
                  className={`carousel-card ${positionClass}`}
                >
                  <div className="carousel-card-inner">
                    <img
                      src={product.cardImage}
                      alt={product.title}
                      draggable={false}
                    />
                    {/* Área clicável apenas sobre o botão \"Descobrir\" desenhado no card */}
                    <button
                      type="button"
                      className="carousel-card-discover-hit"
                      onClick={() => router.push(`/produto/${product.slug}`)}
                      aria-label={`Descobrir ${product.title}`}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Navegação do carrossel: linha + botões (75px para baixo, 50px para a esquerda) */}
      <div className="-mt-[125px] ml-[500px] flex justify-center px-2 relative z-50 pointer-events-auto">
        <CarouselNav
          onPrev={prev}
          onNext={next}
          hasPrev={totalItems > 1}
          hasNext={totalItems > 1}
          prevLabel="Anterior"
          nextLabel="Próximo"
        />
      </div>

      <div className="carousel-dots">
        {filteredProducts.map((_, index) => (
          <button
            key={index}
            type="button"
            className={`carousel-dot ${index === currentIndex ? "active" : ""}`}
            onClick={() => goTo(index)}
            aria-label={`Ir para slide ${index + 1}`}
          />
        ))}
      </div>
    </section>
  );
}
