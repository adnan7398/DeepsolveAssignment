'use client';

interface ToastProps {
  message: string;
  visible: boolean;
}

export function Toast({ message, visible }: ToastProps) {
  return (
    <div style={{
      position: 'fixed', bottom: 28, left: '50%',
      transform: `translateX(-50%) translateY(${visible ? 0 : 80}px)`,
      opacity: visible ? 1 : 0,
      transition: 'all 0.3s cubic-bezier(0.34,1.56,0.64,1)',
      background: '#1a1a1a', color: '#fff',
      padding: '10px 22px', borderRadius: 999,
      fontSize: 14, fontWeight: 600,
      boxShadow: '0 4px 16px rgba(0,0,0,0.3)',
      zIndex: 9999, pointerEvents: 'none', whiteSpace: 'nowrap',
    }}>
      {message}
    </div>
  );
}
