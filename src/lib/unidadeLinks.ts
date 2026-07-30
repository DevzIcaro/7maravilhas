/**
 * Helpers para os cards de unidade (seção "Nossas unidades" da home):
 * link direto do WhatsApp com mensagem pré-preenchida, URL do embed do
 * Google Maps, link de "como chegar" e link tel: para abrir o discador do
 * celular (funciona tanto para o número fixo quanto para o celular).
 */

interface UnidadeMapa {
  endereco: string;
  coordenadas: { lat: number; lng: number } | null;
}

function apenasDigitos(numero: string): string {
  return numero.replace(/\D/g, "");
}

function comDdi(digitos: string): string {
  return digitos.startsWith("55") ? digitos : `55${digitos}`;
}

/** Google Maps embed público — usa coordenadas quando existem, senão o endereço. */
export function mapaEmbedSrc({ endereco, coordenadas }: UnidadeMapa): string {
  const consulta = coordenadas ? `${coordenadas.lat},${coordenadas.lng}` : endereco;
  return `https://www.google.com/maps?q=${encodeURIComponent(consulta)}&output=embed`;
}

/** Link "como chegar" do Google Maps (abre o app no celular, ou o site no desktop). */
export function linkMaps({ endereco, coordenadas }: UnidadeMapa): string {
  const destino = coordenadas ? `${coordenadas.lat},${coordenadas.lng}` : endereco;
  return `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(destino)}`;
}

/** Link wa.me a partir do número formatado (ex.: "(17) 99625-6384"), com DDI 55. */
export function linkWhatsapp(numero: string, mensagem: string): string {
  return `https://wa.me/${comDdi(apenasDigitos(numero))}?text=${encodeURIComponent(mensagem)}`;
}

/**
 * Link tel: a partir de um número fixo ou celular formatado. Ao tocar no
 * celular, abre o discador já com o número preenchido — vale tanto para
 * "(17) 3641-0544" (fixo) quanto para "(17) 99625-6384" (celular).
 */
export function linkTelefone(numero: string): string {
  return `tel:+${comDdi(apenasDigitos(numero))}`;
}
