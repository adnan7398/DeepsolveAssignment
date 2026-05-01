'use client';

export function SkeletonCard() {
  return (
    <div
      style={{
        background: '#fff',
        borderRadius: 20,
        boxShadow: '0 2px 10px rgba(0,0,0,0.07)',
        padding: '20px 16px 16px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: 10,
      }}
    >
      {[60, 96, 80, 50].map((w, i) => (
        <div
          key={i}
          className="skeleton-shimmer"
          style={{
            width: i === 1 ? 96 : w,
            height: i === 1 ? 96 : i === 0 ? 12 : i === 2 ? 14 : 20,
            borderRadius: i === 1 ? 8 : 999,
          }}
        />
      ))}
    </div>
  );
}
