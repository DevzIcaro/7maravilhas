import { useEffect, useState } from "react";
import * as Dialog from "@radix-ui/react-dialog";
import { User, Mail, Landmark, Calendar, ChevronDown, Send, X } from "lucide-react";
import { dataLocalHoje } from "../lib/data";
import { linkMailto } from "../lib/mensagem";

interface MaravilhaOpcao {
  id: string;
  nome: string;
  pais: string;
}

interface Props {
  maravilhas: MaravilhaOpcao[];
}

// Leitura tipada de FormData — evita `string | File | null` solto pelo código.
function campo(dados: FormData, nome: string): string {
  const valor = dados.get(nome);
  return typeof valor === "string" ? valor.trim() : "";
}

/**
 * Modal "Planeje sua visita". Abre por qualquer elemento com
 * `data-booking-trigger`. O envio monta um e-mail (mailto:) para o endereço
 * de src/data/contato.json; sem e-mail cadastrado, informa que o envio ainda
 * não está disponível, sem redirecionar para lugar nenhum.
 */
export default function BookingModal({ maravilhas }: Props) {
  const [open, setOpen] = useState(false);
  const [erro, setErro] = useState("");

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

    const form = e.currentTarget;
    const dados = new FormData(form);
    const maravilha = maravilhas.find((m) => m.id === campo(dados, "maravilha"));
    if (!maravilha) {
      setErro("Escolha a maravilha.");
      return;
    }

    const corpo = [
      `Quero planejar uma visita a ${maravilha.nome} (${maravilha.pais}).`,
      `Nome: ${campo(dados, "nome")}`,
      `E-mail: ${campo(dados, "email")}`,
      `Data prevista: ${campo(dados, "data")}`,
      campo(dados, "mensagem") ? `Mensagem: ${campo(dados, "mensagem")}` : "",
    ]
      .filter(Boolean)
      .join("\n");

    const destino = linkMailto(`Planejar visita: ${maravilha.nome}`, corpo);
    if (!destino) {
      setErro("Envio indisponível no momento.");
      return;
    }

    window.location.href = destino;
    form.reset();
    setOpen(false);
  };

  const dataMin = dataLocalHoje();

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
              Planeje sua visita
            </Dialog.Title>
            <Dialog.Close
              aria-label="Fechar"
              className="cursor-pointer rounded p-1 text-texto/60 transition-colors duration-200 hover:text-primaria"
            >
              <X className="h-5 w-5" aria-hidden="true" />
            </Dialog.Close>
          </div>
          <Dialog.Description className="sr-only">
            Escolha a maravilha, informe seus dados e a data prevista da visita.
          </Dialog.Description>

          <form className="space-y-4" onSubmit={handleSubmit}>
            <div>
              <label htmlFor="booking-maravilha" className="mb-1 block text-sm font-bold text-texto">
                Maravilha
              </label>
              <div className="relative">
                <Landmark className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-secundaria" aria-hidden="true" />
                <select id="booking-maravilha" name="maravilha" required defaultValue="" className="field appearance-none pl-9 pr-9">
                  <option value="" disabled>
                    Escolha a maravilha
                  </option>
                  {maravilhas.map((m) => (
                    <option key={m.id} value={m.id}>
                      {m.nome} — {m.pais}
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

            <div>
              <label htmlFor="booking-data" className="mb-1 block text-sm font-bold text-texto">
                Data prevista
              </label>
              <div className="relative">
                <Calendar className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-secundaria" aria-hidden="true" />
                <input id="booking-data" name="data" type="date" required min={dataMin} autoComplete="off" className="field pl-9" />
              </div>
            </div>

            <div>
              <label htmlFor="booking-mensagem" className="mb-1 block text-sm font-bold text-texto">
                Sua mensagem
              </label>
              <textarea id="booking-mensagem" name="mensagem" rows={3} placeholder="Sua mensagem" className="field" />
            </div>

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
                <Send className="h-4 w-4" aria-hidden="true" />
                Enviar
              </button>
            </div>
          </form>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
