import { useEffect, useRef, useState } from "react";
import * as Dialog from "@radix-ui/react-dialog";
import { User, Phone, Mail, Building2, Calendar, Clock, ChevronDown, MessageCircle, X } from "lucide-react";
import { linkWhatsapp } from "../lib/unidadeLinks";

// Site key de TESTE pública do Google (sempre valida, uso só em dev/homologação).
// [A CONFIRMAR] trocar por uma site key real antes de publicar — rotina completa em PENDENCIAS.md.
const RECAPTCHA_SITE_KEY = "6LeIxAcTAAAAAJcZVRqyHh71UMIEGNQ_MXjiZKhI";

declare global {
  interface Window {
    grecaptcha?: {
      ready(callback: () => void): void;
      render(container: HTMLElement, params: { sitekey: string }): number;
      getResponse(widgetId?: number): string;
      reset(widgetId?: number): void;
    };
  }
}

// Mantém só dígitos — telefone não deve aceitar letra nem símbolo.
function somenteDigitos(valor: string): string {
  return valor.replace(/\D/g, "");
}

interface UnidadeOpcao {
  id: string;
  cidade: string;
  uf: string;
  whatsapp: string;
}

interface Props {
  unidades: UnidadeOpcao[];
}

// Leitura tipada de FormData — evita `string | File | null` solto pelo código.
function campo(dados: FormData, nome: string): string {
  const valor = dados.get(nome);
  return typeof valor === "string" ? valor.trim() : "";
}

