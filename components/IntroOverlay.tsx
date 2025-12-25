
import React, { useState, useEffect, useRef } from 'react';
import { gsap } from 'gsap';

interface Props {
  onStart: (name: string) => void;
}

const IntroOverlay: React.FC<Props> = ({ onStart }) => {
  const [inputValue, setInputValue] = useState('');
  const overlayRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.fromTo(contentRef.current, 
      { opacity: 0, scale: 0.95, filter: 'blur(8px)' }, 
      { opacity: 1, scale: 1, filter: 'blur(0px)', duration: 1.5, ease: 'power2.out' }
    );
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputValue.trim()) return;

    const tl = gsap.timeline({
      onComplete: () => onStart(inputValue)
    });

    tl.to(contentRef.current, { opacity: 0, scale: 1.05, filter: 'blur(10px)', duration: 0.8, ease: 'power2.in' })
      .to(overlayRef.current, { opacity: 0, duration: 1, ease: 'power2.inOut' });
  };

  return (
    <div ref={overlayRef} className="fixed inset-0 z-50 flex items-center justify-center bg-[#07040d] px-6">
      <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-20">
        <div className="absolute top-10 right-10 animate-pulse">
            <svg width="80" height="80" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="0.5">
                <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" />
            </svg>
        </div>
        <div className="absolute bottom-10 left-10 opacity-10">
             <svg width="150" height="150" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="0.2">
                <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" />
                <path d="M12 2V22" /><path d="M2 12H22" /><path d="M4.93 4.93L19.07 19.07" /><path d="M19.07 4.93L4.93 19.07" />
            </svg>
        </div>
      </div>

      <div ref={contentRef} className="relative z-10 text-center w-full max-w-sm">
        <div className="mb-6 inline-block px-4 py-1.5 rounded-full bg-pink-500/10 text-pink-200 text-[10px] tracking-[0.3em] font-serif-elegant border border-pink-500/20 shadow-lg">
            CHRISTMAS EDITION · 2025
        </div>
        <h1 className="text-4xl sm:text-6xl font-romantic text-pink-100 mb-6 drop-shadow-xl">
          Merry Christmas
        </h1>
        <p className="text-pink-200/50 mb-10 font-serif-elegant italic text-base sm:text-lg">
            在这个 2025 的冬日，有一份心意只想送给你
        </p>
        
        <form onSubmit={handleSubmit} className="space-y-8">
          <div className="relative group">
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder="你的名字..."
              className="w-full bg-white/5 backdrop-blur-2xl border border-white/10 px-6 py-4 text-xl text-center focus:outline-none focus:border-pink-400 transition-all rounded-2xl placeholder:text-pink-100/10 font-light"
              autoFocus
            />
            <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1/4 h-px bg-pink-400 group-focus-within:w-full transition-all duration-700" />
          </div>
          
          <button
            type="submit"
            className="group relative w-full inline-flex items-center justify-center px-10 py-4 font-bold tracking-[0.2em] text-white transition duration-500 bg-pink-600 rounded-xl hover:bg-pink-500 shadow-xl overflow-hidden"
          >
            <span className="relative z-10">开启 2025 惊喜</span>
            <div className="absolute inset-0 bg-gradient-to-r from-pink-500 to-purple-600 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          </button>
        </form>
        
        <div className="mt-12 flex justify-center gap-6 text-pink-100/20 text-xl animate-pulse">
            <span>❄️</span><span>🎁</span><span>✨</span>
        </div>
      </div>
    </div>
  );
};

export default IntroOverlay;
