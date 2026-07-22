import { useEffect, useState } from "react";
import * as Dialog from "@radix-ui/react-dialog";
import { User, Phone, Mail, MessageSquare, X } from "lucide-react";

export default function BookingModal() {
  const [open, setOpen] = useState(false);
  const [recaptchaOk, setRecaptchaOk] = useState(false);

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
    if (!recaptchaOk) return;
    setOpen(false);
    setRecaptchaOk(false);
    (e.target as HTMLFormElement).reset();
  };

  return (
    <Dialog.Root open={open} onOpenChange={setOpen}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 z-50 bg-texto/60 data-[state=open]:animate-in data-[state=open]:fade-in data-[state=closed]:animate-out data-[state=closed]:fade-out" />
        <Dialog.Content
          id="bookform1"
          className="fixed left-1/2 top-1/2 z-50 w-[calc(100%-2rem)] max-w-md -translate-x-1/2 -translate-y-1/2 rounded-[var(--raio)] bg-branco p-6 shadow-xl focus:outline-none"
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
              <label htmlFor="booking-nome" className="mb-1 block text-sm font-bold text-texto">
                Seu nome
              </label>
              <div className="relative">
                <User className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-secundaria" aria-hidden="true" />
                <input id="booking-nome" name="nome" type="text" required placeholder="Seu nome" className="field pl-9" />
              </div>
            </div>

            <div>
              <label htmlFor="booking-telefone" className="mb-1 block text-sm font-bold text-texto">
                Telefone
              </label>
              <div className="relative">
                <Phone className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-secundaria" aria-hidden="true" />
                <input id="booking-telefone" name="telefone" type="tel" required placeholder="Telefone" className="field pl-9" />
              </div>
            </div>

            <div>
              <label htmlFor="booking-email" className="mb-1 block text-sm font-bold text-texto">
                E-mail
              </label>
              <div className="relative">
                <Mail className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-secundaria" aria-hidden="true" />
                <input id="booking-email" name="email" type="email" required placeholder="E-mail" className="field pl-9" />
              </div>
            </div>

            <div>
              <label htmlFor="booking-mensagem" className="mb-1 block text-sm font-bold text-texto">
                Sua mensagem
              </label>
              <div className="relative">
                <MessageSquare className="pointer-events-none absolute left-3 top-3 h-4 w-4 text-secundaria" aria-hidden="true" />
                <textarea id="booking-mensagem" name="mensagem" rows={3} placeholder="Sua mensagem" className="field pl-9" />
              </div>
            </div>

            {/* Placeholder de reCAPTCHA — integrar com as chaves reais do cliente. Nunca resolver automaticamente. */}
            <label className="flex cursor-pointer items-center gap-3 rounded-[var(--raio)] border border-borda bg-superficie px-3 py-2.5 text-sm text-texto">
              <input
                type="checkbox"
                required
                checked={recaptchaOk}
                onChange={(e) => setRecaptchaOk(e.target.checked)}
                className="h-4 w-4 cursor-pointer accent-secundaria-forte"
              />
              Não sou um robô
            </label>

            <div className="flex justify-end gap-3 pt-1">
              <Dialog.Close asChild>
                <button type="button" className="btn btn-outline">
                  Cancelar
                </button>
              </Dialog.Close>
              <button type="submit" className="btn btn-cta">
                Enviar
              </button>
            </div>
          </form>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
