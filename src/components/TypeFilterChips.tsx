'use client';

import { ALL_TYPES, ACCENT } from '@/lib/constants';
import { TypeBadge } from './TypeBadge';

interface TypeFilterChipsProps {
  selectedTypes: Set<string>;
  onToggle: (type: string) => void;
  onClearAll: () => void;
}

export function TypeFilterChips({ selectedTypes, onToggle, onClearAll }: TypeFilterChipsProps) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
      {selectedTypes.size > 0 && (
        <button
          onClick={onClearAll}
          style={{
            flexShrink: 0, height: 30, padding: '0 12px', borderRadius: 999,
            border: `2px solid ${ACCENT}`, background: 'transparent',
            color: ACCENT, fontSize: 12, fontWeight: 600, cursor: 'pointer',
            whiteSpace: 'nowrap', fontFamily: 'inherit',
          }}
        >
          Clear
        </button>
      )}
      <div style={{
        display: 'flex', gap: 6, overflowX: 'auto', paddingBottom: 2,
        scrollbarWidth: 'none',
        flexWrap: 'wrap',
      }}>
        {ALL_TYPES.map((type) => (
          <TypeBadge
            key={type}
            type={type}
            size="chip"
            selected={selectedTypes.has(type)}
            onClick={() => onToggle(type)}
          />
        ))}
      </div>
    </div>
  );
}
