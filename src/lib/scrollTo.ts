import { url } from "./url";
import { animate } from "animejs";

/**
 * Scroll suave e customizado (anime.js) até uma maravilha específica, com um
 * leve "pulso" de destaque na chegada — usado pelo menu de maravilhas da
 * Navbar (desktop e mobile).
 *
 * Cross-page: se o link for clicado fora da home, navegamos para "/" sem
 * hash (evita o salto abrupto padrão do navegador) e guardamos o alvo em
 * sessionStorage; a home lê esse valor no load e completa o scroll animado.
 */
const STORAGE_KEY = "maravilhas:scroll-target";

/** Altura aproximada do header sticky + respiro extra. */
const OFFSET = 88;

function prefersReducedMotion() {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

function destacar(el: HTMLElement) {
  el.classList.add("scroll-destaque");
  window.setTimeout(() => el.classList.remove("scroll-destaque"), 1500);
}

function irAte(id: string) {
  const el = document.getElementById(id);
  if (!el) return;

  const destino = Math.max(0, el.getBoundingClientRect().top + window.scrollY - OFFSET);

  if (prefersReducedMotion()) {
    window.scrollTo(0, destino);
    destacar(el);
    return;
  }

  const origem = { y: window.scrollY };
  const distancia = Math.abs(destino - origem.y);
  // Viagens curtas são rápidas; viagens longas (ex.: do topo até o rodapé) se
  // esticam um pouco mais, sem nunca ficar arrastado.
  const duracao = Math.min(1100, Math.max(450, distancia * 0.55));

  animate(origem, {
    y: destino,
    duration: duracao,
    ease: "inOutQuad",
    onUpdate: () => window.scrollTo(0, origem.y),
    onComplete: () => destacar(el),
  });
}

/**
 * Handler de clique para links de maravilha. Retorna se o evento foi
 * interceptado (para o chamador fechar o menu, etc.).
 */
export function irParaMaravilha(id: string, event?: { preventDefault: () => void }) {
  const alvo = `maravilha-${id}`;
  const naHome = [url("/"), url("/index.html")].includes(window.location.pathname);

  if (naHome) {
    event?.preventDefault();
    // Dá um instante para o menu (mobile/desktop) começar a fechar antes de
    // medir a posição — evita calcular o destino com o painel ainda aberto.
    window.setTimeout(() => irAte(alvo), 160);
    return;
  }

  event?.preventDefault();
  sessionStorage.setItem(STORAGE_KEY, alvo);
  window.location.assign(url("/"));
}

/** Chamar no load da home: completa o scroll pendente vindo de outra página. */
export function continuarScrollPendente() {
  const alvo = sessionStorage.getItem(STORAGE_KEY);
  if (!alvo) return;
  sessionStorage.removeItem(STORAGE_KEY);
  // Aguarda o layout assentar (imagens, reveal-on-scroll) antes de medir.
  window.setTimeout(() => irAte(alvo), 220);
}
