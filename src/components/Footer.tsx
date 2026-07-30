"use client";

import { MapPin, Mail, MessageCircle, ArrowRight } from "lucide-react";
import { FaFacebookF, FaInstagram } from "react-icons/fa6";

/**
 * Footer — versão organizada (decisão aprovada pelo cliente).
 * O rodapé antigo repetia, para CADA uma das 5 unidades: telefone, WhatsApp,
 * horários completos, endereço, "Redes da unidade" e textos de preenchimento,
 * além do mapa incorporado, créditos da agência antiga e o "style switcher".
 * Aqui mantemos o NAP (nome, endereço, telefone) das 5 unidades — importante
 * para SEO local — e movemos horários, mapa e redes por unidade para as
 * páginas de unidade. Ver PROMPT, Seção 6.5.
 */

const NAV = [
  { label: "Home", href: "/" },
  { label: "Sobre nós", href: "/sobre-nos" },
  { label: "Serviços", href: "/servicos" },
  { label: "Equipe", href: "/equipe" },
  { label: "Blog", href: "/blog" },
  { label: "Fale conosco", href: "/fale-conosco" },
];

const UNIDADES = [
  {
    cidade: "Santa Fé do Sul",
    uf: "SP",
    endereco: "Rua 17, nº 996 - Centro",
    telefone: "(17) 3641-0544",
    telHref: "tel:+551736410544",
  },
  {
    cidade: "Jales",
    uf: "SP",
    endereco: "Rua 15, nº 2332 - Centro",
    telefone: "(17) 3632-0199",
    telHref: "tel:+551736320199",
  },
  {
    cidade: "São José do Rio Preto",
    uf: "SP",
    endereco: "R. Saldanha Marinho, 4023 - Vila Santo Antônio",
    telefone: "(17) 99783-7994",
    telHref: "tel:+5517997837994",
  },
  {
    cidade: "Votuporanga",
    uf: "SP",
    endereco: "Av. João Gonçalves Leite, 4557 - Jardim Alvorada",
    telefone: "(17) 3421-3421",
    telHref: "tel:+551734213421",
  },
  {
    cidade: "Três Lagoas",
    uf: "MS",
    endereco: "Av. Cap. Olinto Mancini, 3605 - Quinta da Lagoa",
    telefone: "(67) 9208-7829",
    telHref: "tel:+556792087829",
  },
];

const WHATSAPP_URL =
  "https://api.whatsapp.com/send?phone=5517996256384&text=Ol%C3%A1%2C%20estou%20no%20site%20da%20Correia%20Odontologia%20e%20gostaria%20de%20saber%20mais!";

interface FooterProps {
  /** URL da logo — a página Astro importa o asset e passa `logo.src` */
  logoSrc: string;
}

export default function Footer({ logoSrc }: FooterProps) {
  return (
    <footer className="bg-rodape text-branco">
      <div className="mx-auto max-w-7xl px-4 py-14 md:px-8">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-4">
          {/* Marca */}
          <div>
            <img src={logoSrc} alt="Correia Odontologia" className="mb-4 h-9 w-auto" />
            <p className="max-w-xs text-sm leading-relaxed text-white/70">
              Desde 2018 cuidando do seu sorriso, com atendimento humanizado em cinco cidades.
            </p>
            <div className="mt-5 flex gap-3">
              <a
                href="https://www.facebook.com/clinica.correia"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook"
                className="flex h-9 w-9 cursor-pointer items-center justify-center rounded-lg border border-white/20 transition-colors duration-200 hover:border-primaria hover:text-primaria"
              >
                <FaFacebookF size={15} />
              </a>
              <a
                href="https://www.instagram.com/clinica.correia/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="flex h-9 w-9 cursor-pointer items-center justify-center rounded-lg border border-white/20 transition-colors duration-200 hover:border-primaria hover:text-primaria"
              >
                <FaInstagram size={15} />
              </a>
            </div>
          </div>

          {/* Navegação */}
          <nav aria-label="Navegação do rodapé">
            <h3 className="mb-4 text-xs font-bold uppercase tracking-[0.18em] text-primaria">
              Navegação
            </h3>
            <ul className="space-y-2.5">
              {NAV.map((l) => (
                <li key={l.href}>
                  <a
                    href={l.href}
                    className="text-sm text-white/70 transition-colors duration-200 hover:text-branco"
                  >
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          {/* Unidades (NAP compacto) */}
          <div className="lg:col-span-1">
            <h3 className="mb-4 text-xs font-bold uppercase tracking-[0.18em] text-primaria">
              Unidades
            </h3>
            <ul className="space-y-3.5">
              {UNIDADES.map((u) => (
                <li key={u.cidade} className="text-sm leading-snug">
                  <span className="font-semibold text-branco">
                    {u.cidade} <span className="text-xs text-white/40">{u.uf}</span>
                  </span>
                  <br />
                  <span className="text-white/60">{u.endereco}</span>
                  <br />
                  <a
                    href={u.telHref}
                    className="text-white/70 transition-colors duration-200 hover:text-primaria"
                  >
                    {u.telefone}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contato / CTA */}
          <div>
            <h3 className="mb-4 text-xs font-bold uppercase tracking-[0.18em] text-primaria">
              Fale com a gente
            </h3>
            <a
              href="mailto:agendamento@correiaodontologia.com.br"
              className="mb-3 flex items-start gap-2.5 text-sm text-white/70 transition-colors duration-200 hover:text-branco"
            >
              <Mail size={16} className="mt-0.5 shrink-0 text-primaria" aria-hidden="true" />
              <span className="break-all">agendamento@correiaodontologia.com.br</span>
            </a>
            <a
              href="/unidades"
              className="mb-5 flex items-start gap-2.5 text-sm text-white/70 transition-colors duration-200 hover:text-branco"
            >
              <MapPin size={16} className="mt-0.5 shrink-0 text-primaria" aria-hidden="true" />
              <span>Ver todas as unidades e horários</span>
            </a>

            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="mb-2.5 flex cursor-pointer items-center justify-center gap-2 rounded-lg border-2 border-primaria px-4 py-2.5 text-sm font-bold text-primaria transition-colors duration-200 hover:bg-primaria hover:text-branco"
            >
              <MessageCircle size={16} aria-hidden="true" />
              WhatsApp
            </a>
            <a
              href="/fale-conosco"
              className="flex cursor-pointer items-center justify-center gap-2 rounded-lg bg-cta px-4 py-3 text-sm font-bold text-texto transition-all duration-200 hover:brightness-95"
            >
              Agende sua consulta
              <ArrowRight size={16} aria-hidden="true" />
            </a>
          </div>
        </div>
      </div>

      {/* Barra inferior — informação legal obrigatória (CRO / responsável técnica) */}
      <div className="border-t border-white/10">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-3 px-4 py-6 text-center text-xs text-white/50 md:flex-row md:px-8 md:text-left">
          <p>
            © 2026 Correia Odontologia. Todos os direitos reservados. CRO-SP: 20.917 · RT Dra.
            Letícia S. M. Correia CRO/SP 129.476
          </p>
          <p>
            Desenvolvido por{" "}
            <a
              href="https://wa.me/5517992641230"
              target="_blank"
              rel="noopener noreferrer"
              className="font-semibold text-white/70 transition-colors duration-200 hover:text-primaria"
            >
              Ícaro Carneiro
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
