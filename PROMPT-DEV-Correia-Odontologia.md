# PROMPT DE DESENVOLVIMENTO — Site Correia Odontologia

> Documento-prompt para reconstruir o site da **Correia Odontologia** replicando a arquitetura, o conteúdo e as cores do sistema atual. Escrito a partir de análise factual do site em produção (`correiaodontologia.com.br`) — páginas `/`, `/sobre-nos`, `/servicos`, `/equipe`, `/fale-conosco`, `/blog`. Nada aqui foi inventado; onde um dado não pôde ser lido, está marcado como **[A CONFIRMAR]**.

---

## 1. Papel e objetivo

Você é um **desenvolvedor front-end sênior + designer UX/UI + arquiteto de software**. Sua tarefa é **reconstruir o site da Correia Odontologia** mantendo:

- a **mesma arquitetura** (site multi-página / MPA, orientado a conteúdo);
- o **mesmo conteúdo, exatamente** — sem adicionar, remover ou reescrever textos;
- a **mesma paleta de cores** do sistema atual.

O resultado deve ser tecnicamente superior (responsividade, performance, SEO, acessibilidade), mas **fiel** ao que existe hoje em conteúdo e identidade visual.

---

## 2. Regras invioláveis (anti-alucinação)

1. **Não invente conteúdo.** Todo texto, nome, telefone, endereço, horário, CRO e depoimento deve vir deste documento (ou do site atual), na forma literal.
2. **Não adicione seções, serviços, unidades ou profissionais** que não existam aqui. **Não remova** nenhum que exista.
3. **Não "corrija" dados** por conta própria (telefones divergentes, imagens repetidas, etc.). Onde houver inconsistência, veja a Seção 11 e **sinalize ao cliente** — não altere sem aprovação.
4. **Não invente cores.** Use os tokens da Seção 10, obtidos por amostragem do site real. Se algum valor estiver **[A CONFIRMAR]**, pare e peça o valor — não chute.
5. **Não invente imagens.** Reutilize os assets do site atual (caminhos na Seção 9) ou deixe placeholders nomeados; não gere fotos novas.
6. Se faltar informação, escreva **[A CONFIRMAR]** e siga — nunca preencha com suposição.

---

## 3. Arquitetura do sistema ATUAL (diagnóstico factual)

**Tipo:** Aplicação **multi-página (MPA)**, renderizada no servidor por um **CMS proprietário** — "SGC Lemon", da agência **Mundo Lemon**. Painel administrativo em `correiaodontologia.mundolemon.com.br`.

**Sinais técnicos observados:**
- **jQuery + Fancybox** (modal de agendamento aberto via âncora `#bookform1`).
- **Preloader** em GIF (`/images/preloader.gif`) em todas as páginas.
- **"Style switcher / Choose color style"** no rodapé — o template embarca **múltiplos skins de cor** (evidência: assets de depoimento em `reviw-cinza/vermelho/azul/amarelo/verde.png`).
- **URLs limpas** por rota (não é SPA; cada rota é um full page load).
- **Mídia/uploads** servidos de um subdomínio do CMS: `correiaodontologia.mundolemon.com.br/img/uploads/...`; assets estáticos do tema em `correiaodontologia.com.br/images/...`.

**Conteúdo é orientado a coleções gerenciadas no CMS** (banco de dados por trás): Unidades, Equipe, Serviços, Blog/Notícias, Depoimentos, Banners e Páginas institucionais.

**Layout compartilhado (todas as páginas):** barra de topo → cabeçalho/nav → (conteúdo da rota) → faixa "Agende uma consulta" → rodapé. O **modal de agendamento** e o **rodapé de contatos das 5 unidades** se repetem em todas as rotas.

```
[ Top bar: endereço · redes · e-mail · telefones das unidades ]
[ Header: logo + nav (HOME / SOBRE NÓS / SERVIÇOS / FALE CONOSCO / BLOG) ]
[ Conteúdo da rota ]
[ Faixa CTA: "Agende uma consulta" → #bookform1 ]
[ Footer: mapa do site · contatos das 5 unidades · mapa Google · créditos · style switcher ]
[ Modal (#bookform1): "Agende sua consulta" (Fancybox) ]
```

---

## 4. Arquitetura ALVO do desenvolvimento

Manter o **paradigma MPA orientado a conteúdo**, modernizando a base:

- **Stack sugerida:** Astro (MPA, HTML estático/SSR) **ou** Next.js (App Router em modo estático) — escolha a critério do dev. Conteúdo em **coleções** (Markdown/JSON ou CMS headless) para o cliente editar.
- **Camada de conteúdo (collections):** `unidades`, `equipe`, `servicos`, `posts`, `depoimentos`, `paginas`. Ver modelo na Seção 8.
- **Componentes globais reutilizáveis:** `TopBar`, `Header/Nav`, `BookingModal`, `CTAAgende`, `Footer`. Ver Seção 6.
- **Renderização:** uma página por rota (Seção 5). Sem depender de jQuery; modal e interações em JS nativo/framework.
- **Requisitos não-funcionais:** mobile-first, responsivo real, Core Web Vitals no verde (remover preloader e imagens pesadas), acessibilidade (alt, contraste, foco), SEO técnico por página (title/description próprios, schema `LocalBusiness` por unidade, sitemap, robots).

> A modernização é de **engenharia**. **Conteúdo e cores permanecem idênticos.**

---

## 5. Mapa de rotas (replicar exatamente)

| Rota | Página |
|---|---|
| `/` | Home |
| `/sobre-nos` | Sobre Nós |
| `/servicos` | Serviços |
| `/equipe` | Nossa Equipe |
| `/fale-conosco` | Fale Conosco |
| `/blog` | Blog (listagem) |
| `/blog/ver/{id}/{slug}` | Post do blog (detalhe) |
| `#bookform1` | Modal "Agende sua consulta" (global) |

---

## 6. Componentes globais (conteúdo literal)

### 6.1 Top bar — REMOVIDA (decisão aprovada pelo cliente)

