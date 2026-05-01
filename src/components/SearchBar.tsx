'use client';

import { ACCENT } from '@/lib/constants';

interface SearchBarProps {
  value: string;
  isDark: boolean;
  onChange: (val: string) => void;
  onClear: () => void;
}

export function SearchBar({ value, isDark, onChange, onClear }: SearchBarProps) {
  const inputBg = isDark ? '#2a2a2a' : '#fff';
  const inputColor = isDark ? '#f0f0f0' : '#1a1a1a';
  const borderColor = isDark ? '#444' : '#eee';

  return (
    <div style={{ position: 'relative', flex: 1, minWidth: 0 }}>
      <span style={{
        position: 'absolute', left: 14, top: '50%', transform: 'translateY(-50%)',
        color: '#bbb', fontSize: 16, pointerEvents: 'none',
      }}>
        🔍
      </span>
      <input
        type="text"
        placeholder="Search Pokémon by name or #..."
        value={value}
        onChange={(e) => onChange(e.target.value)}
        style={{
          width: '100%', boxSizing: 'border-box',
          height: 44, paddingLeft: 40, paddingRight: value ? 40 : 14,
          border: `2px solid ${borderColor}`, borderRadius: 12,
          fontSize: 14, fontFamily: 'inherit', outline: 'none',
          transition: 'border-color 0.15s',
          background: inputBg, color: inputColor,
        }}
        onFocus={(e) => (e.target.style.borderColor = ACCENT)}
        onBlur={(e) => (e.target.style.borderColor = borderColor)}
      />
      {value && (
        <button
          onClick={onClear}
          style={{
            position: 'absolute', right: 10, top: '50%', transform: 'translateY(-50%)',
            background: isDark ? '#444' : '#eee', border: 'none', borderRadius: '50%',
            width: 22, height: 22, cursor: 'pointer', fontSize: 12,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            color: '#666',
          }}
        >
          ✕
        </button>
      )}
    </div>
  );
}
