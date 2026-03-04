import { useEffect } from 'react';

interface KeyboardOptions {
  onNext?: () => void;
  onPrev?: () => void;
  onFlag?: () => void;
  enabled: boolean;
}

export function useKeyboard({ onNext, onPrev, onFlag, enabled }: KeyboardOptions) {
  useEffect(() => {
    if (!enabled) return;

    const handler = (e: KeyboardEvent) => {
      const tag = (e.target as HTMLElement)?.tagName;
      if (tag === 'INPUT' || tag === 'TEXTAREA') return;

      switch (e.key) {
        case 'ArrowRight': onNext?.(); break;
        case 'ArrowLeft':  onPrev?.(); break;
        case 'f':
        case 'F':          onFlag?.(); break;
      }
    };

    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [enabled, onNext, onPrev, onFlag]);
}
