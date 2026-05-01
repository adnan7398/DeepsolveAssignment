'use client';

import { useState, useEffect, useCallback } from 'react';
import type { Pokemon } from '@/lib/types';
import { TOTAL_POKEMON } from '@/lib/constants';

interface UsePokemonListResult {
  allPokemon: Pokemon[];
  loading: boolean;
  error: string | null;
  refetch: () => void;
}

export function usePokemonList(): UsePokemonListResult {
  const [allPokemon, setAllPokemon] = useState<Pokemon[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const load = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const listRes = await fetch(
        `https://pokeapi.co/api/v2/pokemon?limit=${TOTAL_POKEMON}&offset=0`
      );
      if (!listRes.ok) throw new Error('Failed to fetch Pokémon list');
      const listData = await listRes.json();

      const details = await Promise.all(
        listData.results.map((p: { url: string }) =>
          fetch(p.url).then((r) => {
            if (!r.ok) throw new Error('Failed to fetch Pokémon details');
            return r.json();
          })
        )
      );

      const parsed: Pokemon[] = details.map(
        (d: {
          id: number;
          name: string;
          types: { type: { name: string } }[];
          sprites: { other: { 'official-artwork': { front_default: string } }; front_default: string };
          height: number;
          weight: number;
          stats: { stat: { name: string }; base_stat: number }[];
          abilities: { ability: { name: string }; is_hidden: boolean }[];
        }) => ({
          id: d.id,
          name: d.name,
          types: d.types.map((t) => t.type.name),
          sprite:
            d.sprites.other['official-artwork'].front_default ||
            d.sprites.front_default,
          height: d.height,
          weight: d.weight,
          stats: d.stats.map((s) => ({ name: s.stat.name, value: s.base_stat })),
          abilities: d.abilities.map((a) => ({
            name: a.ability.name,
            isHidden: a.is_hidden,
          })),
        })
      );

      setAllPokemon(parsed);
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Something went wrong');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  return { allPokemon, loading, error, refetch: load };
}
