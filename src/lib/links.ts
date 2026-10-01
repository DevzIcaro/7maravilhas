/**
 * Helpers de links derivados das coordenadas de cada maravilha.
 */

interface Coordenadas {
  lat: number;
  lng: number;
}

const consulta = ({ lat, lng }: Coordenadas) => encodeURIComponent(`${lat},${lng}`);

/** URL do iframe do Google Maps (embed público) centrado nas coordenadas. */
export function mapaEmbedSrc(coordenadas: Coordenadas): string {
  return `https://www.google.com/maps?q=${consulta(coordenadas)}&output=embed`;
}

/** Link "Como chegar" do Google Maps (abre o app no celular ou o site no desktop). */
export function linkMaps(coordenadas: Coordenadas): string {
  return `https://www.google.com/maps/dir/?api=1&destination=${consulta(coordenadas)}`;
}

/** Coordenadas formatadas em graus decimais, ex.: "20.6843° N, 88.5678° O". */
export function formatarCoordenadas({ lat, lng }: Coordenadas): string {
  const ns = lat >= 0 ? "N" : "S";
  const lo = lng >= 0 ? "L" : "O";
  return `${Math.abs(lat).toFixed(4)}° ${ns}, ${Math.abs(lng).toFixed(4)}° ${lo}`;
}
