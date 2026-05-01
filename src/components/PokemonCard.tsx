'use client';

import { useState } from 'react';
import type { Pokemon } from '@/lib/types';
import { TYPE_COLORS } from '@/lib/constants';
import { TypeBadge } from './TypeBadge';

interface PokemonCardProps {
  pokemon: Pokemon;
  isFavorite: boolean;
  isDark: boolean;
  onToggleFavorite: (id: number) => void;
  onClick: () => void;
}

export function PokemonCard({ pokemon, isFavorite, isDark, onToggleFavorite, onClick }: PokemonCardProps) {
  const [hovered, setHovered] = useState(false);
  const [heartAnim, setHeartAnim] = useState(false);

  const handleHeart = (e: React.MouseEvent) => {
    e.stopPropagation();
    setHeartAnim(true);
    setTimeout(() => setHeartAnim(false), 400);
    onToggleFavorite(pokemon.id);
  };

  const typeBg = TYPE_COLORS[pokemon.types[0]]?.bg ?? '#ccc';
  const cardBg = isDark ? '#1e1e1e' : '#fff';
  const nameColor = isDark ? '#f0f0f0' : '#1a1a1a';

  return (
    <div
      style={{
        background: cardBg,
        borderRadius: 20,
        boxShadow: hovered ? '0 12px 32px rgba(0,0,0,0.15)' : '0 2px 10px rgba(0,0,0,0.07)',
        transform: hovered ? 'translateY(-6px) scale(1.02)' : 'translateY(0) scale(1)',
        transition: 'all 0.22s cubic-bezier(0.34,1.56,0.64,1)',
        cursor: 'pointer',
        position: 'relative',
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        padding: '20px 16px 16px',
      }}
      onClick={onClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Type gradient bg */}
      <div style={{
        position: 'absolute', top: 0, left: 0, right: 0, height: 100,
        background: `linear-gradient(180deg, ${typeBg}22 0%, transparent 100%)`,
        borderRadius: '20px 20px 0 0',
        pointerEvents: 'none',
      }} />

      {/* Favorite button */}
      <button
        style={{
          position: 'absolute', top: 10, right: 10,
          background: 'none', border: 'none', cursor: 'pointer',
          fontSize: 18, padding: 4, borderRadius: '50%',
          color: isFavorite ? '#CC0000' : '#ccc',
          transform: heartAnim ? 'scale(1.5)' : 'scale(1)',
          transition: 'transform 0.2s cubic-bezier(0.34,1.56,0.64,1), color 0.2s ease',
          zIndex: 1,
        }}
        onClick={handleHeart}
        title={isFavorite ? 'Remove favorite' : 'Add favorite'}
      >
        {isFavorite ? '♥' : '♡'}
      </button>

      <span style={{ fontSize: 11, color: '#bbb', fontWeight: 600, letterSpacing: '0.06em', marginBottom: 4 }}>
        #{String(pokemon.id).padStart(3, '0')}
      </span>

      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={pokemon.sprite}
        alt={pokemon.name}
        style={{
          width: 96, height: 96,
          objectFit: 'contain',
          filter: 'drop-shadow(0 4px 8px rgba(0,0,0,0.15))',
          transform: hovered ? 'scale(1.1)' : 'scale(1)',
          transition: 'transform 0.22s ease',
        }}
        loading="lazy"
      />

      <div style={{
        marginTop: 10, fontWeight: 700, fontSize: 14,
        textTransform: 'capitalize', color: nameColor, textAlign: 'center',
      }}>
        {pokemon.name}
      </div>

      <div style={{ display: 'flex', gap: 6, marginTop: 8, flexWrap: 'wrap', justifyContent: 'center' }}>
        {pokemon.types.map((t) => <TypeBadge key={t} type={t} size="sm" />)}
      </div>
    </div>
  );
}
