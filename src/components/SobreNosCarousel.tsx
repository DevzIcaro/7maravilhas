import * as React from "react";

import { Carousel, CarouselContent, CarouselItem, type CarouselApi } from "@/components/ui/carousel";

export interface SlideFoto {
  src: string;
  alt: string;
}

interface Props {
  slides: SlideFoto[];
  /** Intervalo do autoplay em ms. */
  intervalo?: number;
}

/**
 * Carousel de fotos das clínicas — só autoplay, um card por vez, sem setas
 * nem paginação (ver PROMPT/pedido do cliente). Pausa no hover/foco e
 * respeita prefers-reduced-motion, mesmo padrão do DepoimentosCarousel.
 */
export default function SobreNosCarousel({ slides, intervalo = 4000 }: Props) {
  const [api, setApi] = React.useState<CarouselApi>();
  const [pausado, setPausado] = React.useState(false);

  React.useEffect(() => {
    if (!api || pausado || slides.length < 2) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const timer = window.setInterval(() => {
      api.canScrollNext() ? api.scrollNext() : api.scrollTo(0);
    }, intervalo);

    return () => window.clearInterval(timer);
  }, [api, intervalo, pausado, slides.length]);

  return (
    <Carousel
      setApi={setApi}
      opts={{ loop: true }}
      className="w-full"
      aria-label="Fotos das clínicas Correia Odontologia"
      onMouseEnter={() => setPausado(true)}
      onMouseLeave={() => setPausado(false)}
      onFocusCapture={() => setPausado(true)}
      onBlurCapture={() => setPausado(false)}
    >
      <CarouselContent>
        {slides.map((s) => (
          <CarouselItem key={s.alt}>
            <img
              src={s.src}
              alt={s.alt}
              loading="lazy"
              decoding="async"
              className="aspect-video w-full rounded-[var(--raio)] object-cover"
            />
          </CarouselItem>
        ))}
      </CarouselContent>
    </Carousel>
  );
}
