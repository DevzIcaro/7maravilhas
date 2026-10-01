import { animate, stagger, onScroll } from "animejs";

function prefersReducedMotion() {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

/**
 * Anima a entrada dos cards de cada grid marcado com [data-reveal] conforme
 * eles entram na viewport (scroll reveal com stagger).
 */
export function revealOnScroll(gridSelector = "[data-reveal]") {
  const grids = document.querySelectorAll<HTMLElement>(gridSelector);
  if (!grids.length) return;

  if (prefersReducedMotion()) return;

  grids.forEach((grid) => {
    const items = Array.from(grid.children) as HTMLElement[];
    if (!items.length) return;

    animate(items, {
      opacity: [0, 1],
      translateY: [28, 0],
      scale: [0.97, 1],
      duration: 650,
      delay: stagger(90),
      ease: "outQuad",
      autoplay: onScroll({
        target: grid,
        enter: "bottom-=10% top",
      }),
    });
  });
}

/**
 * "Pop" de entrada pros ícones de card (ex.: badges de cards): escala de 0
 * a 1 com leve rotação e easing elástico, disparado no mesmo scroll-trigger
 * do revealOnScroll — dá mais vida ao ícone sem duplicar a animação base do
 * card (reaproveita animate/stagger/onScroll já usados em revealOnScroll).
 */
export function popIconsOnScroll(gridSelector = "[data-reveal-icons]") {
  const grids = document.querySelectorAll<HTMLElement>(gridSelector);
  if (!grids.length) return;

  if (prefersReducedMotion()) return;

  grids.forEach((grid) => {
    const icones = Array.from(grid.querySelectorAll<HTMLElement>("[data-icone-card]"));
    if (!icones.length) return;

    animate(icones, {
      scale: [0, 1],
      rotate: [-15, 0],
      duration: 600,
      delay: stagger(90, { start: 150 }),
      ease: "outElastic(1, .6)",
      autoplay: onScroll({
        target: grid,
        enter: "bottom-=10% top",
      }),
    });
  });
}

interface FilterSwapOptions {
  hideDuration?: number;
  showDuration?: number;
  staggerMs?: number;
}

/**
 * Troca suavemente quais cards ficam visíveis (usado pelos filtros de
 * cidade/categoria): os que somem encolhem e desaparecem, os que entram
 * aparecem em cascata, em vez do display:none instantâneo.
 */
export function animateFilterSwap(
  cards: HTMLElement[],
  shouldShow: (card: HTMLElement) => boolean,
  { hideDuration = 220, showDuration = 420, staggerMs = 60 }: FilterSwapOptions = {},
) {
  const toHide = cards.filter((c) => !shouldShow(c) && c.style.display !== "none");
  const toShow = cards.filter((c) => shouldShow(c) && c.style.display === "none");

  if (prefersReducedMotion()) {
    toHide.forEach((c) => { c.style.display = "none"; });
    toShow.forEach((c) => { c.style.display = ""; });
    return;
  }

  if (toHide.length) {
    animate(toHide, {
      opacity: [1, 0],
      translateY: [0, -12],
      scale: [1, 0.95],
      duration: hideDuration,
      delay: stagger(20),
      ease: "inQuad",
      onComplete: () => {
        toHide.forEach((c) => { c.style.display = "none"; });
      },
    });
  }

  if (toShow.length) {
    toShow.forEach((c) => { c.style.display = ""; });
    animate(toShow, {
      opacity: [0, 1],
      translateY: [16, 0],
      scale: [0.95, 1],
      duration: showDuration,
      delay: stagger(staggerMs, { start: toHide.length ? hideDuration * 0.6 : 0 }),
      ease: "outQuad",
    });
  }
}
