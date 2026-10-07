/**
 * Prefixa um caminho interno com o `base` do Astro (BASE_PATH no CI).
 * No GitHub Pages de projeto o site vive em /<repo>/, então links iniciados
 * em "/" precisam do prefixo; com domínio próprio o base é "/" e nada muda.
 * Funciona no servidor (Astro) e nas ilhas React (Vite).
 */
export function url(caminho: string): string {
  const base = import.meta.env.BASE_URL.replace(/\/$/, "");
  return caminho.startsWith("/") ? `${base}${caminho}` : caminho;
}