A barra de topo do site atual (endereço, Facebook, Instagram, e-mail e a lista de telefones/WhatsApp das 5 cidades) **não deve ser reproduzida**. Motivo: poluição visual e informação redundante — esses dados já aparecem nas páginas de unidades/contato e no rodapé.

Conteúdo original, mantido aqui apenas como registro (não implementar no topo):
- Endereço: Rua 17, nº 996 - Centro, Santa Fé do Sul - SP
- Facebook `https://www.facebook.com/clinica.correia` · Instagram `https://www.instagram.com/clinica.correia/`
- E-mail: agendamento@correiaodontologia.com.br
- Telefones por cidade (com as inconsistências da Seção 11): Rio Preto WhatsApp (17) 99783-7994 · Tel (17) 3641-0544 · WhatsApp (17) 99674-4146; Santa Fé do Sul WhatsApp (17) 3632-0199 · Tel (17) 3632-0198; Jales WhatsApp (67) 9208-7829; Três Lagoas WhatsApp (17) 3421-3421; Votuporanga (vazio)

> Esses dados continuam obrigatórios no **rodapé** (Seção 6.5) e nas páginas de unidade/contato. Nada de contato se perde — só sai do topo.

### 6.2 Header / Navegação (padrão limpo — aprovado)

Estrutura de três blocos, referência de mercado (logo | links | ações):

- **Esquerda:** logo (asset importado) com link para `/`.
- **Centro:** links de texto — **Home · Sobre · Serviços · Equipe · Blog · Unidades** (este último é um *dropdown*).
  - O dropdown **Unidades** lista as 5 cidades (Santa Fé do Sul/SP, Jales/SP, São José do Rio Preto/SP, Votuporanga/SP, Três Lagoas/MS) e um link final para **Fale conosco**.
- **Direita:** duas ações —
  1. **WhatsApp** (botão com contorno, `--cor-primaria`);
  2. **Agende sua consulta** (botão sólido `--cor-cta`, texto branco, com ícone de seta).

Comportamento: header fixo no topo (`sticky`), borda inferior sutil (`--cor-borda`), fundo branco. Em telas menores que `lg`, os links colapsam em menu hambúrguer com painel expansível contendo links, unidades e as duas ações. Dropdown e painel fecham com clique fora e com a tecla Escape; `aria-expanded`/`aria-haspopup` presentes; ícones em SVG (lucide), nunca emoji.

Implementação de referência: `src/components/Navbar.tsx`.

### 6.3 Modal de agendamento (`#bookform1`)
- Título: **"AGENDE SUA CONSULTA"**
- Campos (confirmados por captura de tela do site):
  1. **Seu nome** (ícone de pessoa) — placeholder "Seu nome"
  2. **Telefone** (ícone de telefone) — placeholder "Telefone"
  3. **E-mail** (ícone de envelope) — placeholder "E-mail"
  4. **Sua mensagem** (textarea) — placeholder "Sua mensagem"
- **reCAPTCHA** ("Não sou um robô") antes do envio.
- Botões: **Enviar** / **Cancelar**.
- Observações de implementação (UX/acessibilidade, sem alterar o conteúdo): adicionar `<label>` real para cada campo (hoje só há placeholder), indicar campos obrigatórios e manter o reCAPTCHA. O reCAPTCHA deve ser configurado com as chaves do cliente; nunca resolvê-lo automaticamente.

### 6.4 Faixa CTA (repetida)
- Título: **"Agende uma consulta"**
- Texto: **"Agende sua consulta agora na Correia Odontologia!"**
- Botão: **+ Agende uma consulta** → `#bookform1`

### 6.5 Footer (repetido)
- Logo `/images/logo2.png`
- **Mapa do site:** Home · Sobre Nos · Servicos · Blog · Fale Conosco · Agende sua Consulta
- Direitos: **"© 2026 | Todos os direitos reservados | Correia Odontologia CRO-SP: 20.917  RT Dra. Leticia S. M. Correia CRO/SP 129.476"**
- Bloco **CONTATOS** (5 unidades) — literal:

**Santa Fé do Sul** — Tel (17) 3641-0544 · WhatsApp (17) 99625-6384
Seg: 09:00 - 12:00 - 14:00 - 18:00 (atendimentos a partir das 09:00) · Ter a Sex: 08:00 - 12:00 - 14:00 - 19:00 · Sab: 08:00 - 12:00
Rua 17, nº 996 - Centro, Santa Fe do Sul - SP
Redes: facebook.com/clinica.correia · instagram.com/clinica.correia

**Jales** — Tel (17) 3632-0199 · WhatsApp (17) 3632-0199
Seg: 08:00 as 19:00 (atendimentos a partir das 09:00) · Ter a Sex: 07:30 as 19:00 · Sab: 08:00 as 12:00
Rua 15, nº 2332 - Centro, Jales - SP
Redes: facebook.com/correia.jales · instagram.com/correia.jales

**São José do Rio Preto** — Tel (17) 99783-7994 · WhatsApp (18) 99182-0880
Seg: 09:30 as 12:00 | 14:00 as 18:00 · Ter a Sex: 08:30 as 12:00 | 14:00 as 18:30 · Sab: 08:00 as 12:00
R. Saldanha Marinho, 4023 - Vila Santo Antonio, Sao Jose do Rio Preto - SP
Redes: "Consulte a unidade pelo WhatsApp para atendimento nas redes."

**Votuporanga** — Tel (17) 3421-3421 · WhatsApp (17) 99625-6384
"Consulte horarios e disponibilidade pelo WhatsApp."
Avenida Joao Goncalves Leite, 4557 - Jardim Alvorada, Votuporanga - SP
Redes: "Consulte a unidade pelo WhatsApp para atendimento nas redes."

**Três Lagoas** — Tel (67) 9208-7829 · WhatsApp (67) 9208-7829
Seg: 09:00 as 11:30 | 13:30 as 18:00 · Ter a Sex: 08:30 as 11:30 | 13:30 as 18:30 · Sab: 08:00 as 12:00
Av. Cap. Olinto Mancini, 3605 - Salao 1 - Quinta da Lagoa, Tres Lagoas - MS
Redes: "Consulte a unidade pelo WhatsApp para atendimento nas redes."

