# Pendências — Correia Odontologia

Lista de próximas melhorias combinadas com o cliente, para retomar nas próximas sessões.

## Em aberto

1. **Entrada/acesso das outras páginas do blog** — revisar e melhorar a navegação de entrada para os posts do blog (além dos 3 já ajustados na home). _(registrado em 2026-08-04)_
2. **Confirmar dado de contato divergente** — o WhatsApp exibido em `/fale-conosco` é `(17) 99717-8758`, mas o `unidades.json` da unidade Santa Fé do Sul tem `(17) 99625-6384`. Não foi alterado (ver regra de não corrigir dados sozinho no `AGENTS.md`, Seção 1.3) — confirmar com o cliente qual é o número correto e ajustar o que estiver desatualizado. _(registrado em 2026-08-04)_
3. **E-mail como canal alternativo** — se o cliente quiser, dá pra somar um envio por e-mail ao WhatsApp do formulário. Exige: adicionar adapter de servidor ao Astro (hoje é 100% estático), contratar serviço de e-mail transacional (Resend/SendGrid) + chave de API, e endereços de e-mail por unidade se quiser rotear por unidade (hoje só existe 1 e-mail geral no projeto). _(registrado em 2026-08-04)_
4. **Remover opção "Teste (Ícaro)" do select de unidade antes de publicar** — adicionada em `fale-conosco.astro` só pra validar o fluxo de envio pelo WhatsApp; não é uma unidade real, não faz parte do `unidades.json`. _(registrado em 2026-08-04)_
5. **Trocar a site key de teste do reCAPTCHA por uma real antes de publicar** — o formulário usa a site key pública de testes do Google (`6LeIxAcTAAAAAJcZVRqyHh71UMIEGNQ_MXjiZKhI`, sempre valida, serve só pra desenvolvimento) — por isso aparece o aviso vermelho "This reCAPTCHA is for testing purposes only" no widget; é esperado com essa chave e some sozinho ao trocar pela real. Cliente optou por não passar a key agora. Quando for gerar:
   1. Acessar https://www.google.com/recaptcha/admin/create (logado numa conta Google).
   2. Rótulo: qualquer nome (ex. "Correia Odontologia").
   3. Tipo: **reCAPTCHA v2 → "Caixa de seleção 'Não sou um robô'"** (mesmo formato já implementado, não muda o componente).
   4. Domínios: `localhost` (pra testar local) + o domínio final do site, se já souber (dá pra editar essa lista depois, sem gerar chave nova).
   5. Aceitar os termos e enviar — vai gerar **site key** (pública) e **secret key** (privada).
   6. Só a **site key** é necessária aqui; passar ela pra trocar o `data-sitekey` em `fale-conosco.astro`.
   Também vale lembrar: como o site é estático (sem backend), a verificação hoje é só no navegador — confirma que preencheu o captcha antes de abrir o WhatsApp, mas não faz a validação criptográfica server-side com a secret key (isso exigiria a mesma infraestrutura de servidor citada no item 3). _(registrado em 2026-08-04)_

## Concluído

- ~~Envio de mensagem pelo site.~~ O formulário de "Fale conosco" não enviava a lugar nenhum (só limpava os campos, sem `action`/backend). Adicionado campo de Unidade (populado do `unidades.json`) e o envio agora abre o WhatsApp real da unidade escolhida com os dados pré-preenchidos (nome, telefone, e-mail, mensagem), reaproveitando `linkWhatsapp()` de `unidadeLinks.ts`. Limitação técnica do `wa.me`: quem preenche ainda precisa apertar "enviar" dentro do WhatsApp. _(2026-08-04)_
- ~~Página "Fale conosco" — melhorar a exibição e disposição (layout/UX) dos elementos de contato.~~ Refeito como grade de cards com ícone; endereço, WhatsApp, e-mail, Facebook e Instagram viraram botões de redirecionamento (reaproveitando os helpers de `unidadeLinks.ts`); telefone fixo ganhou botão de copiar número além do `tel:`; cada ícone com a cor da própria marca/contexto. _(2026-08-04)_
- Carousel de fotos das unidades na página "Sobre Nós" (autoplay, um card por vez, sem setas/paginação, shadcn/embla) + cards de "Diferenciais" com ícone e reveal-on-scroll. _(2026-08-04)_
- Seção 0 do `AGENTS.md` — regra fixa de postura do agente (sênior UX/UI, sem alucinar, sem gambiarra, código curto e performático), checada antes de qualquer tarefa.

Ver `AGENTS.md` para as regras do projeto (paleta, imagens, skill de UI/UX etc.) antes de mexer em qualquer um dos itens acima.
