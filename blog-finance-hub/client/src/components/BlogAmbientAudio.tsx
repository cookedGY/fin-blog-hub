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
    <div className="ambient-audio-card">
      <div>
        <div className="sidebar-label">Reading sound</div>
        <p className="ambient-audio-copy">
          A soft Chinese-inspired instrumental for slow reading.
        </p>
      </div>
      <button
        type="button"
        className="ambient-lotus-button"
        onClick={toggleAudio}
        aria-pressed={isPlaying}
        aria-label={isPlaying ? "Stop ambient music" : "Start ambient music"}
      >
        <span className="ambient-lotus" aria-hidden="true">
          <span className="ambient-lotus-petal ambient-lotus-petal-top" />
          <span className="ambient-lotus-petal ambient-lotus-petal-left" />
          <span className="ambient-lotus-petal ambient-lotus-petal-right" />
          <span className="ambient-lotus-center" />
        </span>
        <span>{isPlaying ? "Stop" : needsGesture ? "Start" : "Play"}</span>
      </button>
    </div>
  );
}
