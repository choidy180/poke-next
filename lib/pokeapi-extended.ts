// lib/pokeapi-extended.ts
// PokeAPI helpers with Korean (ko) localization support.
// - getPokemonListSummary(): list page (summary)
// - getPokemonDetail(): detail with flavor text, genera, evolution
// Exports TYPE_KO / STAT_KO for easy UI labels.

export type PokemonSummary = {
  id: number;
  name: string;          // en
  localName?: string;    // ko (optional)
  sprite: string | null;
  types: string[];       // en keys (use TYPE_KO to map in UI)
};

export type PokemonDetail = {
  id: number;
  name: string;          // en
  localName?: string;    // ko
  sprite: string | null;
  types: string[];       // en keys
  genera?: string;       // ko
  flavor?: string;       // ko
  height: number;
  weight: number;
  habitat?: string;      // en
  color?: string;        // en
  abilities: string[];   // en keys
  stats: { name: string; base: number }[];
  evolution: string[];   // en species names (flat order)
};

export const TYPE_KO: Record<string, string> = {
  normal: '노말', fire: '불꽃', water: '물', grass: '풀', electric: '전기',
  ice: '얼음', fighting: '격투', poison: '독', ground: '땅', flying: '비행',
  psychic: '에스퍼', bug: '벌레', rock: '바위', ghost: '고스트', dragon: '드래곤',
  dark: '악', steel: '강철', fairy: '페어리',
};

export const STAT_KO: Record<string, string> = {
  hp: 'HP',
  attack: '공격',
  defense: '방어',
  'special-attack': '특수공격',
  'special-defense': '특수방어',
  speed: '스피드',
};

// -------------------------------------------------------------------

const API = 'https://pokeapi.co/api/v2';
const KOREAN = 'ko';

// In-memory cache (per serverless runtime instance / browser tab)
const nameCache = new Map<number, string>(); // id -> ko name

async function fetchJSON<T>(url: string): Promise<T> {
  const res = await fetch(url, { // keep default caching; tune if needed
    // cache: 'force-cache',
    // next: { revalidate: 3600 },
  });
  if (!res.ok) {
    throw new Error(`Fetch failed: ${res.status} ${res.statusText} (${url})`);
  }
  return res.json() as Promise<T>;
}

function extractIdFromURL(url: string): number | null {
  // e.g. https://pokeapi.co/api/v2/pokemon/25/
  const m = url.match(/\/pokemon\/(\d+)\/?$/);
  return m ? Number(m[1]) : null;
}

function normalizeFlavor(text: string): string {
  return text.replace(/\s+/g, ' ').replace(/\u000c/g, ' ').trim();
}

function pickKoFlavor(entries: any[]): string | undefined {
  const ko = entries.find((e) => e.language?.name === KOREAN);
  return ko ? normalizeFlavor(ko.flavor_text || '') : undefined;
}

function pickKoGenera(genera: any[]): string | undefined {
  const ko = genera.find((g) => g.language?.name === KOREAN);
  return ko?.genus;
}

async function fetchLocalName(idOrName: number | string): Promise<{ id: number; nameKo?: string }> {
  // Try cache when numeric id
  if (typeof idOrName === 'number') {
    const cached = nameCache.get(idOrName);
    if (cached) return { id: idOrName, nameKo: cached };
  }

  type Species = {
    id: number;
    names: { language: { name: string }; name: string }[];
  };

  const data = await fetchJSON<Species>(`${API}/pokemon-species/${idOrName}`);
  const ko = data.names?.find((n) => n.language?.name === KOREAN)?.name;
  if (ko) nameCache.set(data.id, ko);
  return { id: data.id, nameKo: ko };
}

// -------------------------------------------------------------------
// LIST (summary)

export async function getPokemonListSummary(
  offset = 0,
  limit = 20,
  withKorean = true
): Promise<PokemonSummary[]> {
  type ListResp = {
    results: { name: string; url: string }[];
  };

  const list = await fetchJSON<ListResp>(`${API}/pokemon?offset=${offset}&limit=${limit}`);

  // Fetch each pokemon detail needed for sprite/types (1 request per item)
  const rows = await Promise.all(
    list.results.map(async (r) => {
      const id = extractIdFromURL(r.url);
      // Fallback if URL didn't contain an id (rare)
      const key = id ?? r.name;

      type Poke = {
        id: number;
        name: string;
        sprites: any;
        types: { type: { name: string } }[];
      };

      const p = await fetchJSON<Poke>(`${API}/pokemon/${key}`);

      let localName: string | undefined;
      if (withKorean) {
        const cached = nameCache.get(p.id);
        localName = cached ?? (await fetchLocalName(p.id)).nameKo;
      }

      const sprite =
        p.sprites?.other?.['official-artwork']?.front_default ??
        p.sprites?.front_default ??
        null;

      return {
        id: p.id,
        name: p.name,
        localName,
        sprite,
        types: (p.types || []).map((t) => t.type?.name).filter(Boolean),
      } as PokemonSummary;
    })
  );

  // Keep list stable by id ASC
  rows.sort((a, b) => a.id - b.id);
  return rows;
}

// -------------------------------------------------------------------
// DETAIL

export async function getPokemonDetail(
  idOrName: number | string,
  withKorean = true
): Promise<PokemonDetail> {
  type Poke = {
    id: number;
    name: string;
    height: number;
    weight: number;
    sprites: any;
    types: { type: { name: string } }[];
    abilities: { ability: { name: string } }[];
    stats: { base_stat: number; stat: { name: string } }[];
  };

  type Species = {
    id: number;
    names: { language: { name: string }; name: string }[];
    flavor_text_entries: any[];
    genera: any[];
    habitat?: { name: string } | null;
    color?: { name: string } | null;
    evolution_chain?: { url: string } | null;
  };

  const p = await fetchJSON<Poke>(`${API}/pokemon/${idOrName}`);
  const s = await fetchJSON<Species>(`${API}/pokemon-species/${p.id}`);

  // cache ko name
  const koName = s.names?.find((n) => n.language?.name === KOREAN)?.name;
  if (koName) nameCache.set(p.id, koName);

  const sprite =
    (p as any).sprites?.other?.['official-artwork']?.front_default ??
    (p as any).sprites?.front_default ??
    null;

  const detail: PokemonDetail = {
    id: p.id,
    name: p.name,
    localName: withKorean ? koName : undefined,
    sprite,
    types: (p.types || []).map((t) => t.type?.name).filter(Boolean),
    genera: pickKoGenera(s.genera || []),
    flavor: pickKoFlavor(s.flavor_text_entries || []),
    height: p.height,
    weight: p.weight,
    habitat: s.habitat?.name ?? undefined,
    color: s.color?.name ?? undefined,
    abilities: (p.abilities || []).map((a) => a.ability?.name).filter(Boolean),
    stats: (p.stats || []).map((st) => ({ name: st.stat?.name, base: st.base_stat })),
    evolution: [],
  };

  // Evolution chain (flat)
  if (s.evolution_chain?.url) {
    type EvoResp = {
      chain: any;
    };
    const evo = await fetchJSON<EvoResp>(s.evolution_chain.url);
    const acc: string[] = [];
    const walk = (node: any) => {
      if (!node) return;
      if (node.species?.name) acc.push(node.species.name);
      (node.evolves_to || []).forEach(walk);
    };
    walk(evo.chain);
    detail.evolution = acc;
  }

  return detail;
}
