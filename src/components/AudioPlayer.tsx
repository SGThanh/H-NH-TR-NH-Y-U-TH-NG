import { Music, Volume2, VolumeX, Sparkles } from 'lucide-react';
import React, { useEffect, useRef, useState } from 'react';

export const AudioPlayer: React.FC = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioCtxRef = useRef<AudioContext | null>(null);
  const timerRef = useRef<number | null>(null);
  const isPlayingRef = useRef(false);

  // Traditional Vietnamese Pentatonic royal chord progression (Hò Xự Xang Xê Cống inspired)
  // Gentle, soothing Asian harp/zither tone ambiance
  const chordNotes = [
    // Royal court pentatonic melody (D4, F#4, A4, B4, D5)
    [293.66, 369.99, 440.00, 493.88, 587.33],
    // Harmonious gentle flow (G3, B3, D4, E4, G4)
    [196.00, 246.94, 293.66, 329.63, 392.00],
    // Silk resonance (A3, C#4, E4, F#4, A4)
    [220.00, 277.18, 329.63, 369.99, 440.00],
    // Golden peace (D3, A3, D4, F#4, A4)
    [146.83, 220.00, 293.66, 369.99, 440.00],
  ];

  const playNote = (ctx: AudioContext, freq: number, startTime: number, duration: number) => {
    try {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      // Warm tone using sine + gentle triangle harmonic
      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, startTime);

      // Delicate envelope (gentle attack, soft decay)
      gain.gain.setValueAtTime(0.0001, startTime);
      gain.gain.exponentialRampToValueAtTime(0.035, startTime + 0.14);
      gain.gain.exponentialRampToValueAtTime(0.012, startTime + duration * 0.45);
      gain.gain.exponentialRampToValueAtTime(0.0001, startTime + duration);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(startTime);
      osc.stop(startTime + duration);
    } catch {
      // AudioContext catch
    }
  };

  const scheduleMusicSequence = () => {
    if (!audioCtxRef.current || !isPlayingRef.current) return;
    const ctx = audioCtxRef.current;
    let step = 0;

    const playLoop = () => {
      if (!isPlayingRef.current || !audioCtxRef.current) return;
      const currentCtx = audioCtxRef.current;
      const currentChord = chordNotes[step % chordNotes.length];

      // Arpeggiate chord notes smoothly like traditional đàn tranh / harp
      currentChord.forEach((freq, idx) => {
        const noteStart = currentCtx.currentTime + idx * 0.42;
        playNote(currentCtx, freq, noteStart, 2.4);
      });

      step++;
      timerRef.current = window.setTimeout(playLoop, 2400);
    };

    playLoop();
  };

  const toggleMusic = async () => {
    if (!isPlaying) {
      try {
        if (!audioCtxRef.current) {
          const AudioContextClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
          audioCtxRef.current = new AudioContextClass();
        }
        if (audioCtxRef.current.state === 'suspended') {
          await audioCtxRef.current.resume();
        }
        isPlayingRef.current = true;
        setIsPlaying(true);
        scheduleMusicSequence();
      } catch (err) {
        console.error('Audio initialization error:', err);
      }
    } else {
      isPlayingRef.current = false;
      setIsPlaying(false);
      if (timerRef.current) {
        clearTimeout(timerRef.current);
        timerRef.current = null;
      }
    }
  };

  useEffect(() => {
    return () => {
      isPlayingRef.current = false;
      if (timerRef.current) clearTimeout(timerRef.current);
      if (audioCtxRef.current && audioCtxRef.current.state !== 'closed') {
        audioCtxRef.current.close().catch(() => {});
      }
    };
  }, []);

  return (
    <div className="fixed bottom-6 right-6 z-40">
      <button
        id="toggle-romantic-music-btn"
        onClick={toggleMusic}
        type="button"
        className={`group flex items-center gap-2.5 px-4 py-2.5 rounded-full backdrop-blur-md transition-all duration-300 shadow-lg border ${
          isPlaying
            ? 'bg-[#8C1D2F] text-[#FAF2DC] border-[#D4AF37] shadow-[#8C1D2F]/30 ring-2 ring-[#D4AF37]/30'
            : 'bg-white/90 text-[#544A42] border-[#D4AF37]/60 hover:bg-[#FAF4EC] hover:text-[#8C1D2F]'
        }`}
        title={isPlaying ? 'Tắt nhã nhạc du dương' : 'Bật nhã nhạc hoàng gia du dương kỷ niệm'}
      >
        <div className="relative flex items-center justify-center w-5 h-5">
          {isPlaying ? (
            <div className="flex items-end gap-[3px] h-3.5">
              <span className="w-1 bg-[#FFD700] rounded-full animate-bounce [animation-delay:0ms] h-3"></span>
              <span className="w-1 bg-[#FFD700] rounded-full animate-bounce [animation-delay:180ms] h-2"></span>
              <span className="w-1 bg-[#FFD700] rounded-full animate-bounce [animation-delay:360ms] h-3.5"></span>
            </div>
          ) : (
            <Music className="w-4 h-4 text-[#8C1D2F]" />
          )}
        </div>

        <span className="text-xs tracking-wider font-semibold">
          {isPlaying ? 'Nhã Nhạc Tình Duyên' : 'Bật Nhã Nhạc Kỷ Niệm'}
        </span>

        {isPlaying ? (
          <Volume2 className="w-3.5 h-3.5 text-[#FFD700]" />
        ) : (
          <VolumeX className="w-3.5 h-3.5 opacity-60" />
        )}
      </button>
    </div>
  );
};