- E-mail: agendamento@correiaodontologia.com.br
- Créditos: "desenvolvido por Mundo Lemon" (`mundolemon.com.br`) · "Painel administracao - SGC Lemon"
- **Mapa Google** (embed) — unidade Santa Fé do Sul (coordenadas ~ -20.2082, -50.9291)
- **Style switcher / Choose color style** (ver Seção 10)

---

## 7. Modelo de dados (coleções)

```yaml
unidade:
  cidade: string           # Santa Fé do Sul | Jales | São José do Rio Preto | Votuporanga | Três Lagoas
  uf: string               # SP | MS
  endereco: string
  telefone: string
  whatsapp: string
  horarios: string         # texto multilinha (como no site)
  redes: { facebook?: url, instagram?: url } | texto
  fotos: [fachada, estabelecimento]

profissional:
  nome: string
  especialidade: string
  cro: string              # ex.: CRO/SP 167222
  cidade: string           # unidade a que pertence

servico:
  titulo: string
  descricao: string        # texto literal
  imagem: string
  categoria: string        # p/ os filtros da página de serviços

post:
  id: number
  slug: string
  titulo: string
  data: datetime
  resumo: string
  imagem: string

depoimento:
  autor: string
  papel: "Cliente"
  texto: string
```

---

## 8. Conteúdo página a página (replicar literalmente)

### 8.1 HOME (`/`)

**Banner** — imagem com alt: *"Consultório de odontologia com uma cadeira de dentista e televisão virada para a face do cliente"*.

**Destaques de serviços (4 cards):**
- **Clareamento** — "Traga um brilho ao seu sorriso com o clareamento dentário. Dentes bonitos e brancos sem remover a superfície dentária! - **Clínico Geral**"
- **Implantes** — "São estruturas ou suportes de titânio posicionados na maxila e mandíbula para substituir as raízes dentárias. - **Clínico Geral**"
- **Extrações** — "Simples ou cirúrgica. - **Clínico Geral**"
- **Aparelhos** — "Trabalhamos com aparelhos dentários para fins estéticos e ortopédicos, prezando sempre pela saúde do seu sorriso. - **Clínico Geral**"

**SOBRE NOSSA CLÍNICA** — "A Clínica Correia Odontologia surgiu no final de 2018. Temos compromisso constante com excelência em atendimento, utilização das técnicas e tecnologias mais modernas da Odontologia e proporcionar uma vida mais feliz aos nossos pacientes por meio de um novo sorriso. ..." → botão **Ler mais** para `/sobre-nos`.

**CONHEÇA NOSSA EQUIPE** — "A Correia Odontologia conta com uma equipe de ponta para atender suas necessidades dentárias!" → **Ver todos** para `/equipe`. Cards exibidos na home (6):
1. Dr. Mario Eugênio Zaparoli — Implantodontista — CRO/MS 6501
2. Dra.Ana Laura Silva Balbino — Avaliadora — CRO/MS 8666
3. Dr. Valdemilson dos Reis Rodrigues Filho — Avaliador — CRO/SP 153201
4. Dra. Isabele Fernanda Boldrin — Ortodontia e Facetas — CRO/SP 161077
5. Dr. Ademar Santana Neto — Avaliador — CRO/SP 164268
6. Dr. Pablo Henrique Frasson — Diretor Clínico / Protesista — CRO/SP 167222

**DEPOIMENTOS** — intro: "Na Clínica Correia Odontologia, a sua satisfação é a nossa prioridade. Sabemos que escolher um dentista é uma decisão importante, por isso, ficamos felizes em compartilhar o que nossos pacientes falam sobre a gente." — 10 depoimentos:
1. **Nicole Alves** (Cliente) — "Ótimo lugar, atendimento maravilhoso. Profissionalismo extremamente capacitados! Super recomendo. Lugar Limpo, extremamente aconchegante"
2. **Victor Zete Alyne Ferro** (Cliente) — "É maravilhoso o atendimento. Eles são extremamente cuidadosos e profissionais. Recomendo. Nota mil."
3. **Elena Camargo** (Cliente) — "Eu estou fazendo tratamento, fiz implantes e tô amando o trabalho dos profissionais."
4. **Rosivani De Fatima** (Cliente) — "Fiz facetas em resina, adorei o tratamento, desde o início até o final. O sorriso melhora bastante e dá mais confiança. Super indico."
5. **Ana Paula Belan Silva Beian** (Cliente) — "Excelente atendimento. Muito atencioso todos os profissionais desde a recepção até o último profissional que é o dentista!"
6. **Edilson Correia** (Cliente) — "Excepcional atendimento carinho e profissionalismo resolveu meus problemas. Fico muito feliz pois facilitaram o pagamento do jeito que eu podia e desejava pagar. Obrigado por tudo a Correia ODONTOLOGIA. Recomendo a todos."
7. **Cleber Thayron** (Cliente) — "A melhor da região...profissionais altamente especializados e o melhor atendimento...top....ah .. preços cabíveis e justos tbm!!!!"
8. **Bruna Bianca** (Cliente) — "Uma excelente clinica, com atendimento diferenciado e parcelas que cabem no seu bolso."
9. **Sarah Monteiro Capassi** (Cliente) — "Profissionais competentes e especializados, atendimento personalizado, compreensivos para entender o problema do cliente. Preço justo e bons de negociação. Sempre fui muito bem atendida!"
10. **Lucas Marques** (Cliente) — "Clínica excelente, especialista em ajudar realizar sonhos. Se você sonha em ter um sorriso lindo e deixar sua saúde em dia… não perca tempo! Estou muito contente com meu tratamento e meu sorriso. Super indico."

