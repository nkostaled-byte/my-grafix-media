"use client";

import { useCallback, useEffect, useReducer, useRef } from "react";

/**
 * MAYA VOICE — STATE MACHINE
 *
 * Voice is an interface layer over the existing Maya agent, never a
 * second brain: the transcript is handed to the shared chat flow, and
 * Maya's reply text is handed back here for speech.
 *
 *   idle → listening → transcribing → (chat thinks) → speaking → idle
 *
 * Unavailable paths are explicit states, so the UI can always route the
 * visitor back to text:
 *   unsupported · permission-denied · error
 *
 * COST MODEL
 * Recognition and playback are browser-native. The only network call is
 * the same-origin /api/maya/speech request per reply. Audio is stopped,
 * revoked and re-created per turn — nothing lingers.
 */

export type VoicePhase =
  | "idle"
  | "unsupported"
  | "permission-denied"
  | "listening"
  | "transcribing"
  | "speaking"
  | "error";

type VoiceError =
  | "permission"
  | "microphone"
  | "no-speech"
  | "network"
  | "api"
  | "transcription"
  | "playback";

type VoiceState = {
  phase: VoicePhase;
  /** Text the visitor has spoken so far, while listening. */
  interim: string;
  /** Human-friendly explanation for non-idle failure states. */
  message: string;
  /** Blob URL kept after browser playback was blocked, so the reply can
      still be heard with one tap. */
  blockedAudioUrl: string | null;
};

type VoiceAction =
  | { type: "listening" }
  | { type: "interim"; text: string }
  | { type: "transcribing" }
  | { type: "speaking" }
  | { type: "idle" }
  | { type: "unsupported" }
  | { type: "permission-denied" }
  | { type: "error"; cause: VoiceError; blockedAudioUrl?: string };

const messageFor: Record<VoiceError, string> = {
  permission:
    "Microphone access was declined. Allow microphone permission for this site in your browser settings, then press Talk to Maya again — or keep typing below.",
  microphone:
    "No microphone was found. Connect or select a microphone, then try again — or keep typing below.",
  "no-speech":
    "I didn't catch anything. Press Talk to Maya and speak a little louder, or keep typing below.",
  network:
    "The connection dropped before your words could be processed. Please try again, or keep typing below.",
  api:
    "Voice processing is having a moment. Maya still has your words in chat — press Talk to Maya to try again.",
  transcription:
    "I couldn't transcribe that clearly. Press Talk to Maya and try once more, or keep typing below.",
  playback:
    "Your browser held the audio back. Press Play reply to hear Maya — her answer is also in the conversation below.",
};

function reducer(state: VoiceState, action: VoiceAction): VoiceState {
  switch (action.type) {
    case "listening":
      return { ...state, phase: "listening", interim: "", message: "", blockedAudioUrl: null };
    case "interim":
      return state.phase === "listening" ? { ...state, interim: action.text } : state;
    case "transcribing":
      return { ...state, phase: "transcribing", interim: "" };
    case "speaking":
      return { ...state, phase: "speaking", message: "", blockedAudioUrl: null };
    case "idle":
      return { ...state, phase: "idle", interim: "", blockedAudioUrl: null };
    case "unsupported":
      return { ...state, phase: "unsupported" };
    case "permission-denied":
      return { ...state, phase: "permission-denied", message: messageFor.permission };
    case "error":
      return {
        ...state,
        phase: "error",
        message: messageFor[action.cause],
        blockedAudioUrl: action.blockedAudioUrl ?? null,
      };
    default:
      return state;
  }
}

/* Minimal structural typing — the DOM lib does not ship these everywhere. */
type RecognitionEventLike = {
  results: ArrayLike<ArrayLike<{ transcript: string }> & { isFinal: boolean }>;
};
type RecognitionErrorLike = { error: string };
type RecognitionLike = {
  lang: string;
  continuous: boolean;
  interimResults: boolean;
  start(): void;
  stop(): void;
  abort(): void;
  onresult: ((event: RecognitionEventLike) => void) | null;
  onerror: ((event: RecognitionErrorLike) => void) | null;
  onend: (() => void) | null;
};
type RecognitionCtor = new () => RecognitionLike;

function recognitionCtor(): RecognitionCtor | null {
  if (typeof window === "undefined") return null;
  const w = window as unknown as {
    SpeechRecognition?: RecognitionCtor;
    webkitSpeechRecognition?: RecognitionCtor;
  };
  return w.SpeechRecognition || w.webkitSpeechRecognition || null;
}

export type MayaVoice = {
  phase: VoicePhase;
  interim: string;
  message: string;
  blockedAudioUrl: string | null;
  /** Press the control: start listening, hand over mid-thought, or stop. */
  toggle: () => void;
  /** Stop recognition and audio cleanly (panel close, escape, unmount). */
  stopAll: () => void;
  /** Have Maya speak a reply produced by the shared chat flow. */
  speakReply: (text: string) => Promise<void>;
};

