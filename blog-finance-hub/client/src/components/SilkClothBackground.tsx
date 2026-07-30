import { useEffect, useRef } from "react";

export default function SilkClothBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationIdRef = useRef<number | undefined>(undefined);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (prefersReducedMotion.matches) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resizeCanvas = () => {
      const pixelRatio = window.devicePixelRatio || 1;
      canvas.width = window.innerWidth * pixelRatio;
      canvas.height = Math.max(window.innerHeight * 0.86, 620) * pixelRatio;
      canvas.style.width = `${window.innerWidth}px`;
      canvas.style.height = `${Math.max(window.innerHeight * 0.86, 620)}px`;
      ctx.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);
    };

    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    const drawWave = (
      time: number,
      baseY: number,
      amplitude: number,
      color: string,
      phase: number,
      blur: number,
    ) => {
      const width = window.innerWidth;
      const height = Math.max(window.innerHeight * 0.86, 620);

      ctx.save();
      ctx.filter = `blur(${blur}px)`;
      ctx.beginPath();
      ctx.moveTo(-80, height);

      for (let x = -80; x <= width + 80; x += 18) {
        const primary = Math.sin(x * 0.007 + time + phase) * amplitude;
        const secondary = Math.sin(x * 0.014 - time * 0.65 + phase) * amplitude * 0.38;
        const y = baseY + primary + secondary;
        ctx.lineTo(x, y);
      }

      ctx.lineTo(width + 80, height);
      ctx.closePath();
      ctx.fillStyle = color;
      ctx.fill();
      ctx.restore();
    };

    const animate = (timestamp: number) => {
      const width = window.innerWidth;
      const height = Math.max(window.innerHeight * 0.86, 620);
      const time = timestamp * 0.00045;

      ctx.clearRect(0, 0, width, height);

      const glow = ctx.createRadialGradient(width * 0.78, height * 0.16, 20, width * 0.78, height * 0.16, width * 0.58);
      glow.addColorStop(0, "rgba(249, 229, 237, 0.48)");
      glow.addColorStop(0.45, "rgba(255, 255, 255, 0.2)");
      glow.addColorStop(1, "rgba(255, 255, 255, 0)");
      ctx.fillStyle = glow;
      ctx.fillRect(0, 0, width, height);

      drawWave(time, height * 0.28, 32, "rgba(249, 229, 237, 0.52)", 0, 18);
      drawWave(time * 1.12, height * 0.36, 42, "rgba(15, 118, 110, 0.13)", 1.6, 24);
      drawWave(time * 0.86, height * 0.5, 54, "rgba(255, 255, 255, 0.48)", 3.4, 30);
      drawWave(time * 1.34, height * 0.63, 38, "rgba(244, 114, 182, 0.16)", 4.7, 22);

      animationIdRef.current = requestAnimationFrame(animate);
    };

    animationIdRef.current = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener("resize", resizeCanvas);
      if (animationIdRef.current) {
        cancelAnimationFrame(animationIdRef.current);
      }
    };
  }, []);

  return <canvas ref={canvasRef} className="silk-cloth-background" aria-hidden="true" />;
}