**Conheça nossas Clínicas** — "E saiba onde as encontrar!" — 5 blocos (descrição + endereço + WhatsApp + Telefone + horário, cada um com foto de fachada e estabelecimento):
- **Jales** — "Localizada em Jales, a Correia Odontologia conta com uma equipe de profissionais experientes e capacitados para um atendimento personalizado e humanizado, onde todos estao sempre atualizados com os constantes avanços da odontologia. Todos os detalhes são pensados para oferecer uma experiencia diferenciada onde a éficacia combina com acolhimento, resultados com presença e atençao, tratamento com vinculo e relaçoes com respeito." — Rua 15, Nº 2332, Centro, Jales - SP — WhatsApp (17) 3632-0199 — Telefone (17) 3632-0199 — Seg: 08:00 às 19:00 (atendimentos a partir das 09:00); Ter a Sex: 07:30 às 19:00; Sáb: 08:00 às 12:00
- **São José do Rio Preto** — "Em São José do Rio Preto, temos compromisso constante com excelência em atendimento, utilização das tecnologias de ponta da Odontologia e nossa missão é proporcionar uma vida mais feliz aos nossos pacientes por meio de um novo sorriso. Além disso oferecemos todos os tipos de tratamentos e contamos com o grande diferencial: Atendimento humanizado!" — R. Saldanha Marinho, 4023 - Vila Santo Antonio — WhatsApp (18) 99182-0880 — Telefone (17) 99783-7994 — Seg: 09:30 às 12:00 | 14:00 às 18:00; Ter a Sex: 08:30 às 12:00 | 14:00 às 18:30; Sáb: 08:00 às 12:00
- **Santa Fé do Sul** — "Em Santa Fé do Sul, contamos com uma equipe de profissionais altamente qualificados e dedicados, todos comprometidos em fornecer o melhor atendimento aos nossos pacientes. Nossa clínica é um espaço acolhedor e moderno, projetado para proporcionar aos nossos pacientes uma experiência positiva e confortável durante seus atendimentos. Valorizamos a comunicação aberta e transparente com nossos pacientes, buscando sempre entender suas necessidades e preocupações individuais para oferecer o melhor plano de tratamento." — Rua 17, Nº 996, Centro — WhatsApp (17) 99625-6384 — Telefone (17) 3641-0544
- **Votuporanga SP** — "Em Votuporanga, contamos com uma equipe de profissionais altamente qualificados e dedicados, todos comprometidos em fornecer o melhor atendimento aos nossos pacientes. Nossa clínica é um espaço acolhedor e moderno, projetado para proporcionar aos nossos pacientes uma experiência positiva e confortável durante seus atendimentos. Valorizamos a comunicação aberta e transparente com nossos pacientes, buscando sempre entender suas necessidades e preocupações individuais para oferecer o melhor plano de tratamento." — Avenida João Gonçalves Leite, 4557, Jardim Alvorada — WhatsApp (17) 99625-6384 — Telefone 17 3421-3421
- **Três Lagoas** — "A Correia Odontologia é uma empresa que foi criada em 2018 na cidade de Santa Fé do Sul e já chegamos na cidade de Três Lagoas. Em Três Lagoas, a clinica Correia Odontologia se encontra na Rua Rio de Janeiro n 2416 Bairro Coester, a clinica tem como objetivo transformar o seu sorriso, com profissionais altamente qualificados e experientes, oferecemos um atendimento humanizado e com os melhores equipamentos odontologico." — Av. Cap. Olinto Mancini, 3605 - salão 1 - Q.ta da Lagoa, Três Lagoas - MS — WhatsApp (67) 9208-7829 — Telefone: vazio na seção da home, porém o rodapé lista **(67) 9208-7829** (mesmo número do WhatsApp) — usar esse; confirmar com o cliente se há um fixo distinto — Seg: 08:00 às 11:30 | 13:30 às 18:00; Ter a Sex: 08:30 às 11:30 | 13:30 às 18:30; Sáb: 08:00 às 12:00

**ÚLTIMAS NOTÍCIAS** — intro: "Fique por dentro das novidades da Clínica Correia Odontologia! Encontre dicas de cuidados bucais, conheça as últimas tecnologias em tratamentos, e leia sobre higiene oral e eventos interessantes do mundo da odontologia e saúde." — mesmos 6 posts da Seção 8.6.