export function useMayaVoice(options: {
  onTranscript: (text: string) => void;
}): MayaVoice {
  const { onTranscript } = options;

  const [state, dispatch] = useReducer(reducer, {
    phase: "idle",
    interim: "",
    message: "",
    blockedAudioUrl: null,
  } satisfies VoiceState);

  const recognitionRef = useRef<RecognitionLike | null>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const blobUrlRef = useRef<string | null>(null);
  const finalTextRef = useRef("");
  const phaseRef = useRef<VoicePhase>(state.phase);

  useEffect(() => {
    phaseRef.current = state.phase;
  }, [state.phase]);

  const onTranscriptRef = useRef(onTranscript);
  useEffect(() => {
    onTranscriptRef.current = onTranscript;
  }, [onTranscript]);

  /* One audio element for the whole assistant lifetime, created up front
     so the autoplay unlock can work on the same instance. */
  useEffect(() => {
    audioRef.current = new Audio();
    const audio = audioRef.current;
    return () => {
      audio.pause();
      audio.removeAttribute("src");
      audioRef.current = null;
    };
  }, []);

  const releaseAudio = useCallback(() => {
    const audio = audioRef.current;
    if (audio) {
      audio.pause();
      audio.removeAttribute("src");
    }
    if (blobUrlRef.current) {
      URL.revokeObjectURL(blobUrlRef.current);
      blobUrlRef.current = null;
    }
  }, []);

  const stopAll = useCallback(() => {
    try {
      recognitionRef.current?.stop();
    } catch {
      /* recognition may already be stopped */
    }
    releaseAudio();
  }, [releaseAudio]);

  const listen = useCallback(() => {
    const Recognition = recognitionCtor();
    if (!Recognition) {
      dispatch({ type: "unsupported" });
      return;
    }

    releaseAudio();
    finalTextRef.current = "";

    const recognition = new Recognition();
    recognitionRef.current = recognition;
    recognition.lang = navigator.language || "en";
    recognition.continuous = false;
    recognition.interimResults = true;

    recognition.onresult = (event) => {
      let interim = "";
      let final = "";
      for (let i = 0; i < event.results.length; i += 1) {
        const result = event.results[i];
        const text = result[0]?.transcript ?? "";
        if (result.isFinal) final += text;
        else interim += text;
      }
      if (final) finalTextRef.current = final.trim();
      else dispatch({ type: "interim", text: interim.trim() });
    };

    recognition.onerror = (event) => {
      const cause = event.error;
      if (cause === "not-allowed" || cause === "service-not-allowed") {
        dispatch({ type: "permission-denied" });
      } else if (cause === "audio-capture") {
        dispatch({ type: "error", cause: "microphone" });
      } else if (cause === "no-speech") {
        dispatch({ type: "error", cause: "no-speech" });
      } else if (cause === "network") {
        dispatch({ type: "error", cause: "network" });
      } else {
        dispatch({ type: "error", cause: "transcription" });
      }
    };

    recognition.onend = () => {
      recognitionRef.current = null;
      if (finalTextRef.current) {
        dispatch({ type: "transcribing" });
        onTranscriptRef.current(finalTextRef.current);
      } else if (phaseRef.current === "listening") {
        dispatch({ type: "idle" });
      }
    };

    dispatch({ type: "listening" });
    try {
      recognition.start();
    } catch {
      dispatch({ type: "error", cause: "transcription" });
    }
  }, [releaseAudio]);

  const toggle = useCallback(() => {
    /* Interrupt: stop Maya mid-sentence and take the microphone. */
    if (phaseRef.current === "speaking") releaseAudio();

    if (phaseRef.current === "listening") {
      try {
        recognitionRef.current?.stop();
      } catch {
        /* already stopped */
      }
      return;
    }
    listen();
  }, [listen, releaseAudio]);

  const speakReply = useCallback(
    async (text: string) => {
      const trimmed = text.trim();
      if (!trimmed) return;

      releaseAudio();
      dispatch({ type: "speaking" });

      try {
        const response = await fetch("/api/maya/speech", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ text: trimmed }),
        });

        if (!response.ok) {
          dispatch({ type: "error", cause: "api" });
          return;
        }

        const blob = await response.blob();
        const url = URL.createObjectURL(blob);
        blobUrlRef.current = url;

        const audio = audioRef.current;
        if (!audio) {
          dispatch({ type: "error", cause: "api" });
          return;
        }
        audio.src = url;
        audio.onended = () => dispatch({ type: "idle" });

        const playback = audio.play();
        if (playback) {
          playback.catch(() => {
            dispatch({ type: "error", cause: "playback", blockedAudioUrl: url });
          });
        }
      } catch {
        dispatch({ type: "error", cause: "api" });
      }
    },
    [releaseAudio]
  );

  /* Autoplay unlock: within the visitor's own pointer press, play the
     element once, muted. iOS/Safari then allow the later programmatic
     playback of Maya's reply. */
  useEffect(() => {
    const unlock = () => {
      const audio = audioRef.current;
      if (!audio) return;
      audio.muted = true;
      audio
        .play()
        .then(() => {
          audio.pause();
          audio.muted = false;
        })
        .catch(() => {
          audio.muted = false;
        });
    };
    window.addEventListener("pointerdown", unlock, { once: true });
    return () => window.removeEventListener("pointerdown", unlock);
  }, []);

  /* No dangling recognition or audio when the panel goes away. */
  useEffect(() => stopAll, [stopAll]);

  return {
    phase: state.phase,
    interim: state.interim,
    message: state.message,
    blockedAudioUrl: state.blockedAudioUrl,
    toggle,
    stopAll,
    speakReply,
  };
}
