import { useEffect, useRef, useState } from "react";

declare global {
  interface Window {
    webkitAudioContext?: typeof AudioContext;
  }
}

const pentatonicNotes = [261.63, 293.66, 329.63, 392.0, 440.0, 523.25, 587.33, 659.25];
const melody = [0, 2, 3, 5, 3, 2, 1, 0, 2, 5, 6, 5, 3, 2, 0, 1];

export default function BlogAmbientAudio() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [needsGesture, setNeedsGesture] = useState(false);
  const audioContextRef = useRef<AudioContext | null>(null);
  const gainRef = useRef<GainNode | null>(null);
  const delayRef = useRef<DelayNode | null>(null);
  const intervalRef = useRef<number | null>(null);
  const noteIndexRef = useRef(0);

  const stopAudio = () => {
    if (intervalRef.current) {
      window.clearInterval(intervalRef.current);
      intervalRef.current = null;
    }

    const context = audioContextRef.current;
    const gain = gainRef.current;

    if (context && gain) {
      gain.gain.cancelScheduledValues(context.currentTime);
      gain.gain.setTargetAtTime(0, context.currentTime, 0.25);
    }

    window.setTimeout(() => {
      audioContextRef.current?.close();
      audioContextRef.current = null;
      gainRef.current = null;
      delayRef.current = null;
    }, 400);

    setIsPlaying(false);
    setNeedsGesture(false);
  };

  const playNote = () => {
    const context = audioContextRef.current;
    const gain = gainRef.current;
    const delay = delayRef.current;

    if (!context || !gain || !delay) return;

    const now = context.currentTime;
    const note = pentatonicNotes[melody[noteIndexRef.current % melody.length]];
    const oscillator = context.createOscillator();
    const noteGain = context.createGain();
    const filter = context.createBiquadFilter();

    oscillator.type = "sine";
    oscillator.frequency.setValueAtTime(note, now);
    filter.type = "lowpass";
    filter.frequency.setValueAtTime(1200, now);

    noteGain.gain.setValueAtTime(0, now);
    noteGain.gain.linearRampToValueAtTime(0.11, now + 0.04);
    noteGain.gain.exponentialRampToValueAtTime(0.001, now + 1.7);

    oscillator.connect(filter);
    filter.connect(noteGain);
    noteGain.connect(gain);
    noteGain.connect(delay);

    oscillator.start(now);
    oscillator.stop(now + 1.75);
    noteIndexRef.current += 1;
  };

  const startAudio = async () => {
    if (audioContextRef.current) return;

    const AudioContextClass = window.AudioContext || window.webkitAudioContext;
    if (!AudioContextClass) return;

    const context = new AudioContextClass();
    const masterGain = context.createGain();
    const delay = context.createDelay(1.8);
    const delayGain = context.createGain();

    masterGain.gain.setValueAtTime(0.055, context.currentTime);
    delay.delayTime.setValueAtTime(0.42, context.currentTime);
    delayGain.gain.setValueAtTime(0.18, context.currentTime);

    delay.connect(delayGain);
    delayGain.connect(masterGain);
    masterGain.connect(context.destination);

    audioContextRef.current = context;
    gainRef.current = masterGain;
    delayRef.current = delay;
    noteIndexRef.current = 0;

    playNote();
    intervalRef.current = window.setInterval(playNote, 820);

    try {
      await context.resume();
    } catch {
      setNeedsGesture(true);
    }

    if (context.state === "running") {
      setIsPlaying(true);
      setNeedsGesture(false);
    } else {
      setNeedsGesture(true);
    }
  };

  const resumeAudio = async () => {
    const context = audioContextRef.current;
    if (!context) {
      await startAudio();
      return;
    }

    await context.resume();
    setIsPlaying(context.state === "running");
    setNeedsGesture(context.state !== "running");
  };

  const toggleAudio = async () => {
    if (isPlaying) {
      stopAudio();
      return;
    }

    await resumeAudio();
  };

  useEffect(() => {
    startAudio();

    const resumeOnInteraction = () => {
      resumeAudio();
    };

    window.addEventListener("pointerdown", resumeOnInteraction, { once: true });
    window.addEventListener("keydown", resumeOnInteraction, { once: true });

    return () => {
      window.removeEventListener("pointerdown", resumeOnInteraction);
      window.removeEventListener("keydown", resumeOnInteraction);
      stopAudio();
    };
  }, []);

  return (
    <div className="ambient-lotus-music-box">
      <svg className="ambient-lotus-music-shape" viewBox="0 0 260 168" aria-hidden="true">
        <path className="ambient-lotus-music-leaf" d="M48 113c28-17 61-13 79 20-31 18-65 12-79-20Z" />
        <path className="ambient-lotus-music-leaf" d="M212 113c-28-17-61-13-79 20 31 18 65 12 79-20Z" />
        <path className="ambient-lotus-music-petal ambient-lotus-music-petal-back" d="M130 12c37 35 44 76 0 130-44-54-37-95 0-130Z" />
        <path className="ambient-lotus-music-petal ambient-lotus-music-petal-side" d="M71 42c48 11 74 43 64 98-54-16-76-47-64-98Z" />
        <path className="ambient-lotus-music-petal ambient-lotus-music-petal-side" d="M189 42c-48 11-74 43-64 98 54-16 76-47 64-98Z" />
        <path className="ambient-lotus-music-petal ambient-lotus-music-petal-front" d="M130 65c45 30 53 66 0 94-53-28-45-64 0-94Z" />
      </svg>

      <div className="ambient-lotus-music-content">
        <div className="sidebar-label">Reading sound</div>
        <p className="ambient-audio-copy">
          A soft Chinese-inspired instrumental for slow reading.
        </p>
        <button
          type="button"
          className="ambient-lotus-button"
          onClick={toggleAudio}
          aria-pressed={isPlaying}
          aria-label={isPlaying ? "Stop ambient music" : "Start ambient music"}
        >
          <svg className="ambient-lotus-svg" viewBox="0 0 64 52" aria-hidden="true">
            <path className="ambient-lotus-leaf" d="M12 36c8-4 17-4 20 7-8 4-17 3-20-7Z" />
            <path className="ambient-lotus-leaf" d="M52 36c-8-4-17-4-20 7 8 4 17 3 20-7Z" />
            <path className="ambient-lotus-petal ambient-lotus-petal-back" d="M32 5c7 8 8 17 0 28-8-11-7-20 0-28Z" />
            <path className="ambient-lotus-petal ambient-lotus-petal-side" d="M17 16c10 2 16 9 15 22-12-3-17-10-15-22Z" />
            <path className="ambient-lotus-petal ambient-lotus-petal-side" d="M47 16c-10 2-16 9-15 22 12-3 17-10 15-22Z" />
            <path className="ambient-lotus-petal ambient-lotus-petal-front" d="M32 18c8 6 10 14 0 25-10-11-8-19 0-25Z" />
            <path className="ambient-lotus-base" d="M18 41c8 5 20 5 28 0" />
          </svg>
          <span>{isPlaying ? "Stop sound" : needsGesture ? "Start sound" : "Play sound"}</span>
        </button>
      </div>
    </div>
  );
}
