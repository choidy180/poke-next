// lib/pokeapi.ts
export interface PokeListItem {
  name: string;
  url: string;
}

/** 간단 fetch 버전 (axios 불필요) */
export async function getAllPokemonAPI(
  offset = 0,
  limit = 20
): Promise<PokeListItem[]> {
  const res = await fetch(
    `https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}`
  );
  if (!res.ok) throw new Error(`PokeAPI error: ${res.status}`);
  const data = await res.json();
  console.log(data);
  return data.results as PokeListItem[];
}