### 8.2 SERVIÇOS (`/servicos`)
- H1 **SERVIÇOS** (breadcrumb Home › Serviços)
- Intro: "Na Correia Odontolgia temos profissionais qualificados e equipamentos de ponta, para atender você e sua família!" (imagem `cadeira.jpg`)
- **Filtros:** Todos · Tratamento de Canal · Implantes Dentários · Odontopediatria · Ortodontia · Lentes de contato · Prótese Dental · Harmonização Facil
- **Cards de serviço** (título + texto literal):
  - **Clínica Geral** — "Nossos profissionais fazem uma avaliação minuciosa, prestando muita atenção na saúde geral e bucal do paciente. O que possibilita um diagnóstico muito mais preciso, fazendo assim que o tratamento tenha sucesso. Além disso, todos os profissionais da Correia Odontologia tem foco na prevenção, orientando o paciente como higienizar corretamente os dentes e mostrando a importância das consultas de 6 e 6 meses para uma reavaliação, para manter assim a saúde bucal sempre em dia."
  - **Endodontia - Tratamento de Canal** — "Especialidade odontológica popularmente conhecida como \"tratamento de canal\", a Endodontia é a especialidade odontológica popularmente conhecida como \"tratamento de canal\"."
  - **Implantes Dentários** — "São raízes artificiais de titânio que podem ser instalados nos ossos maxilares em um procedimento simples, rápido e seguro. Uma vez fixados, servem de suporte para coroas dentais e outros tipos de próteses odontológicas, recuperando a função mastigatória e a estética do sorriso. Os implantes são colocados em pacientes que perderam um ou mais dentes. São estruturas ou suportes de titânio posicionados na maxila e mandíbula para substituir as raízes dentárias. Uma vez colocados, permitem ao dentista montar dentes substitutos sobre eles."
  - **Prótese Overdenture** — "Prótese total removível sobre implante, este tipo de prótese tem um custo menor que a prótese protocolo, porque exige menos implantes (2 a 4 em média) e é confeccionada em resina."
  - **Prótese Protocolo** — "Prótese total implantosuportada, fixada sobre 4 a 8 implantes em média, este tipo de prótese é parafusada e retirada apenas pelo dentista, é uma prótese que confere boa estética e é uma ótima opção para quem pretende fugir da dentadura. A prótese pode ser confeccionada em resina ou porcelana."
  - **Odontopediatria** — "O cuidado bucal que o seu filho merece. A Odontopediatria é a área da odontologia especializada em atender e conscientizar as crianças e os bebês. Nossa clínica conta com profissionais especializados em tratar da saúde bucal dos pequenos, atuando conjuntamente com os pais na intenção de desenvolver na criança a consciência da importância dos cuidados com a saúde bucal."
  - **Lentes de Contato** — "Lentes de contato dental são películas de porcelana altamente resistentes que foram projetadas para cobrir imperfeições dentárias, proporcionando um sorriso perfeito, sem danos, sem dor e sem sensibilidade. Permitem a correção de cor, forma, posição e espaços que possam existir entre um dente e outro."
  - **Ortodontia** — "Especialidade odontológica que corrige a posição dos dentes. O tratamento ortodôntico torna a boca mais saudável, proporciona uma aparência mais agradável e dentes com possibilidade de durar a vida toda. Existem três tipos de aparelhos:"
    - **Aparelhos Autoligados** — "Aparelhos Autoligados são muito mais rápido e confortáveis. Esse sistema utiliza bráquetes modernos com sistema deslizante de fechamento de arcos de ultima geração, não sendo mais necessário a utilização de elásticos para prender o arco, diminuindo assim o atrito."
    - **Aparelhos Autoligados Estéticos** — "Uma versão mais discreta do aparelho fixo metálico. O sistema funciona da mesma maneira, só que com bráquetes feitos de porcelana ou safira ao invés de metal."
    - **Aparelhos Ortopédicos** — "Os aparelhos ortopédicos têm a função de melhorar a estrutura óssea que sustenta os dentes. Seu uso promove a expansão do \"céu da boca\", ajudando a corrigir mordida cruzada, que é quando a parte de cima é mais estreita que a de baixo. Geralmente, é mais indicado para crianças que ainda estão em fase de desenvolvimento."
  - **Periodontia** — "Sua gengiva costuma inflamar ou sangrar com frequência? O periodontista é o especialista para ajudar no seu caso e outros relativos à gengiva. A prevenção e tratamento dos processos de inflamação e infecção da gengiva - que é o suporte dos nossos dentes - é chamado de periodontia."
  - **Prótese Dental** — "A prótese dental é a uma verdadeira arte da odontologia! São aparelhos protéticos que substituem os dentes naturais perdidos. Para que o sistema mastigatório funcione adequadamente os dentes precisam estar em equilíbrio nos arcos dentários superior e inferior. A perda de um só dente desequilibra esse sistema de forças, e os dentes movimentam-se migrando para compensar a perda. Espaços são criados, desníveis acontecem, a mastigação e a estética sofrem. Os dentes precisam ser recolocados."
  - **Clareamento** — "É o processo pelo qual são retirados os pigmentos do esmalte e dentina dos dentes, tornando-os mais brancos e brilhantes. O tratamento é rápido e não causa sensibilidade, como a maioria dos pacientes imaginam. Há dois tipos de Clareamento:"
    - **Clareamento a Laser** – "Realizado dentro do consultório;"
    - **Clareamento convencional** – "Realizado em casa com o auxílio de placas confeccionadas no consultório."
  - **Harmonização Facial** — "EM BREVE!!!"

### 8.3 SOBRE NÓS (`/sobre-nos`)
- 4 imagens da clínica (assets em `/img/uploads/paginas/...`)
- H1 **Sobre Nós** (breadcrumb)
- Texto: "A Clínica Correia Odontologia surgiu no final de 2018. Temos compromisso constante com excelência em atendimento, utilização das técnicas e tecnologias mais modernas da Odontologia e proporcionar uma vida mais feliz aos nossos pacientes por meio de um novo sorriso. Oferecemos todos os tipos de tratamentos e contamos com nosso grande diferencial: Atendimento humanizado!"
- **Diferenciais:**
  - **Câmera Intra Oral** — "Permite ver todos os detalhes que precisam ser feitos em seus dentes, na hora e você confere na TV. Diferentemente dos espelhos convencionais."
  - **Escolha o Som** — "Três salas equipadas com TV`s no teto e parede, onde você escolhe o que quer assistir e ouvir durante o tratamento!"
  - **Wifi** — "Navegue enquanto espera"
  - **Conforto** — "Ambiente aconchegante e climatizado"

### 8.4 NOSSA EQUIPE (`/equipe`)
- H1 **NOSSA EQUIPE** (breadcrumb)
- **Filtro por cidade:** Todas · Jales · Santa Fé do Sul · São José do Rio Preto · Três Lagoas · Votuporanga
- Profissionais (nome — especialidade — CRO — cidade):

**São José do Rio Preto - SP**
- Dr. Diego Parisati — Implantodontista — CRO/SP 124590
- Dr. Fernando Correia — Avaliador — CRO/SP 112277
- Dr. Valdemilson dos Reis Rodrigues Filho — Responsável Técnico — CRO/SP 153201
- Dra. Caroliny Ramos Barbosa Laveso — Avaliadora e Clínico Geral — CRO/SP 153990
- Dra. Emilly Almeida Silva — Dentística Restauradora — CRO/SP 158057
- Dra. Isabele Fernanda Boldrin — Ortodontia — CRO/SP 161077

**Votuporanga - SP**
- Dr. João Vitor Montilha — Clínico Geral — CRO/SP 158209
- Dr. Leandro Costa Lima — Cirurgia e Traumatologia Bucomaxilofacial e Implantodontia — CRO/SP 153764
- Dr. Renato Alves Yanes — Clínico Geral — CRO/SP 126558
- Dra. Emilly Almeida Silva — Facetas em Resina, Toxina Botulínica, Preenchimento, Clínico Geral e Prótese — CRO/SP 158057
- Dra. Isabele Fernanda Boldrin — Ortodontia — CRO/SP 161077
- Dra. Isabella Grippe Pinhatari — Endodontia, Clínico Geral e Prótese — CRO/AC 152475

