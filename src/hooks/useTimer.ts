import { useEffect, useRef } from 'react';

export function useTimer(
  active: boolean,
  onTick: () => void,
  onExpire: () => void,
  timeLeft: number
) {
  const onTickRef = useRef(onTick);
  const onExpireRef = useRef(onExpire);
  onTickRef.current = onTick;
  onExpireRef.current = onExpire;

  useEffect(() => {
    if (!active) return;
    if (timeLeft <= 0) {
      onExpireRef.current();
      return;
    }

    const id = setInterval(() => {
      onTickRef.current();
    }, 1000);

    return () => clearInterval(id);
  }, [active, timeLeft]);
}
