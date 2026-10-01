import * as React from "react";
import { Quote } from "lucide-react";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi,
} from "@/components/ui/carousel";
import { cn } from "@/lib/utils";

export interface Depoimento {
  id: string;
  autor: string;
  papel: string;
  texto: string;
}

interface Props {
  depoimentos: Depoimento[];
  /** Intervalo do autoplay em ms. Use 0 para desligar. */
  intervalo?: number;
}

export default function DepoimentosCarousel({ depoimentos, intervalo = 5000 }: Props) {
  const [api, setApi] = React.useState<CarouselApi>();
  const [atual, setAtual] = React.useState(0);
  const [total, setTotal] = React.useState(0);
  const [pausado, setPausado] = React.useState(false);

  React.useEffect(() => {
    if (!api) return;

    const sincronizar = () => {
      setTotal(api.scrollSnapList().length);
      setAtual(api.selectedScrollSnap());
    };

    sincronizar();
    api.on("select", sincronizar);
    api.on("reInit", sincronizar);

    return () => {
      api.off("select", sincronizar);
      api.off("reInit", sincronizar);
    };
  }, [api]);

  // Autoplay: pausa no hover, no foco do teclado e para quem prefere menos animação
  React.useEffect(() => {
    if (!api || !intervalo || pausado) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const timer = window.setInterval(() => {
      if (api.canScrollNext()) api.scrollNext();
      else api.scrollTo(0);
    }, intervalo);

    return () => window.clearInterval(timer);
  }, [api, intervalo, pausado]);

  return (
    <div
      className="mt-10"
      onMouseEnter={() => setPausado(true)}
      onMouseLeave={() => setPausado(false)}
      onFocusCapture={() => setPausado(true)}
      onBlurCapture={() => setPausado(false)}
    >
      <Carousel
        setApi={setApi}
        opts={{ align: "start", loop: true }}
        className="mx-auto w-full lg:px-2"
        aria-label="Depoimentos de visitantes"
      >
        <CarouselContent className="items-stretch">
          {depoimentos.map((d) => (
            <CarouselItem key={d.id} className="sm:basis-1/2 lg:basis-1/3">
              <figure className="card flex h-full flex-col">
                <Quote className="mb-3 h-6 w-6 shrink-0 text-primaria" aria-hidden="true" />
                <blockquote className="grow text-sm italic text-texto">"{d.texto}"</blockquote>
                <figcaption className="mt-4">
                  <p className="text-sm font-bold text-secundaria-forte">{d.autor}</p>
                  <p className="text-xs text-texto/60">{d.papel}</p>
                </figcaption>
              </figure>
            </CarouselItem>
          ))}
        </CarouselContent>

        <CarouselPrevious className="hidden sm:flex" />
        <CarouselNext className="hidden sm:flex" />
      </Carousel>

      {total > 1 && (
        <div className="mt-6 flex flex-wrap items-center justify-center gap-2">
          {Array.from({ length: total }).map((_, i) => (
            <button
              key={i}
              type="button"
              onClick={() => api?.scrollTo(i)}
              aria-label={`Ir para o depoimento ${i + 1} de ${total}`}
              aria-current={i === atual}
              className={cn(
                "h-2 cursor-pointer rounded-full transition-all duration-300 outline-none focus-visible:ring-2 focus-visible:ring-primaria focus-visible:ring-offset-2",
                i === atual ? "w-6 bg-primaria" : "w-2 bg-secundaria-forte/25 hover:bg-secundaria-forte/50"
              )}
            />
          ))}
        </div>
      )}

      <p aria-live="polite" className="sr-only">
        Depoimento {atual + 1} de {total}
      </p>
    </div>
  );
}
