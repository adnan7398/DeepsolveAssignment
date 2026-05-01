'use client';

import { useState, useEffect } from 'react';
import type { Pokemon } from '@/lib/types';
import { TYPE_COLORS } from '@/lib/constants';
import { TypeBadge } from './TypeBadge';
import { StatBar } from './StatBar';

interface DetailModalProps {
  pokemon: Pokemon;
  isFavorite: boolean;
  onToggleFavorite: (id: number) => void;
  onClose: () => void;
}

export function DetailModal({ pokemon, isFavorite, onToggleFavorite, onClose }: DetailModalProps) {
  const [visible, setVisible] = useState(false);
  const [animateStats, setAnimateStats] = useState(false);
  const [heartAnim, setHeartAnim] = useState(false);

  useEffect(() => {
    requestAnimationFrame(() => {
      setVisible(true);
      setTimeout(() => setAnimateStats(true), 200);
    });
  }, []);

  // Close on Escape
  useEffect(() => {
    const handler = (e: KeyboardEvent) => { if (e.key === 'Escape') handleClose(); };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  });

  const handleClose = () => {
    setVisible(false);
    setTimeout(onClose, 250);
  };

  const handleHeart = () => {
    setHeartAnim(true);
    setTimeout(() => setHeartAnim(false), 400);
    onToggleFavorite(pokemon.id);
  };

  const typeBg = TYPE_COLORS[pokemon.types[0]]?.bg ?? '#ccc';

  return (
    <div
      className="modal-overlay"
      style={{
        position: 'fixed', inset: 0,
        background: 'rgba(0,0,0,0.55)',
        backdropFilter: 'blur(4px)',
        zIndex: 1000,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        padding: 16,
        opacity: visible ? 1 : 0,
        transition: 'opacity 0.25s ease',
      }}
      onClick={(e) => { if (e.target === e.currentTarget) handleClose(); }}
    >
      <div
        className="modal-inner"
        style={{
          background: '#fff',
          borderRadius: 28,
          width: '100%',
          maxWidth: 540,
          maxHeight: '90vh',
          overflowY: 'auto',
          boxShadow: '0 24px 64px rgba(0,0,0,0.25)',
          transform: visible ? 'scale(1) translateY(0)' : 'scale(0.9) translateY(30px)',
          opacity: visible ? 1 : 0,
          transition: 'transform 0.28s cubic-bezier(0.34,1.56,0.64,1), opacity 0.25s ease',
          position: 'relative',
        }}
      >
        {/* Modal header */}
        <div style={{
          background: `linear-gradient(135deg, ${typeBg}33 0%, ${typeBg}11 100%)`,
          borderRadius: '28px 28px 0 0',
          padding: '32px 24px 20px',
          display: 'flex', flexDirection: 'column', alignItems: 'center',
          position: 'relative',
        }}>
          <button
            onClick={handleClose}
            style={{
              position: 'absolute', top: 16, right: 16,
              background: 'rgba(0,0,0,0.1)', border: 'none', borderRadius: '50%',
              width: 36, height: 36, fontSize: 16, cursor: 'pointer',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              color: '#555', transition: 'background 0.15s',
            }}
          >
            ✕
          </button>

          <span style={{ fontSize: 13, color: '#999', fontWeight: 700, letterSpacing: '0.06em' }}>
            #{String(pokemon.id).padStart(3, '0')}
          </span>

          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={pokemon.sprite}
            alt={pokemon.name}
            style={{
              width: 160, height: 160,
              objectFit: 'contain',
              filter: 'drop-shadow(0 8px 20px rgba(0,0,0,0.2))',
              margin: '8px 0',
            }}
          />

          <h2 style={{
            fontSize: 28, fontWeight: 800, margin: 0,
            textTransform: 'capitalize', color: '#1a1a1a', letterSpacing: '-0.01em',
          }}>
            {pokemon.name}
          </h2>

          <div style={{ display: 'flex', gap: 8, marginTop: 10 }}>
            {pokemon.types.map((t) => <TypeBadge key={t} type={t} size="md" />)}
          </div>

          <button
            onClick={handleHeart}
            style={{
              marginTop: 14,
              display: 'flex', alignItems: 'center', gap: 6,
              background: isFavorite ? '#fff0f0' : '#f5f5f5',
              border: `2px solid ${isFavorite ? '#CC0000' : '#ddd'}`,
              borderRadius: 999, padding: '8px 18px',
              cursor: 'pointer', fontSize: 14, fontWeight: 700,
              color: isFavorite ? '#CC0000' : '#888',
              transition: 'all 0.2s ease', fontFamily: 'inherit',
            }}
          >
            <span style={{
              fontSize: 18,
              transform: heartAnim ? 'scale(1.5)' : 'scale(1)',
              transition: 'transform 0.2s cubic-bezier(0.34,1.56,0.64,1)',
              display: 'inline-block',
            }}>
              {isFavorite ? '♥' : '♡'}
            </span>
            {isFavorite ? 'Saved to Favorites' : 'Add to Favorites'}
          </button>
        </div>

        {/* Modal body */}
        <div style={{ padding: '20px 24px 28px' }}>
          {/* Physical info */}
          <div style={{ display: 'flex', gap: 12, marginBottom: 20 }}>
            {[
              { label: 'Height', value: `${(pokemon.height * 0.1).toFixed(1)} m` },
              { label: 'Weight', value: `${(pokemon.weight * 0.1).toFixed(1)} kg` },
            ].map(({ label, value }) => (
              <div key={label} style={{
                flex: 1, background: '#f8f8f8', borderRadius: 14,
                padding: '12px 16px', textAlign: 'center',
              }}>
                <div style={{ fontSize: 11, color: '#aaa', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.06em' }}>
                  {label}
                </div>
                <div style={{ fontSize: 18, fontWeight: 800, color: '#1a1a1a', marginTop: 2 }}>
                  {value}
                </div>
              </div>
            ))}
          </div>

          {/* Abilities */}
          <div style={{ marginBottom: 20 }}>
            <h3 style={{ fontSize: 12, fontWeight: 800, color: '#aaa', textTransform: 'uppercase', letterSpacing: '0.08em', margin: '0 0 10px' }}>
              Abilities
            </h3>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
              {pokemon.abilities.map((a) => (
                <span key={a.name} style={{
                  padding: '5px 14px', borderRadius: 999,
                  background: a.isHidden ? '#f0f0f0' : '#1a1a1a',
                  color: a.isHidden ? '#888' : '#fff',
                  fontSize: 13, fontWeight: 600, textTransform: 'capitalize',
                  border: a.isHidden ? '1px dashed #ccc' : 'none',
                }}>
                  {a.name.replace('-', ' ')}{a.isHidden ? ' (hidden)' : ''}
                </span>
              ))}
            </div>
          </div>

          {/* Base Stats */}
          <div>
            <h3 style={{ fontSize: 12, fontWeight: 800, color: '#aaa', textTransform: 'uppercase', letterSpacing: '0.08em', margin: '0 0 12px' }}>
              Base Stats
            </h3>
            {pokemon.stats.map((s) => (
              <StatBar key={s.name} label={s.name} value={s.value} animate={animateStats} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
