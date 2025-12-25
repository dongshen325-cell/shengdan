
import React, { useState, useEffect, useRef } from 'react';

const MusicPlayer: React.FC = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);

  const togglePlay = () => {
    if (!audioRef.current) return;
    
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play().catch(e => console.log('Audio play failed:', e));
    }
    setIsPlaying(!isPlaying);
    localStorage.setItem('romantic_music_muted', (!isPlaying).toString());
  };

  return (
    <div className="fixed top-4 right-4 sm:top-8 sm:right-8 z-[60]">
      <div className="relative group cursor-pointer no-select" onClick={togglePlay}>
        <div className={`absolute -inset-4 rounded-full bg-gradient-to-r from-pink-500/0 via-pink-400/20 to-purple-500/0 blur-2xl transition-opacity duration-1000 ${isPlaying ? 'opacity-100 animate-pulse-slow' : 'opacity-0'}`} />
        
        <div className={`relative w-12 h-12 sm:w-16 sm:h-16 rounded-full border border-white/20 backdrop-blur-3xl flex items-center justify-center transition-all duration-700 ${isPlaying ? 'bg-white/10 shadow-lg' : 'bg-black/40 hover:bg-white/5'}`}>
          
          {isPlaying ? (
            <div className="flex items-end gap-1 h-4 sm:h-6">
               <div className="w-[1.5px] sm:w-[2px] bg-pink-300 animate-bar-1 rounded-full" />
               <div className="w-[1.5px] sm:w-[2px] bg-white animate-bar-2 rounded-full" />
               <div className="w-[1.5px] sm:w-[2px] bg-pink-200 animate-bar-3 rounded-full" />
               <div className="w-[1.5px] sm:w-[2px] bg-white animate-bar-4 rounded-full" />
            </div>
          ) : (
            <div className="text-pink-100/40">
              <svg className="w-6 h-6 sm:w-8 sm:h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
          )}
          
          <div className="absolute -top-0.5 -right-0.5 text-sm sm:text-lg">❄️</div>
        </div>
      </div>
      
      <audio 
        ref={audioRef} 
        loop 
        src="https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3" 
      />

      <style>{`
        @keyframes music-bar {
          0%, 100% { height: 4px; }
          50% { height: 20px; }
        }
        @keyframes pulse-slow {
          0%, 100% { opacity: 0.3; transform: scale(1); }
          50% { opacity: 0.6; transform: scale(1.1); }
        }
        .animate-bar-1 { animation: music-bar 1.4s ease-in-out infinite; }
        .animate-bar-2 { animation: music-bar 1s ease-in-out infinite; }
        .animate-bar-3 { animation: music-bar 1.7s ease-in-out infinite; }
        .animate-bar-4 { animation: music-bar 1.3s ease-in-out infinite; }
        .animate-pulse-slow { animation: pulse-slow 4s ease-in-out infinite; }
      `}</style>
    </div>
  );
};

export default MusicPlayer;
