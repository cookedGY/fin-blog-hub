import { useEffect, useRef } from "react";

interface Flower {
  id: number;
  x: number;
  y: number;
  type: "cherry" | "lily";
  duration: number;
  delay: number;
  rotation: number;
  size: number;
}

export default function FlowerAnimation() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const flowersRef = useRef<Flower[]>([]);
  const animationIdRef = useRef<number | undefined>(undefined);
  const timeRef = useRef<number>(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d") as CanvasRenderingContext2D;
    if (!ctx) return;

    // Set canvas size
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    // Initialize flowers
    const initializeFlowers = () => {
      flowersRef.current = [];
      const flowerCount = Math.floor(window.innerWidth / 150);

      for (let i = 0; i < flowerCount; i++) {
        flowersRef.current.push({
          id: i,
          x: Math.random() * canvas.width,
          y: -50,
          type: Math.random() > 0.7 ? "lily" : "cherry",
          duration: 8 + Math.random() * 4,
          delay: Math.random() * 2,
          rotation: Math.random() * Math.PI * 2,
          size: 15 + Math.random() * 10,
        });
      }
    };
    initializeFlowers();

    // Draw cherry blossom petal
    const drawCherryBlossom = (
      x: number,
      y: number,
      size: number,
      rotation: number
    ) => {
      ctx.save();
      ctx.translate(x, y);
      ctx.rotate(rotation);

      // Draw 5 petals
      for (let i = 0; i < 5; i++) {
        ctx.save();
        ctx.rotate((i * Math.PI * 2) / 5);
        ctx.translate(0, -size * 0.6);

        // Petal shape (ellipse)
        ctx.beginPath();
        ctx.ellipse(0, 0, size * 0.4, size * 0.8, 0, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 182, 193, ${0.3 + Math.random() * 0.2})`;
        ctx.fill();

        ctx.restore();
      }

      // Center
      ctx.beginPath();
      ctx.arc(0, 0, size * 0.3, 0, Math.PI * 2);
      ctx.fillStyle = "rgba(255, 200, 124, 0.4)";
      ctx.fill();

      ctx.restore();
    };

    // Draw Guyanese lily
    const drawGuyaneseLily = (
      x: number,
      y: number,
      size: number,
      rotation: number
    ) => {
      ctx.save();
      ctx.translate(x, y);
      ctx.rotate(rotation);

      // Draw 6 petals in a star pattern
      for (let i = 0; i < 6; i++) {
        ctx.save();
        ctx.rotate((i * Math.PI * 2) / 6);
        ctx.translate(0, -size * 0.5);

        // Petal shape
        ctx.beginPath();
        ctx.ellipse(0, 0, size * 0.35, size * 0.75, 0, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(220, 20, 60, ${0.25 + Math.random() * 0.15})`; // Crimson red
        ctx.fill();

        ctx.restore();
      }

      // Center with golden stamens
      ctx.beginPath();
      ctx.arc(0, 0, size * 0.25, 0, Math.PI * 2);
      ctx.fillStyle = "rgba(255, 215, 0, 0.4)";
      ctx.fill();

      // Stamen details
      for (let i = 0; i < 6; i++) {
        ctx.save();
        ctx.rotate((i * Math.PI * 2) / 6);
        ctx.translate(0, -size * 0.15);
        ctx.beginPath();
        ctx.arc(0, 0, size * 0.08, 0, Math.PI * 2);
        ctx.fillStyle = "rgba(255, 200, 0, 0.3)";
        ctx.fill();
        ctx.restore();
      }

      ctx.restore();
    };

    // Animation loop
    const animate = () => {
      // Clear canvas with semi-transparent background for trail effect
      ctx.fillStyle = "rgba(253, 252, 251, 0.1)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      timeRef.current += 0.016; // ~60fps

      flowersRef.current.forEach((flower) => {
        const elapsed = timeRef.current - flower.delay;

        if (elapsed < 0) return;

        // Calculate progress (0 to 1)
        const progress = (elapsed % flower.duration) / flower.duration;

        // Y position (falling down)
        const newY = flower.y + progress * (canvas.height + 100);

        // X position (slight horizontal drift)
        const drift =
          Math.sin(progress * Math.PI * 4 + flower.id) * canvas.width * 0.1;
        const newX = flower.x + drift;

        // Rotation
        const newRotation = flower.rotation + progress * Math.PI * 8;

        // Opacity (fade out near bottom)
        const opacity = Math.max(0, 1 - Math.max(0, progress - 0.8) / 0.2);
        ctx.globalAlpha = opacity;

        // Draw flower
        if (flower.type === "cherry") {
          drawCherryBlossom(newX, newY, flower.size, newRotation);
        } else {
          drawGuyaneseLily(newX, newY, flower.size, newRotation);
        }

        ctx.globalAlpha = 1;

        // Reset flower when it reaches bottom
        if (progress > 0.95) {
          flower.y = -50;
          flower.x = Math.random() * canvas.width;
          flower.delay = timeRef.current;
        }
      });

      animationIdRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener("resize", resizeCanvas);
      if (animationIdRef.current) {
        cancelAnimationFrame(animationIdRef.current);
      }
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 pointer-events-none"
      style={{ zIndex: 1 }}
    />
  );
}
