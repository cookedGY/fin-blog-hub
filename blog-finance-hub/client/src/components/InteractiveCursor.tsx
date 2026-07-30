import { useEffect, useRef, useState } from "react";

const interactiveSelector = [
  "a",
  "button",
  ".card",
  ".mini-card",
  ".ambient-lotus-music-box",
  "[data-cursor-reactive]",
].join(",");

function getCursorLabel(target: EventTarget | null) {
  if (!(target instanceof Element)) return "";

  const interactiveElement = target.closest(interactiveSelector);
  if (!(interactiveElement instanceof HTMLElement)) return "";

  const text = interactiveElement.textContent?.toLowerCase() || "";

  if (text.includes("play sound") || text.includes("stop sound")) return "Listen";
  if (text.includes("read")) return "Read";
  if (interactiveElement.tagName.toLowerCase() === "button") return "Select";

  return "Open";
}

export default function InteractiveCursor() {
  const cursorRef = useRef<HTMLDivElement | null>(null);
  const [label, setLabel] = useState("");

  useEffect(() => {
    if (typeof window === "undefined") return;

    const supportsFinePointer = window.matchMedia("(pointer: fine)").matches;
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (!supportsFinePointer || prefersReducedMotion) return;

    let frame = 0;
    let targetX = window.innerWidth / 2;
    let targetY = window.innerHeight / 2;
    let currentX = targetX;
    let currentY = targetY;
    let previousX = targetX;
    let previousY = targetY;

    document.documentElement.classList.add("has-interactive-cursor");

    const updateCursor = () => {
      const cursor = cursorRef.current;
      if (!cursor) return;

      currentX += (targetX - currentX) * 0.18;
      currentY += (targetY - currentY) * 0.18;

      const velocityX = currentX - previousX;
      const velocityY = currentY - previousY;
      const speed = Math.min(Math.hypot(velocityX, velocityY), 36);
      const angle = Math.atan2(velocityY, velocityX) * (180 / Math.PI);
      const stretch = 1 + speed * 0.012;
      const squash = 1 - speed * 0.004;

      cursor.style.setProperty("--cursor-x", `${currentX}px`);
      cursor.style.setProperty("--cursor-y", `${currentY}px`);
      cursor.style.setProperty("--cursor-rotate", `${angle}deg`);
      cursor.style.setProperty("--cursor-label-rotate", `${-angle}deg`);
      cursor.style.setProperty("--cursor-scale-x", `${stretch}`);
      cursor.style.setProperty("--cursor-scale-y", `${Math.max(squash, 0.86)}`);

      previousX = currentX;
      previousY = currentY;
      frame = window.requestAnimationFrame(updateCursor);
    };

    const handlePointerMove = (event: PointerEvent) => {
      targetX = event.clientX;
      targetY = event.clientY;

      const nextLabel = getCursorLabel(event.target);
      setLabel((currentLabel) => (currentLabel === nextLabel ? currentLabel : nextLabel));
    };

    window.addEventListener("pointermove", handlePointerMove);
    frame = window.requestAnimationFrame(updateCursor);

    return () => {
      window.removeEventListener("pointermove", handlePointerMove);
      window.cancelAnimationFrame(frame);
      document.documentElement.classList.remove("has-interactive-cursor");
    };
  }, []);

  return (
    <div
      ref={cursorRef}
      className={label ? "interactive-cursor is-active" : "interactive-cursor"}
      aria-hidden="true"
    >
      <span className="interactive-cursor-core" />
      <span className="interactive-cursor-label">{label}</span>
    </div>
  );
}