export default function BookingModal({ unidades }: Props) {
  const [open, setOpen] = useState(false);
  const [erro, setErro] = useState("");
  const recaptchaRef = useRef<HTMLDivElement>(null);
  const widgetId = useRef<number | null>(null);

  // O reCAPTCHA precisa ser renderizado via API (não via classe "g-recaptcha")
  // porque o Dialog do Radix desmonta o conteúdo ao fechar — o container só
  // existe no DOM enquanto o modal está aberto, então o auto-render do script
  // do Google (que só roda uma vez, no carregamento da página) não alcança.
  // grecaptcha.ready() é a forma oficial de esperar o script terminar de
  // carregar antes de chamar render() — evita a corrida em que window.grecaptcha
  // já existe mas ainda não está pronto pra renderizar.
  useEffect(() => {
    if (!open) {
      widgetId.current = null;
      return;
    }
    let cancelado = false;

    const renderizar = () => {
      if (cancelado || !recaptchaRef.current || widgetId.current !== null) return;
      try {
        widgetId.current = window.grecaptcha!.render(recaptchaRef.current, { sitekey: RECAPTCHA_SITE_KEY });
      } catch (erroRender) {
        console.error("Falha ao renderizar o reCAPTCHA:", erroRender);
        setErro("Não foi possível carregar o reCAPTCHA. Recarregue a página e tente novamente.");
      }
    };

    const aguardarScript = () => {
      if (cancelado) return;
      if (window.grecaptcha?.ready) {
        window.grecaptcha.ready(renderizar);
      } else {
        window.setTimeout(aguardarScript, 200);
      }
    };
    aguardarScript();

    return () => {
      cancelado = true;
    };
  }, [open]);

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      const trigger = (e.target as HTMLElement)?.closest("[data-booking-trigger]");
      if (!trigger) return;
      e.preventDefault();
      setOpen(true);
    };
    document.addEventListener("click", handleClick);
    return () => document.removeEventListener("click", handleClick);
  }, []);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setErro("");

    const captcha = widgetId.current !== null ? window.grecaptcha?.getResponse(widgetId.current) : "";
    if (!captcha) {
      setErro("Confirme o reCAPTCHA antes de enviar.");
      return;
    }

    const form = e.currentTarget;
    const dados = new FormData(form);
    const unidade = unidades.find((u) => u.id === campo(dados, "unidade"));
    if (!unidade) {
      setErro("Escolha a unidade.");
      return;
    }

    const mensagem = [
      `Olá! Vim pelo site e quero agendar uma consulta na unidade de ${unidade.cidade}${unidade.uf === "MS" ? " - MS" : ""}.`,
      `Nome: ${campo(dados, "nome")}`,
      `Telefone: ${campo(dados, "telefone")}`,
      `E-mail: ${campo(dados, "email")}`,
      `Data desejada: ${campo(dados, "data")}`,
      `Horário desejado: ${campo(dados, "horario")}`,
      campo(dados, "mensagem") ? `Mensagem: ${campo(dados, "mensagem")}` : "",
    ]
      .filter(Boolean)
      .join("\n");

    window.open(linkWhatsapp(unidade.whatsapp, mensagem), "_blank", "noopener");
    form.reset();
    if (widgetId.current !== null) window.grecaptcha?.reset(widgetId.current);
    setOpen(false);
  };

  const dataMin = new Date().toISOString().slice(0, 10);

  return (
    <Dialog.Root open={open} onOpenChange={setOpen}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 z-50 bg-texto/60 data-[state=open]:animate-in data-[state=open]:fade-in data-[state=closed]:animate-out data-[state=closed]:fade-out" />
        <Dialog.Content
          id="bookform1"
          className="fixed left-1/2 top-1/2 z-50 max-h-[90vh] w-[calc(100%-2rem)] max-w-md -translate-x-1/2 -translate-y-1/2 overflow-y-auto rounded-[var(--raio)] bg-branco p-6 shadow-xl focus:outline-none"
        >
          <div className="mb-4 flex items-start justify-between">
            <Dialog.Title className="text-lg font-extrabold uppercase tracking-wide text-secundaria-forte">
              Agende sua consulta
            </Dialog.Title>
            <Dialog.Close
              aria-label="Fechar"
              className="cursor-pointer rounded p-1 text-texto/60 transition-colors duration-200 hover:text-primaria"
            >
              <X className="h-5 w-5" aria-hidden="true" />
            </Dialog.Close>
          </div>

          <form className="space-y-4" onSubmit={handleSubmit}>
            <div>
              <label htmlFor="booking-unidade" className="mb-1 block text-sm font-bold text-texto">
                Unidade
              </label>
              <div className="relative">
                <Building2 className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-secundaria" aria-hidden="true" />
                <select id="booking-unidade" name="unidade" required defaultValue="" className="field appearance-none pl-9 pr-9">
                  <option value="" disabled>
                    Escolha a unidade
                  </option>
                  {unidades.map((u) => (
                    <option key={u.id} value={u.id}>
                      {u.cidade}
                      {u.uf === "MS" ? " - MS" : ""}
                    </option>
                  ))}
                </select>
                <ChevronDown className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-secundaria" aria-hidden="true" />
              </div>
            </div>

            <div>
              <label htmlFor="booking-nome" className="mb-1 block text-sm font-bold text-texto">
                Seu nome
              </label>
              <div className="relative">
                <User className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-secundaria" aria-hidden="true" />
                <input
                  id="booking-nome"
                  name="nome"
                  type="text"
                  required
                  maxLength={80}
                  autoComplete="name"
                  placeholder="Seu nome"
                  className="field pl-9"
                />
              </div>
            </div>

            <div>
              <label htmlFor="booking-telefone" className="mb-1 block text-sm font-bold text-texto">
                Telefone
              </label>
              <div className="relative">
                <Phone className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-secundaria" aria-hidden="true" />
                <input
                  id="booking-telefone"
                  name="telefone"
                  type="tel"
                  required
                  inputMode="numeric"
                  autoComplete="tel"
                  maxLength={11}
                  pattern="[0-9]{8,11}"
                  placeholder="Telefone (somente números)"
                  className="field pl-9"
                  onInput={(e) => {
                    e.currentTarget.value = somenteDigitos(e.currentTarget.value);
                  }}
                />
              </div>
            </div>

            <div>
              <label htmlFor="booking-email" className="mb-1 block text-sm font-bold text-texto">
                E-mail
              </label>
              <div className="relative">
                <Mail className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-secundaria" aria-hidden="true" />
                <input
                  id="booking-email"
                  name="email"
                  type="email"
                  required
                  inputMode="email"
                  autoComplete="email"
                  maxLength={120}
                  placeholder="E-mail"
                  className="field pl-9"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label htmlFor="booking-data" className="mb-1 block text-sm font-bold text-texto">
                  Data desejada
                </label>
                <div className="relative">
                  <Calendar className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-secundaria" aria-hidden="true" />
                  <input id="booking-data" name="data" type="date" required min={dataMin} autoComplete="off" className="field pl-9" />
                </div>
              </div>
              <div>
                <label htmlFor="booking-horario" className="mb-1 block text-sm font-bold text-texto">
                  Horário
                </label>
                <div className="relative">
                  <Clock className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-secundaria" aria-hidden="true" />
                  <input id="booking-horario" name="horario" type="time" required autoComplete="off" className="field pl-9" />
                </div>
              </div>
            </div>

            <div>
              <label htmlFor="booking-mensagem" className="mb-1 block text-sm font-bold text-texto">
                Sua mensagem
              </label>
              <textarea id="booking-mensagem" name="mensagem" rows={3} placeholder="Sua mensagem" className="field" />
            </div>

            <div ref={recaptchaRef} />

            {erro && (
              <p className="text-sm font-semibold text-[#EA4335]" aria-live="polite">
                {erro}
              </p>
            )}

            <div className="flex justify-end gap-3 pt-1">
              <Dialog.Close asChild>
                <button type="button" className="btn btn-outline">
                  Cancelar
                </button>
              </Dialog.Close>
              <button type="submit" className="btn btn-cta">
                <MessageCircle className="h-4 w-4" aria-hidden="true" />
                Enviar pelo WhatsApp
              </button>
            </div>
          </form>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
