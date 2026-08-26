import { getLocations, type LocationParams } from "@/lib/jabato-api";

function parseParams(searchParams: URLSearchParams): LocationParams {
  const get = (key: string) => searchParams.get(key) ?? undefined;
  const lat = searchParams.get("lat");
  const lng = searchParams.get("lng");
  const radiusKm = searchParams.get("radiusKm");

  return {
    buscar: get("buscar"),
    estilo: get("estilo"),
    presentacion: get("presentacion"),
    barrio: get("barrio"),
    lat: lat != null ? Number(lat) : undefined,
    lng: lng != null ? Number(lng) : undefined,
    radiusKm: radiusKm != null ? Number(radiusKm) : undefined,
  };
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const params = parseParams(searchParams);
  const data = await getLocations(params);
  return Response.json(data);
}