**Jales - SP**
- Dr. Arthur Silva Zanetoni — Cirurgião Dentista — CRO/SP 143282
- Dr. Fernando Correia — Responsável Técnico — CRO/SP 112277
- Dr. Rafael Bonetti Azevedo Agostinho — Cirurgião Dentista — CRO/SP 127447
- Dr. Valdemilson dos Reis Rodrigues Filho — Clínico Geral — CRO/SP 153201
- Dra. Adrielly da Costa Ferreira — Implantodontista — CRO/SP 135899
- Dra. Isabele F. Boldrin — Facetas — CRO/SP 161077
- Dra. Pamela Zulin da Silva — Cirurgiã Dentista — CRO/SP 149967

**Santa Fé do Sul - SP**
- Dr. Ademar Santana Neto — Avaliador — CRO/SP 164268
- Dr. Bruno Trivelato Rodrigues — Clínico Geral / Protesista — CRO/SP 176023
- Dr. Lucas Vilela F. de Carvalho — Implantodontista / Protesista — CRO/SP 156196
- Dr. Pablo Henrique Frasson — Diretor Clínico / Protesista — CRO/SP 167222
- Dra. Letícia Schippa Miguel Correia — Responsável Técnica — CRO/SP 129476

**Três Lagoas - MS**
- Dr. Felippe Nagamachi Chaves — Protesista — CRO/SP 162524
- Dr. Mario Eugênio Zaparoli — Implantodontista — CRO/MS 6501
- Dra. Ana Laura Silva Balbino — Avaliadora — CRO/MS 8666
- Dra. Milena Freire Barbosa — Clínico Geral — CRO/MS 09195

> Observação factual: a cidade sem profissionais exibe a mensagem "Nenhum profissional encontrado para esta cidade." (manter esse estado vazio).

### 8.5 FALE CONOSCO (`/fale-conosco`)
- H1 **FALE CONOSCO** (breadcrumb)
- Contatos: Tel (17) 3641-0544 · WhatsApp (17) 99717-8758 · Rua 17, nº 996 - Centro, Santa Fé do Sul - SP · e-mail **contato@correiaodontologia.com.br** · Facebook · Instagram
- Bloco: título **"FALE CONOSCO"** + subtítulo **"Deixe seus dados de contato pra gente falar com você :)"**
- Formulário (confirmado por captura de tela), layout em 2 colunas — à esquerda empilhados: **Seu nome** (ícone pessoa), **Telefone** (ícone telefone), **E-mail** (ícone envelope); à direita: **Sua mensagem..** (textarea). Abaixo: **reCAPTCHA** ("Não sou um robô") e botão **Enviar** (sem "Cancelar", por ser página e não modal).
- Botão flutuante "voltar ao topo" no canto inferior direito.
- Observação (UX): adicionar `<label>` real em cada campo (hoje só placeholder); reCAPTCHA com as chaves do cliente, nunca resolvido automaticamente.

### 8.6 BLOG (`/blog`) e post (`/blog/ver/{id}/{slug}`)
Listagem de 6 posts (título · data · resumo · **LER MAIS**):
1. **Dentes brancos e saudáveis: Dicas para um sorriso radiante** — 04/03/2024 16:57 — "Aprenda dicas simples e eficazes para manter seus dentes brancos e saudáveis, desde a escovação correta até a escolha da pasta de dente ideal." — `/blog/ver/3/dentes-brancos-e-saudaveis-dicas-para-um-sorriso-radiante`
2. **A importância da odontopediatria para a saúde bucal das crianças** — 04/03/2024 17:14 — "Entenda como a odontopediatria pode prevenir problemas bucais e garantir um sorriso saudável para seus filhos." — `/blog/ver/4/a-importancia-da-odontopediatria-para-a-saude-bucal-das-criancas`
3. **Aparelho ortodôntico: Transformando sorrisos e autoestima** — 04/03/2024 17:16 — "Descubra as diferentes opções de aparelhos ortodônticos disponíveis no mercado e como eles podem transformar seu sorriso e sua autoestima." — `/blog/ver/5/aparelho-ortodontico-transformando-sorrisos-e-autoestima`
4. **Implantes dentários: Solução para a perda de dentes** — 04/03/2024 17:19 — "Conheça os benefícios dos implantes dentários e como eles podem restaurar sua qualidade de vida." — `/blog/ver/6/implantes-dentarios-solucao-para-a-perda-de-dentes`
5. **Clareamento dental: Dicas para um sorriso mais branco** — 04/03/2024 17:21 — "Descubra as diferentes técnicas de clareamento dental disponíveis e como obter um sorriso mais branco e brilhante." — `/blog/ver/7/clareamento-dental-dicas-para-um-sorriso-mais-branco`
6. **Saúde bucal e saúde geral: Uma conexão importante** — 04/03/2024 17:23 — "Entenda a relação entre a saúde bucal e a saúde geral do corpo e a importância de cuidar dos dentes para uma vida saudável." — `/blog/ver/8/saude-bucal-e-saude-geral-uma-conexao-importante`

Template do post: título, resumo, breadcrumb, imagem de capa, data, autor ("Suporte"), corpo. **Corpos completos (extraídos do site — replicar literalmente):**

**Post 3 — Dentes brancos e saudáveis: Dicas para um sorriso radiante** (2024-03-04 16:57:00, Suporte, imagem `noticias-3_50509201.png`)
"Um sorriso bonito e saudável é um importante cartão de visitas. Para conquistar essa meta, alguns cuidados básicos são essenciais. Neste artigo, você encontrará dicas valiosas para manter seus dentes brancos e saudáveis:"
- Escove os dentes pelo menos três vezes ao dia, com movimentos circulares e por no mínimo dois minutos.
- Utilize fio dental diariamente para remover restos de alimentos entre os dentes.
- Visite seu dentista regularmente para realizar limpezas e exames preventivos.
- Evite o consumo excessivo de alimentos e bebidas que mancham os dentes, como café, chá, vinho e refrigerantes.
- Opte por uma pasta de dente com flúor, que ajuda a fortalecer os dentes e prevenir cáries.
- Consulte um dentista para saber se você é um candidato ao clareamento dental profissional.

