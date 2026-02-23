"use client";

const NAV_BLUE = "#0A2A43";

export interface CarouselNavProps {
  onPrev: () => void;
  onNext: () => void;
  /** Opcional: desabilita botões quando não há anterior/próximo */
  hasPrev?: boolean;
  hasNext?: boolean;
  /** Classes adicionais no container */
  className?: string;
  /** Acessibilidade */
  prevLabel?: string;
  nextLabel?: string;
}

export default function CarouselNav({
  onPrev,
  onNext,
  hasPrev = true,
  hasNext = true,
  className = "",
  prevLabel = "Anterior",
  nextLabel = "Próximo",
}: CarouselNavProps) {
  return (
    <div
      className={`flex items-center gap-3 ${className}`}
      role="group"
      aria-label="Navegação do carrossel"
    >
      {/* Linha horizontal fina à esquerda */}
      <div
        className="h-px flex-shrink-0 rounded-full"
        style={{
          width: "clamp(80px, 20vw, 120px)",
          backgroundColor: NAV_BLUE,
        }}
        aria-hidden
      />

      {/* Botões circulares */}
      <div className="flex items-center gap-2">
        <button
          type="button"
          onClick={onPrev}
          disabled={!hasPrev}
          aria-label={prevLabel}
          className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-full border-2 bg-white transition-colors hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-40 sm:h-12 sm:w-12"
          style={{ borderColor: NAV_BLUE }}
        >
          <span
            className="text-xl font-light leading-none sm:text-2xl"
            style={{ color: NAV_BLUE }}
            aria-hidden
          >
            ‹
          </span>
        </button>
        <button
          type="button"
          onClick={onNext}
          disabled={!hasNext}
          aria-label={nextLabel}
          className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-full border-2 bg-white transition-colors hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-40 sm:h-12 sm:w-12"
          style={{ borderColor: NAV_BLUE }}
        >
          <span
            className="text-xl font-light leading-none sm:text-2xl"
            style={{ color: NAV_BLUE }}
            aria-hidden
          >
            ›
          </span>
        </button>
      </div>
    </div>
  );
}
