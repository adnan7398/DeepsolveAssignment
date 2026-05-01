'use client';

import { ACCENT } from '@/lib/constants';

interface PaginationProps {
  page: number;
  totalPages: number;
  onPrev: () => void;
  onNext: () => void;
}

export function Pagination({ page, totalPages, onPrev, onNext }: PaginationProps) {
  const btnStyle = (disabled: boolean): React.CSSProperties => ({
    height: 40, padding: '0 20px', borderRadius: 10,
    border: `2px solid ${disabled ? '#eee' : ACCENT}`,
    background: disabled ? '#f9f9f9' : ACCENT,
    color: disabled ? '#ccc' : '#fff',
    fontWeight: 700, fontSize: 14, cursor: disabled ? 'not-allowed' : 'pointer',
    transition: 'all 0.15s', fontFamily: 'inherit',
  });

  return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 16, paddingTop: 8 }}>
      <button style={btnStyle(page === 0)} onClick={onPrev} disabled={page === 0}>
        ← Prev
      </button>
      <span style={{ fontSize: 14, color: '#666', fontWeight: 600, minWidth: 100, textAlign: 'center' }}>
        Page {page + 1} of {totalPages}
      </span>
      <button style={btnStyle(page >= totalPages - 1)} onClick={onNext} disabled={page >= totalPages - 1}>
        Next →
      </button>
    </div>
  );
}
