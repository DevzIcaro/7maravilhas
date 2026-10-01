"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, Menu, X, ArrowRight, MapPin } from "lucide-react";
import { irParaMaravilha } from "../lib/scrollTo";

/**
 * Navbar — padrão limpo: logo | links | ações.
 *
 * Menu de maravilhas: cada item leva à âncora `#maravilha-<id>` da home com
 * scroll suave e animado (src/lib/scrollTo.ts) — inclusive vindo de outra
 * página. No mobile, o painel do hambúrguer cobre a tela toda com rolagem
 * interna, para caber as 7 maravilhas confortavelmente em qualquer altura.
 */

interface Maravilha {
  id: string;
  nome: string;
  pais: string;
  local: string;
}

interface NavbarProps {
  /** URL da logo — o Layout importa o asset e passa a URL */
  logoSrc: string;
  /** Maravilhas vindas da content collection */
  maravilhas: Maravilha[];
}

const LINKS = [
  { label: "Home", href: "/" },
  { label: "Sobre", href: "/sobre-nos" },
  { label: "Maravilhas", href: "/maravilhas" },
  { label: "Equipe", href: "/equipe" },
  { label: "Blog", href: "/blog" },
];

export default function Navbar({ logoSrc, maravilhas }: NavbarProps) {
  const [openMaravilhas, setOpenMaravilhas] = useState(false);
  const [openMobile, setOpenMobile] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setOpenMaravilhas(false);
      }
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpenMaravilhas(false);
        setOpenMobile(false);
      }
    };
    document.addEventListener("mousedown", onClick);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onClick);
      document.removeEventListener("keydown", onKey);
    };
  }, []);

  // Trava o scroll do body enquanto o menu mobile em tela cheia está aberto.
  useEffect(() => {
    if (!openMobile) return;
    const original = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = original;
    };
  }, [openMobile]);

  const handleMaravilhaClick =
    (id: string, fecharMenu: () => void) => (e: React.MouseEvent<HTMLAnchorElement>) => {
      fecharMenu();
      irParaMaravilha(id, e);
    };

  return (
    <header className="sticky top-0 z-50 w-full border-b border-borda bg-white">
      <nav
        aria-label="Navegação principal"
        className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-6 px-4 lg:px-8"
      >
        {/* Logo */}
        <a href="/" className="flex shrink-0 items-center" aria-label="Maravilhas do Mundo — página inicial">
          <img src={logoSrc} alt="Maravilhas do Mundo" className="h-8 w-auto" />
        </a>

        {/* Links (desktop) */}
        <div className="hidden items-center gap-7 lg:flex">
          {LINKS.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="cursor-pointer text-sm font-medium text-texto transition-colors duration-200 hover:text-primaria"
            >
              {l.label}
            </a>
          ))}

          {/* Dropdown de maravilhas */}
          <div className="relative" ref={dropdownRef}>
            <button
              type="button"
              onClick={() => setOpenMaravilhas((v) => !v)}
              aria-expanded={openMaravilhas}
              aria-haspopup="true"
              className="flex cursor-pointer items-center gap-1 text-sm font-medium text-texto transition-colors duration-200 hover:text-primaria"
            >
              Explorar
              <ChevronDown
                size={16}
                className={`transition-transform duration-200 ${openMaravilhas ? "rotate-180" : ""}`}
                aria-hidden="true"
              />
            </button>

            <AnimatePresence>
              {openMaravilhas && (
                <motion.div
                  initial={{ opacity: 0, y: -6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -6 }}
                  transition={{ duration: 0.18 }}
                  className="absolute left-1/2 mt-3 w-72 -translate-x-1/2 overflow-hidden rounded-[var(--raio)] border border-borda bg-white shadow-lg"
                >
                  <ul className="max-h-[60vh] overflow-y-auto py-2">
                    {maravilhas.map((m) => (
                      <li key={m.id}>
                        <a
                          href={`/#maravilha-${m.id}`}
                          onClick={handleMaravilhaClick(m.id, () => setOpenMaravilhas(false))}
                          className="flex cursor-pointer items-start justify-between gap-3 px-4 py-2.5 text-sm text-texto transition-colors duration-200 hover:bg-superficie hover:text-secundaria-forte"
                        >
                          <span>
                            <span className="block font-medium">{m.nome}</span>
                            <span className="mt-0.5 block text-xs text-texto/55">{m.local}</span>
                          </span>
                          <span className="shrink-0 text-xs text-secundaria">{m.pais}</span>
                        </a>
                      </li>
                    ))}
                  </ul>
                  <a
                    href="/fale-conosco"
                    className="block cursor-pointer border-t border-borda px-4 py-3 text-sm font-semibold text-secundaria-forte transition-colors duration-200 hover:bg-superficie"
                  >
                    Fale conosco
                  </a>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* Ações (desktop) */}
        <div className="hidden shrink-0 items-center gap-3 lg:flex">
          <a
            href="/fale-conosco"
            className="cursor-pointer rounded-[var(--raio)] border-2 border-primaria px-4 py-2 text-sm font-bold text-primaria transition-colors duration-200 hover:bg-primaria hover:text-white"
          >
            Fale conosco
          </a>
          <a
            href="#bookform1"
            data-booking-trigger
            className="flex cursor-pointer items-center gap-2 rounded-[var(--raio)] bg-cta px-4 py-2.5 text-sm font-bold text-texto transition-all duration-200 hover:brightness-95"
          >
            Planeje sua visita
            <ArrowRight size={16} aria-hidden="true" />
          </a>
        </div>

        {/* Botão mobile */}
        <button
          type="button"
          onClick={() => setOpenMobile((v) => !v)}
          aria-expanded={openMobile}
          aria-controls="menu-mobile"
          aria-label={openMobile ? "Fechar menu" : "Abrir menu"}
          className="cursor-pointer p-2 text-texto lg:hidden"
        >
          {openMobile ? <X size={22} /> : <Menu size={22} />}
        </button>
      </nav>

      {/* Painel mobile — cobre a tela toda abaixo do header, com rolagem própria */}
      <AnimatePresence>
        {openMobile && (
          <motion.div
            id="menu-mobile"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-x-0 top-16 bottom-0 z-40 overflow-y-auto overscroll-contain bg-white lg:hidden"
          >
            <motion.div
              variants={{
                hidden: {},
                show: { transition: { staggerChildren: 0.045, delayChildren: 0.03 } },
              }}
              initial="hidden"
              animate="show"
              className="flex min-h-full flex-col px-5 py-6"
            >
              {LINKS.map((l) => (
                <motion.a
                  key={l.href}
                  href={l.href}
                  variants={{
                    hidden: { opacity: 0, y: 14 },
                    show: { opacity: 1, y: 0 },
                  }}
                  transition={{ duration: 0.32, ease: "easeOut" }}
                  className="cursor-pointer border-b border-borda py-3.5 text-base font-medium text-texto transition-colors duration-200 hover:text-primaria"
                >
                  {l.label}
                </motion.a>
              ))}

              <motion.p
                variants={{
                  hidden: { opacity: 0, y: 14 },
                  show: { opacity: 1, y: 0 },
                }}
                transition={{ duration: 0.32, ease: "easeOut" }}
                className="mb-1 mt-6 text-xs font-bold uppercase tracking-[0.16em] text-secundaria"
              >
                Escolha uma maravilha
              </motion.p>

              {maravilhas.map((m) => (
                <motion.a
                  key={m.id}
                  href={`/#maravilha-${m.id}`}
                  onClick={handleMaravilhaClick(m.id, () => setOpenMobile(false))}
                  variants={{
                    hidden: { opacity: 0, y: 14 },
                    show: { opacity: 1, y: 0 },
                  }}
                  transition={{ duration: 0.32, ease: "easeOut" }}
                  className="group flex cursor-pointer items-center gap-3 rounded-[var(--raio)] px-3 py-3 text-texto transition-colors duration-200 hover:bg-superficie active:bg-superficie"
                >
                  <MapPin
                    size={18}
                    className="shrink-0 text-secundaria transition-transform duration-200 group-hover:scale-110"
                    aria-hidden="true"
                  />
                  <span className="min-w-0 grow">
                    <span className="flex items-baseline gap-2">
                      <span className="text-sm font-semibold">{m.nome}</span>
                      <span className="text-xs text-secundaria">{m.pais}</span>
                    </span>
                    <span className="block truncate text-xs text-texto/55">{m.local}</span>
                  </span>
                  <ArrowRight
                    size={16}
                    className="shrink-0 text-secundaria/60 transition-transform duration-200 group-hover:translate-x-0.5"
                    aria-hidden="true"
                  />
                </motion.a>
              ))}

              <motion.div
                variants={{
                  hidden: { opacity: 0, y: 14 },
                  show: { opacity: 1, y: 0 },
                }}
                transition={{ duration: 0.32, ease: "easeOut" }}
                className="mt-6 flex flex-col gap-2 pb-4"
              >
                <a
                  href="/fale-conosco"
                  className="cursor-pointer rounded-[var(--raio)] border-2 border-primaria px-4 py-2.5 text-center text-sm font-bold text-primaria"
                >
                  Fale conosco
                </a>
                <a
                  href="#bookform1"
                  data-booking-trigger
                  onClick={() => setOpenMobile(false)}
                  className="flex cursor-pointer items-center justify-center gap-2 rounded-[var(--raio)] bg-cta px-4 py-3 text-sm font-bold text-texto"
                >
                  Planeje sua visita
                  <ArrowRight size={16} aria-hidden="true" />
                </a>
              </motion.div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
