'use client';

import { useState, useCallback } from 'react';
import type { Pokemon, Theme } from '@/lib/types';
import { ACCENT, PAGE_SIZE } from '@/lib/constants';
import { usePokemonList } from '@/hooks/usePokemonList';
import { useFavorites } from '@/hooks/useFavorites';
import { PokemonCard } from '@/components/PokemonCard';
import { SkeletonCard } from '@/components/SkeletonCard';
import { SearchBar } from '@/components/SearchBar';
import { TypeFilterChips } from '@/components/TypeFilterChips';
import { Pagination } from '@/components/Pagination';
import { DetailModal } from '@/components/DetailModal';
import { Toast } from '@/components/Toast';

type View = 'main' | 'favorites';

export default function Home() {
  const { allPokemon, loading, error, refetch } = usePokemonList();
  const { favorites, toggleFavorite } = useFavorites();

  const [search, setSearch] = useState('');
  const [selectedTypes, setSelectedTypes] = useState<Set<string>>(new Set());
  const [page, setPage] = useState(0);
  const [view, setView] = useState<View>('main');
  const [selectedPokemon, setSelectedPokemon] = useState<Pokemon | null>(null);
  const [toast, setToast] = useState({ visible: false, message: '' });
  const [fadeKey, setFadeKey] = useState(0);
  const [theme, setTheme] = useState<Theme>('light');

  const isDark = theme === 'dark';
  const bg = isDark ? '#111' : '#F4F4F6';
  const textColor = isDark ? '#f0f0f0' : '#1a1a1a';
  const subtleText = isDark ? '#888' : '#666';
  const borderColor = isDark ? '#333' : '#eee';
  const headerBg = isDark ? '#1a1a1a' : '#fff';

  const showToast = useCallback((msg: string) => {
    setToast({ visible: true, message: msg });
    setTimeout(() => setToast((t) => ({ ...t, visible: false })), 2200);
  }, []);

  const handleToggleFavorite = useCallback((id: number) => {
    const result = toggleFavorite(id);
    const name = allPokemon.find((p) => p.id === id)?.name ?? 'Pokémon';
    if (result === 'added') showToast(`❤️ Added ${name} to favorites`);
    else showToast(`💔 Removed ${name} from favorites`);
  }, [toggleFavorite, allPokemon, showToast]);

  const toggleType = (type: string) => {
    setSelectedTypes((prev) => {
      const next = new Set(prev);
      if (next.has(type)) next.delete(type); else next.add(type);
      return next;
    });
    setPage(0);
  };

  const handleSearch = (val: string) => { setSearch(val); setPage(0); };

  const switchView = (v: View) => {
    setFadeKey((k) => k + 1);
    setView(v);
    setPage(0);
    setSearch('');
    setSelectedTypes(new Set());
  };

  const sourceList = view === 'favorites'
    ? allPokemon.filter((p) => favorites.has(p.id))
    : allPokemon;

  const filtered = sourceList.filter((p) => {
    const q = search.toLowerCase();
    const matchSearch =
      !search ||
      p.name.includes(q) ||
      String(p.id).padStart(3, '0').includes(q) ||
      String(p.id).includes(q);
    const matchType = selectedTypes.size === 0 || p.types.some((t) => selectedTypes.has(t));
    return matchSearch && matchType;
  });

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const currentPage = Math.min(page, totalPages - 1);
  const paginated = filtered.slice(currentPage * PAGE_SIZE, (currentPage + 1) * PAGE_SIZE);

  return (
    <div style={{ minHeight: '100vh', background: bg, color: textColor, transition: 'background 0.3s, color 0.3s' }}>
      {/* Header */}
      <header style={{
        background: headerBg,
        borderBottom: `1px solid ${borderColor}`,
        position: 'sticky', top: 0, zIndex: 100,
        boxShadow: '0 2px 12px rgba(0,0,0,0.07)',
      }}>
        <div style={{ maxWidth: 1280, margin: '0 auto', padding: '14px 20px' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 12, flexWrap: 'wrap', gap: 8 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
              <div style={{
                width: 36, height: 36, borderRadius: '50%',
                background: ACCENT,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                boxShadow: `0 2px 8px ${ACCENT}55`,
                flexShrink: 0,
              }}>
                <div style={{ width: 14, height: 14, borderRadius: '50%', background: '#fff', border: '2px solid rgba(0,0,0,0.2)' }} />
              </div>
              <span style={{ fontSize: 22, fontWeight: 900, color: ACCENT, letterSpacing: '-0.02em' }}>Pokédex</span>
              <span style={{ fontSize: 13, fontWeight: 600, color: subtleText, background: isDark ? '#2a2a2a' : '#f0f0f0', padding: '2px 8px', borderRadius: 6 }}>
                Lite
              </span>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: 6, flexWrap: 'wrap' }}>
              <button
                onClick={() => setTheme(isDark ? 'light' : 'dark')}
                title={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
                style={{
                  height: 36, width: 36, borderRadius: 10, border: 'none',
                  background: isDark ? '#2a2a2a' : '#f0f0f0',
                  color: subtleText, fontSize: 16, cursor: 'pointer',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  transition: 'all 0.15s',
                }}
              >
                {isDark ? '☀️' : '🌙'}
              </button>

              {(['main', 'favorites'] as const).map((v) => (
                <button key={v} onClick={() => switchView(v)} style={{
                  height: 36, padding: '0 16px', borderRadius: 10, border: 'none',
                  background: view === v ? ACCENT : (isDark ? '#2a2a2a' : '#f0f0f0'),
                  color: view === v ? '#fff' : subtleText,
                  fontWeight: 700, fontSize: 13, cursor: 'pointer',
                  fontFamily: 'inherit', transition: 'all 0.15s',
                  display: 'flex', alignItems: 'center', gap: 6,
                }}>
                  {v === 'favorites' ? '♥ ' : ''}
                  {v === 'main' ? 'Browse' : `Favorites${favorites.size > 0 ? ` (${favorites.size})` : ''}`}
                </button>
              ))}
            </div>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            <SearchBar value={search} isDark={isDark} onChange={handleSearch} onClear={() => handleSearch('')} />
            <TypeFilterChips
              selectedTypes={selectedTypes}
              onToggle={toggleType}
              onClearAll={() => { setSelectedTypes(new Set()); setPage(0); }}
            />
          </div>
        </div>
      </header>

      {/* Main content */}
      <main style={{ maxWidth: 1280, margin: '0 auto', padding: '24px 20px 40px' }}>
        <div key={fadeKey} className="fade-in">
          {/* Loading */}
          {loading && (
            <div className="poke-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(170px, 1fr))', gap: 16 }}>
              {Array.from({ length: PAGE_SIZE }).map((_, i) => <SkeletonCard key={i} />)}
            </div>
          )}

          {/* Error */}
          {!loading && error && (
            <div style={{ textAlign: 'center', padding: '80px 20px' }}>
              <div style={{ fontSize: 56, marginBottom: 16 }}>⚠️</div>
              <div style={{ fontSize: 22, fontWeight: 800, color: '#CC0000', marginBottom: 8 }}>Oops! Something went wrong</div>
              <div style={{ fontSize: 15, color: subtleText, marginBottom: 24 }}>{error}</div>
              <button onClick={refetch} style={{
                height: 44, padding: '0 28px', borderRadius: 12,
                background: ACCENT, color: '#fff', border: 'none',
                fontWeight: 700, fontSize: 15, cursor: 'pointer', fontFamily: 'inherit',
              }}>Retry</button>
            </div>
          )}

          {/* Empty favorites */}
          {!loading && !error && view === 'favorites' && filtered.length === 0 && (
            <div style={{ textAlign: 'center', padding: '80px 20px' }}>
              <div style={{ fontSize: 64, marginBottom: 16 }}>♡</div>
              <div style={{ fontSize: 22, fontWeight: 800, color: textColor, marginBottom: 8 }}>No favorites yet</div>
              <div style={{ fontSize: 15, color: subtleText, marginBottom: 24 }}>Click the ♥ on any Pokémon to save it here.</div>
              <button onClick={() => switchView('main')} style={{
                height: 44, padding: '0 28px', borderRadius: 12,
                background: ACCENT, color: '#fff', border: 'none',
                fontWeight: 700, fontSize: 15, cursor: 'pointer', fontFamily: 'inherit',
              }}>Browse Pokémon</button>
            </div>
          )}

          {/* Empty search */}
          {!loading && !error && view === 'main' && allPokemon.length > 0 && filtered.length === 0 && (
            <div style={{ textAlign: 'center', padding: '80px 20px' }}>
              <div style={{ fontSize: 56, marginBottom: 16 }}>🔍</div>
              <div style={{ fontSize: 22, fontWeight: 800, color: textColor, marginBottom: 8 }}>No Pokémon found</div>
              <div style={{ fontSize: 15, color: subtleText, marginBottom: 24 }}>
                {search ? `No results for "${search}"` : 'Try adjusting your filters'}
              </div>
              <button onClick={() => { handleSearch(''); setSelectedTypes(new Set()); }} style={{
                height: 44, padding: '0 28px', borderRadius: 12,
                background: ACCENT, color: '#fff', border: 'none',
                fontWeight: 700, fontSize: 15, cursor: 'pointer', fontFamily: 'inherit',
              }}>Clear Filters</button>
            </div>
          )}

          {/* Grid + pagination */}
          {!loading && !error && paginated.length > 0 && (
            <>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
                <span style={{ fontSize: 13, color: subtleText, fontWeight: 600 }}>
                  {filtered.length} Pokémon{search || selectedTypes.size ? ' found' : ''}
                </span>
              </div>

              <div className="poke-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(170px, 1fr))', gap: 16 }}>
                {paginated.map((p) => (
                  <PokemonCard
                    key={p.id}
                    pokemon={p}
                    isFavorite={favorites.has(p.id)}
                    isDark={isDark}
                    onToggleFavorite={handleToggleFavorite}
                    onClick={() => setSelectedPokemon(p)}
                  />
                ))}
              </div>

              <div style={{ marginTop: 32 }}>
                <Pagination
                  page={currentPage}
                  totalPages={totalPages}
                  onPrev={() => { setPage((p) => Math.max(0, p - 1)); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                  onNext={() => { setPage((p) => Math.min(totalPages - 1, p + 1)); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                />
              </div>
            </>
          )}
        </div>
      </main>

      {selectedPokemon && (
        <DetailModal
          pokemon={selectedPokemon}
          isFavorite={favorites.has(selectedPokemon.id)}
          onToggleFavorite={handleToggleFavorite}
          onClose={() => setSelectedPokemon(null)}
        />
      )}

      <Toast message={toast.message} visible={toast.visible} />
    </div>
  );
}
