'use client';

const STAT_LABELS: Record<string, string> = {
  'special-attack':  'Sp.Atk',
  'special-defense': 'Sp.Def',
  hp:      'HP',
  attack:  'ATK',
  defense: 'DEF',
  speed:   'SPD',
};

interface StatBarProps {
  label: string;
  value: number;
  max?: number;
  animate: boolean;
}

export function StatBar({ label, value, max = 255, animate }: StatBarProps) {
  const pct = Math.min(100, (value / max) * 100);
  const color = pct > 66 ? '#3FA129' : pct > 33 ? '#FAC000' : '#E62829';

  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 8 }}>
      <span style={{
        width: 52, fontSize: 11, fontWeight: 700, color: '#888',
        textTransform: 'uppercase', letterSpacing: '0.04em', flexShrink: 0,
      }}>
        {STAT_LABELS[label] ?? label}
      </span>
      <span style={{ width: 30, fontSize: 13, fontWeight: 700, color: '#333', textAlign: 'right', flexShrink: 0 }}>
        {value}
      </span>
      <div style={{ flex: 1, height: 8, background: '#f0f0f0', borderRadius: 999, overflow: 'hidden' }}>
        <div style={{
          height: '100%', borderRadius: 999,
          background: color,
          width: animate ? `${pct}%` : '0%',
          transition: animate ? 'width 0.8s cubic-bezier(0.4,0,0.2,1)' : 'none',
        }} />
      </div>
    </div>
  );
}
