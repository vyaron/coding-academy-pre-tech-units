import { useEffect, useRef } from 'react';

interface Node {
  x: number;
  y: number;
  brightness: number;
  speed: number;
  dir: 1 | -1;
}

export default function BackgroundCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const SPACING = 36;
    let nodes: Node[] = [];
    let animId: number;

    function resize() {
      canvas!.width  = window.innerWidth;
      canvas!.height = window.innerHeight;
      nodes = [];
      const cols = Math.ceil(canvas!.width  / SPACING) + 1;
      const rows = Math.ceil(canvas!.height / SPACING) + 1;
      for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
          nodes.push({
            x: c * SPACING,
            y: r * SPACING,
            brightness: Math.random(),
            speed: 0.003 + Math.random() * 0.007,
            dir: Math.random() > 0.5 ? 1 : -1,
          });
        }
      }
    }

    function draw() {
      ctx!.clearRect(0, 0, canvas!.width, canvas!.height);

      // Grid lines
      ctx!.strokeStyle = 'rgba(0, 229, 255, 0.04)';
      ctx!.lineWidth = 0.5;
      const cols = Math.ceil(canvas!.width  / SPACING) + 1;
      const rows = Math.ceil(canvas!.height / SPACING) + 1;
      for (let c = 0; c < cols; c++) {
        ctx!.beginPath();
        ctx!.moveTo(c * SPACING, 0);
        ctx!.lineTo(c * SPACING, canvas!.height);
        ctx!.stroke();
      }
      for (let r = 0; r < rows; r++) {
        ctx!.beginPath();
        ctx!.moveTo(0, r * SPACING);
        ctx!.lineTo(canvas!.width, r * SPACING);
        ctx!.stroke();
      }

      // Nodes
      nodes.forEach((n) => {
        n.brightness += n.speed * n.dir;
        if (n.brightness >= 1) { n.brightness = 1; n.dir = -1; }
        if (n.brightness <= 0) { n.brightness = 0; n.dir = 1; }

        const alpha = n.brightness * 0.5;
        const radius = 1.2 + n.brightness * 1.4;

        ctx!.beginPath();
        ctx!.arc(n.x, n.y, radius, 0, Math.PI * 2);
        ctx!.fillStyle = `rgba(0, 229, 255, ${alpha})`;
        ctx!.fill();
      });

      animId = requestAnimationFrame(draw);
    }

    resize();
    draw();
    window.addEventListener('resize', resize);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 0,
        pointerEvents: 'none',
        opacity: 0.5,
      }}
    />
  );
}