**Post 4 — A importância da odontopediatria para a saúde bucal das crianças** (2024-03-04 17:14:00, Suporte, imagem `noticias-4_140516222.png`)
"A odontopediatria é a área da odontologia especializada na saúde bucal das crianças. O atendimento odontológico desde cedo é fundamental para prevenir problemas bucais, como cáries, gengivite e má oclusão."
"Os benefícios da odontopediatria incluem:"
- Prevenção de cáries e outras doenças bucais.
- Detecção precoce de problemas de desenvolvimento dos dentes e da arcada dentária.
- Orientação sobre higiene bucal adequada para crianças.
- Criação de um ambiente positivo e acolhedor para que a criança se sinta confortável no dentista.

**Post 5 — Aparelho ortodôntico: Transformando sorrisos e autoestima** (2024-03-04 17:16:00, Suporte, imagem `noticias-5_110518313.png`)
"Os aparelhos ortodônticos são utilizados para corrigir problemas de posicionamento dos dentes, como apinhamento, mordida cruzada, diastema e outros. Além de melhorar a estética do sorriso, o tratamento ortodôntico também pode trazer benefícios para a saúde bucal, como a melhora da mastigação e da fonética."
"Existem diversos tipos de aparelhos ortodônticos disponíveis, como os metálicos, os de cerâmica, os de safira e os invisíveis. A escolha do tipo de aparelho ideal dependerá das necessidades de cada paciente."

**Post 6 — Implantes dentários: Solução para a perda de dentes** (2024-03-04 17:19:00, Suporte, imagem `noticias-6_100521074.png`)
"Os implantes dentários são uma solução eficaz para a perda de dentes. São estruturas de titânio que são implantadas no osso maxilar ou mandibular para servir de suporte para próteses dentárias."
"Os implantes dentários oferecem diversos benefícios, como:"
- Restauração da função mastigatória e da fonética.
- Melhora da estética do sorriso.
- Aumento da autoestima e da qualidade de vida.
- Solução duradoura para a perda de dentes.

**Post 7 — Clareamento dental: Dicas para um sorriso mais branco** (2024-03-04 17:21:00, Suporte, imagem `noticias-7_100523325.png`)
"Manter um sorriso branco e radiante é um desejo comum. O clareamento dental é um procedimento estético que visa clarear a cor dos dentes, tornando-os mais brancos e uniformes. Existem diferentes técnicas de clareamento dental disponíveis, como:"
- Clareamento caseiro: realizado em casa com o uso de moldeiras personalizadas e gel clareador prescritos pelo dentista.
- Clareamento profissional: realizado no consultório odontológico por um profissional qualificado, podendo ser feito em uma única sessão ou em sessões múltiplas.

**Post 8 — Saúde bucal e saúde geral: Uma conexão importante** (2024-03-04 17:23:00, Suporte, imagem `noticias-8_60525206.png`)
"A saúde bucal é um aspecto fundamental da saúde geral do corpo. Muitas pesquisas demonstram a relação entre a má saúde bucal e o aumento do risco de diversas doenças sistêmicas, como diabetes, doenças cardíacas e AVC."
"Cuidar da saúde bucal é importante para prevenir problemas bucais e também para promover a sua saúde geral. Ao escovar os dentes regularmente, usar fio dental e visitar o dentista regularmente, você está investindo em sua saúde e bem-estar."

---

## 10. Tokens de cor

> Importante: a paleta a **implementar** é a **v2 aprovada** (Seção 10.2) — uma evolução consciente e aprovada pelo cliente a partir das cores reais do site. A paleta original amostrada fica registrada na Seção 10.1 apenas como referência/rastreabilidade. Onde houver conflito com a regra geral "usar as cores do site atual", vale a v2 aprovada.

### 10.1 Paleta original amostrada (referência — NÃO usar como final)

Valores lidos via `getComputedStyle` no site em produção (skin dourado ativo):

| Papel | Valor |
|---|---|
| Dourado (destaque) | `#c49a6b` |
| Dourado escuro (CTA) | `#b8860b` |
| Azul-ardósia (texto/subtítulos) | `#455f68` |
| Texto auxiliar | `#333333` |
| Fundo | `#ffffff` |
| Cinzas escuros (cards/rodapé) | `#4d4d4d` · `#353535` · `#2f2f2f` |

Observações do original: sem variáveis CSS (`:root`) e sem regra `:hover` explícita (hover é opacidade). O template traz um "style switcher" com skins cinza/vermelho/azul/amarelo/verde — **remover o switcher** na reconstrução.

### 10.2 Paleta v2 (APROVADA — implementar esta)

Evolução: dourado mantido e mais luminoso; o azul-ardósia apagado foi puxado para um **azul-oceano mais claro** (segurança e conforto). Cinzas neutros substituídos por azuis.

| Token | Valor | Uso |
|---|---|---|
| `--cor-primaria` (ouro satinado) | `#C89B3C` | destaque dominante: títulos de seção, links do menu, ícones, botões com contorno, datas. |
| `--cor-cta` (âmbar bronze) | `#A9762A` | botão sólido principal ("+ Agende uma consulta", "Enviar"), com texto branco. |
| `--cor-secundaria` (azul-oceano) | `#3E86A8` | secundária que transmite confiança/conforto: kickers, subtítulos, links, ícones, detalhes. Para textos pequenos/corridos usar `--cor-secundaria-forte` (contraste AA). |
| `--cor-secundaria-forte` (azul profundo) | `#245C74` | fundo de cards de destaque e texto secundário pequeno sobre branco (legibilidade AA). |
| `--cor-rodape` (azul escuro) | `#1C4A5E` | fundo do rodapé e faixas escuras. |
| `--cor-superficie` (azul-gelo) | `#EDF3F6` | fundo alternado de seções (sensação de limpeza/calma). |
| `--cor-texto` (tinta) | `#2A3B44` | corpo de texto principal sobre fundo claro. |
| `--cor-fundo` | `#FFFFFF` | fundo padrão. |
| `--cor-texto-sobre-escuro` | `#FFFFFF` | texto sobre botões e superfícies escuras. |
| `--cor-ouro-claro` (título em card escuro) | `#E7C871` | títulos dourados sobre cards/rodapé em azul (contraste elevado). |
| `--cor-borda` | `#E3E9EC` | bordas de cards e divisórias. |

