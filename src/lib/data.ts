/**
 * Data local (YYYY-MM-DD) no fuso do navegador de quem está usando o site.
 * NÃO usar `new Date().toISOString().slice(0, 10)` pra isso: `toISOString()`
 * sempre retorna a data em UTC, e no Brasil (UTC-3) o dia UTC já vira o
 * seguinte a partir das 21h no horário local — isso causava dois bugs reais:
 * o limite diário de tentativas do formulário resetando só perto das 21h em
 * vez da meia-noite local, e o campo "Data desejada" aceitando/mínimo com um
 * dia de diferença do calendário de quem está preenchendo.
 */
export function dataLocalHoje(): string {
  const agora = new Date();
  const ano = agora.getFullYear();
  const mes = String(agora.getMonth() + 1).padStart(2, "0");
  const dia = String(agora.getDate()).padStart(2, "0");
  return `${ano}-${mes}-${dia}`;
}
