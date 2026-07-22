"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, Menu, X, ArrowRight } from "lucide-react";

/**
 * Navbar — padrão limpo: logo | links | ações.
 * Decisão aprovada: a barra de topo antiga (endereço, e-mail, redes e lista de
 * telefones das 5 unidades) foi REMOVIDA. Esses dados vivem nas páginas de
 * contato/unidades e no rodapé. Ver PROMPT, Seção 6.1.
 */

interface NavbarProps {
  /** URL da logo — a página Astro importa o asset e passa `logo.src` */
  logoSrc: string;
}

const LINKS = [
  { label: "Home", href: "/" },
  { label: "Sobre", href: "/sobre-nos" },
  { label: "Serviços", href: "/servicos" },
  { label: "Equipe", href: "/equipe" },
  { label: "Blog", href: "/blog" },
];

const UNIDADES = [
  { cidade: "Santa Fé do Sul", uf: "SP" },
  { cidade: "Jales", uf: "SP" },
  { cidade: "São José do Rio Preto", uf: "SP" },
  { cidade: "Votuporanga", uf: "SP" },
  { cidade: "Três Lagoas", uf: "MS" },
];

const WHATSAPP_URL =
  "https://api.whatsapp.com/send?phone=5517996256384&text=Ol%C3%A1%2C%20estou%20no%20site%20da%20Correia%20Odontologia%20e%20gostaria%20de%20saber%20mais!";

export default function Navbar({ logoSrc }: NavbarProps) {
  const [openUnidades, setOpenUnidades] = useState(false);
  const [openMobile, setOpenMobile] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // fecha o dropdown ao clicar fora ou apertar Escape
  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setOpenUnidades(false);
      }
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpenUnidades(false);
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

  return (
    <header className="sticky top-0 z-50 w-full bg-branco border-b border-borda">
      <nav
        aria-label="Navegação principal"
        className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-6 px-4 md:px-8"
      >
        {/* Logo */}
        <a href="/" className="flex shrink-0 items-center gap-2" aria-label="Correia Odontologia — início">
          <img src={logoSrc} alt="Correia Odontologia" className="h-8 w-auto" />
        </a>

        {/* Links (desktop) */}
        <div className="hidden items-center gap-7 lg:flex">
          {LINKS.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="text-sm font-medium text-texto transition-colors duration-200 hover:text-primaria"
            >
              {l.label}
            </a>
          ))}

          {/* Dropdown de unidades */}
          <div className="relative" ref={dropdownRef}>
            <button
              type="button"
              onClick={() => setOpenUnidades((v) => !v)}
              aria-expanded={openUnidades}
              aria-haspopup="true"
              className="flex cursor-pointer items-center gap-1 text-sm font-medium text-texto transition-colors duration-200 hover:text-primaria"
            >
              Unidades
              <ChevronDown
                size={16}
                className={`transition-transform duration-200 ${openUnidades ? "rotate-180" : ""}`}
                aria-hidden="true"
              />
            </button>

            <AnimatePresence>
              {openUnidades && (
                <motion.div
                  initial={{ opacity: 0, y: -6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -6 }}
                  transition={{ duration: 0.18 }}
                  className="absolute left-1/2 mt-3 w-64 -translate-x-1/2 overflow-hidden rounded-lg border border-borda bg-branco shadow-lg"
                >
                  <ul className="py-2">
                    {UNIDADES.map((u) => (
                      <li key={u.cidade}>
                        <a
                          href="/unidades"
                          className="flex items-center justify-between px-4 py-2.5 text-sm text-texto transition-colors duration-200 hover:bg-superficie hover:text-secundaria-forte"
                        >
                          {u.cidade}
                          <span className="text-xs text-secundaria">{u.uf}</span>
                        </a>
                      </li>
                    ))}
                  </ul>
                  <a
                    href="/fale-conosco"
                    className="block border-t border-borda px-4 py-3 text-sm font-semibold text-secundaria-forte transition-colors duration-200 hover:bg-superficie"
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
            href={WHATSAPP_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="cursor-pointer rounded-lg border-2 border-primaria px-4 py-2 text-sm font-bold text-primaria transition-colors duration-200 hover:bg-primaria hover:text-branco"
          >
            WhatsApp
          </a>
          <a
            href="/fale-conosco"
            className="flex cursor-pointer items-center gap-2 rounded-lg bg-cta px-4 py-2.5 text-sm font-bold text-branco transition-colors duration-200 hover:brightness-95"
          >
            Agende sua consulta
            <ArrowRight size={16} aria-hidden="true" />
          </a>
        </div>

        {/* Botão mobile */}
        <button
          type="button"
          onClick={() => setOpenMobile((v) => !v)}
          aria-expanded={openMobile}
          aria-label={openMobile ? "Fechar menu" : "Abrir menu"}
          className="cursor-pointer p-2 text-texto lg:hidden"
        >
          {openMobile ? <X size={22} /> : <Menu size={22} />}
        </button>
      </nav>

      {/* Painel mobile */}
      <AnimatePresence>
        {openMobile && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.22 }}
            className="overflow-hidden border-t border-borda bg-branco lg:hidden"
          >
            <div className="flex flex-col px-4 py-3">
              {LINKS.map((l) => (
                <a
                  key={l.href}
                  href={l.href}
                  className="py-2.5 text-sm font-medium text-texto transition-colors duration-200 hover:text-primaria"
                >
                  {l.label}
                </a>
              ))}

              <p className="mt-3 text-xs font-bold uppercase tracking-widest text-secundaria">
                Unidades
              </p>
              {UNIDADES.map((u) => (
                <a
                  key={u.cidade}
                  href="/unidades"
                  className="py-2 text-sm text-texto transition-colors duration-200 hover:text-primaria"
                >
                  {u.cidade} <span className="text-xs text-secundaria">{u.uf}</span>
                </a>
              ))}

              <div className="mt-4 flex flex-col gap-2 pb-2">
                <a
                  href={WHATSAPP_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-lg border-2 border-primaria px-4 py-2.5 text-center text-sm font-bold text-primaria"
                >
                  WhatsApp
                </a>
                <a
                  href="/fale-conosco"
                  className="flex items-center justify-center gap-2 rounded-lg bg-cta px-4 py-3 text-center text-sm font-bold text-branco"
                >
                  Agende sua consulta
                  <ArrowRight size={16} aria-hidden="true" />
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
