/*
 * STYLE REMINDER — Editorial Lab Notebook:
 * celebration sound is a tiny audible ink-stamp: warm, brief, optional, and never louder than the lesson.
 */

export const CELEBRATION_SOUND_KEY = "english48-celebration-sound";

type AudioContextConstructor = typeof AudioContext;

export function isCelebrationSoundEnabled() {
  if (typeof window === "undefined") return true;
  return window.localStorage.getItem(CELEBRATION_SOUND_KEY) !== "off";
}

export function setCelebrationSoundEnabled(enabled: boolean) {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(CELEBRATION_SOUND_KEY, enabled ? "on" : "off");
}

export function playCelebrationChime() {
  if (typeof window === "undefined" || !isCelebrationSoundEnabled()) return;
  const AudioContextClass = window.AudioContext ?? (window as Window & { webkitAudioContext?: AudioContextConstructor }).webkitAudioContext;
  if (!AudioContextClass) return;

  try {
    const context = new AudioContextClass();
    const gain = context.createGain();
    gain.gain.setValueAtTime(0.0001, context.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.075, context.currentTime + 0.025);
    gain.gain.exponentialRampToValueAtTime(0.0001, context.currentTime + 0.62);
    gain.connect(context.destination);

    [523.25, 659.25, 783.99].forEach((frequency, index) => {
      const oscillator = context.createOscillator();
      oscillator.type = "sine";
      oscillator.frequency.setValueAtTime(frequency, context.currentTime + index * 0.075);
      oscillator.connect(gain);
      oscillator.start(context.currentTime + index * 0.075);
      oscillator.stop(context.currentTime + 0.62);
    });

    window.setTimeout(() => void context.close(), 800);
  } catch {
    // Audio is a progressive enhancement; completion must never depend on it.
  }
}
