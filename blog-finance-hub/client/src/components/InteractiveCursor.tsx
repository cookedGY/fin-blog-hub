import { useEffect, useRef, useState } from "react";

const interactiveSelector = [
  "a",
  "button",
  ".card",
  ".mini-card",
  "[data-cursor-reactive]",
].join(",");

const reactiveSelector = [
  "[data-cursor-reactive]",
  ".card",
  ".hero-inner",
  ".hero-card",
  ".learning-panel",
  ".portfolio-intro-card",
  ".portfolio-pane",
  ".speaking-hero-card",
  ".speaking-content-card",
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
    let reactiveElements: HTMLElement[] = [];

    const refreshReactiveElements = () => {
      reactiveElements = Array.from(document.querySelectorAll(reactiveSelector)).filter(
        (element): element is HTMLElement => element instanceof HTMLElement,
      );
    };

    document.documentElement.classList.add("has-interactive-cursor");
    refreshReactiveElements();

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

      reactiveElements.forEach((element) => {
        const rect = element.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        const deltaX = event.clientX - centerX;
        const deltaY = event.clientY - centerY;
        const distance = Math.hypot(deltaX, deltaY);
        const range = Math.max(rect.width, rect.height) * 0.95;
        const pull = Math.max(0, 1 - distance / range);

        if (pull < 0.05) {
          element.classList.remove("cursor-reactive-near");
          element.style.removeProperty("--reactive-x");
          element.style.removeProperty("--reactive-y");
          element.style.removeProperty("--reactive-scale");
          return;
        }

        const divisor = Math.max(distance, 1);
        const moveX = (deltaX / divisor) * pull * 7;
        const moveY = (deltaY / divisor) * pull * 5 - pull * 5;

        element.classList.toggle("cursor-reactive-near", pull > 0.22);
        element.style.setProperty("--reactive-x", `${moveX.toFixed(2)}px`);
        element.style.setProperty("--reactive-y", `${moveY.toFixed(2)}px`);
        element.style.setProperty("--reactive-scale", `${(1 + pull * 0.01).toFixed(3)}`);
      });
    };

    const handlePointerLeave = () => {
      reactiveElements.forEach((element) => {
        element.classList.remove("cursor-reactive-near");
        element.style.removeProperty("--reactive-x");
        element.style.removeProperty("--reactive-y");
        element.style.removeProperty("--reactive-scale");
      });
    };

    window.addEventListener("pointermove", handlePointerMove);
    window.addEventListener("pointerleave", handlePointerLeave);
    window.addEventListener("resize", refreshReactiveElements);
    frame = window.requestAnimationFrame(updateCursor);

    return () => {
      window.removeEventListener("pointermove", handlePointerMove);
      window.removeEventListener("pointerleave", handlePointerLeave);
      window.removeEventListener("resize", refreshReactiveElements);
      window.cancelAnimationFrame(frame);
      document.documentElement.classList.remove("has-interactive-cursor");
      handlePointerLeave();
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
