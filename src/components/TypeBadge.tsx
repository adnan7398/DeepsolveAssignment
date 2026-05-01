'use client';

import { TYPE_COLORS } from '@/lib/constants';

interface TypeBadgeProps {
  type: string;
  size?: 'sm' | 'md' | 'chip';
  selected?: boolean;
  onClick?: () => void;
}

export function TypeBadge({ type, size = 'sm', selected, onClick }: TypeBadgeProps) {
  const color = TYPE_COLORS[type] ?? { bg: '#999', text: '#fff' };

  const base: React.CSSProperties = {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 999,
    fontWeight: 600,
    letterSpacing: '0.03em',
    textTransform: 'capitalize',
    cursor: onClick ? 'pointer' : 'default',
    transition: 'all 0.15s ease',
    userSelect: 'none',
    fontFamily: 'inherit',
  };

  const sizeStyles: Record<string, React.CSSProperties> = {
    sm:   { fontSize: 11, padding: '2px 10px', height: 22 },
    md:   { fontSize: 13, padding: '4px 14px', height: 28 },
    chip: { fontSize: 12, padding: '5px 14px', height: 30, border: `2px solid ${color.bg}` },
  };

  const style: React.CSSProperties =
    size === 'chip'
      ? {
          ...base,
          ...sizeStyles.chip,
          background: selected ? color.bg : 'transparent',
          color: selected ? color.text : color.bg,
        }
      : {
          ...base,
          ...sizeStyles[size],
          background: color.bg,
          color: color.text,
        };

  return (
    <span style={style} onClick={onClick} title={type}>
      {type}
    </span>
  );
}