Regras de uso: texto sobre CTA/áreas escuras é branco. Botões "outline" usam `--cor-primaria` (`#C89B3C`). Hover = escurecimento leve (~7%) da cor base. Manter contraste mínimo 4.5:1 em texto pequeno — por isso `--cor-secundaria` (`#3E86A8`) fica para títulos/acento e `--cor-secundaria-forte` (`#245C74`) para texto pequeno. Definir todos como CSS custom properties em `:root` e usar apenas os tokens (sem hex solto).

---

## 11. Inconsistências de dados observadas — NÃO auto-corrigir

Replicar fielmente **não significa** propagar erros silenciosamente. Os itens abaixo existem hoje; **mantenha o conteúdo, mas sinalize ao cliente** para decidir a correção (não altere sem aprovação):

1. **Telefones divergentes por unidade** entre topo, seção de clínicas e rodapé (ex.: Rio Preto com WhatsApp DDD (18) e telefone DDD (17); Santa Fé com números diferentes em locais diferentes).
2. **Três Lagoas com telefone vazio** na seção de clínicas da home.
3. **Imagens repetidas** (fachada/estabelecimento iguais em algumas unidades).
4. **"Harmonização Facil"** (filtro) vs **"Harmonização Facial"** (card) — grafia divergente.
5. Pequenos erros de digitação no conteúdo original ("Odontolgia", "éficacia", "relaçoes"). **Manter como está** salvo instrução do cliente.

---

## 12. Checklist de fidelidade (antes de entregar)

- [ ] Todas as 7 rotas da Seção 5 existem e abrem.
- [ ] Todo texto confere **palavra por palavra** com a Seção 8 (nada adicionado/removido).
- [ ] 5 unidades, 33 profissionais, 10 depoimentos, 6 posts, todos os serviços presentes.
- [ ] Cores preenchidas por amostragem (Seção 10) — nenhum **[A CONFIRMAR]** restante.
- [ ] Campos dos formulários confirmados com o cliente (não inventados).
- [ ] Inconsistências da Seção 11 reportadas ao cliente, não "corrigidas" por conta própria.
- [ ] Responsivo, rápido, acessível e com SEO por página — sem alterar conteúdo/cor.

---

## Apêndice A — Inventário de imagens reais (baixar do site atual e importar)

Assets estáticos do tema (`https://correiaodontologia.com.br/images/`):
- `logo.png`, `logo2.png`, `preloader.gif` (o preloader NÃO deve ser reutilizado — técnica antiga)
- Serviços: `servicos/cadeira.jpg`, `clinica-geral.png`, `endodontia.png`, `implante.png`, `proteseOverdenture.png`, `proteseProtocolo.png`, `odontopediatria.png`, `lentes.png`, `ortodontia.png`, `periodontia.png`, `clareamentoLaser.png`, `harmonizacao-facial.jpg`
- Unidades: `estabelecimento/jales/280x280.jpg` e `436x340.jpg`; `estabelecimento/riopreto/fachada.jpeg`; `estabelecimento/santafe/santafe-fachada.JPG` e `santafe-fachada2.JPG`; `estabelecimento/votuporanga/fachada.jpg` e `predio.jpg`; `estabelecimento/treslagoas/fachada01.png` e `fachada02.png`
- Depoimentos/ícones: `reviw-cinza.png`, `reviw-vermelho.png`, `reviw-azul.png`, `reviw-amarelo.png`, `reviw-verde.png`, `review1.png`–`review5.png`, `quote.png`

Uploads do CMS (`https://correiaodontologia.mundolemon.com.br/img/uploads/`):
- Banner home: `banners/9810015d6f75af5c02dacc75484a3f4e.png`
- Sobre/páginas: `paginas/paginas-1_15104435_MG_4217-min.JPG`, `paginas-1_10104436_MG_4220-min.JPG`, `paginas-1_14104437_MG_4236-min (1).JPG`, `paginas-1_15032158santafe-fachada.JPG`
- Blog: `noticias/noticias-3_50509201.png`, `noticias-4_140516222.png`, `noticias-5_110518313.png`, `noticias-6_100521074.png`, `noticias-7_100523325.png`, `noticias-8_60525206.png`
- Equipe: fotos individuais em `equipe/` (nomes com hash) — baixar por profissional.

> Regra: baixar todas para `src/assets/` e importar. Não referenciar as URLs do CMS em produção (dependência externa). Não gerar imagens novas.

---

### Pendências: nenhuma bloqueante

Todos os itens que travavam a fidelidade foram resolvidos:
- Cores exatas em hex amostradas do CSS real (Seção 10).
- Campos do modal de agendamento: Nome, Telefone, E-mail, Mensagem + reCAPTCHA (Seção 6.3).
- Campos da página "Fale Conosco": Nome, Telefone, E-mail, Mensagem + reCAPTCHA (Seção 8.5).
- Corpo completo dos 6 posts do blog (Seção 8.6).
- Telefone de Três Lagoas: o rodapé lista (67) 9208-7829.
- Inventário de imagens reais (Apêndice A).

Confirmações opcionais com o cliente (não bloqueiam o desenvolvimento): se há um telefone fixo distinto em Três Lagoas; e as decisões sinalizadas na Seção 11 (inconsistências) e no formulário (campo "Unidade", labels).
