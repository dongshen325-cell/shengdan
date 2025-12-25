
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
      .to(overlayRef.current, { opacity: 0, duration: 1, ease: 'power2.inOut', display: 'none' });
  };

  return (
    <div ref={overlayRef} className="fixed inset-0 z-[100] flex items-center justify-center bg-[#07040d] px-6">
      <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-20">
        <div className="absolute top-10 right-10 animate-pulse">
            <svg width="80" height="80" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="0.5">
                <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" />
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
        <p className="text-pink-200/50 mb-10 font-serif-elegant italic text-base">
            在这 2025 的冬日，开启这份专属浪漫
        </p>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder="输入你的名字..."
            className="w-full bg-white/5 backdrop-blur-2xl border border-white/10 px-6 py-4 text-xl text-center focus:outline-none focus:border-pink-400 transition-all rounded-2xl placeholder:text-pink-100/10"
            autoFocus
          />
          <button
            type="submit"
            className="w-full px-10 py-4 font-bold tracking-[0.2em] text-white bg-pink-600 rounded-xl hover:bg-pink-500 shadow-xl transition-all active:scale-95"
          >
            开启 2025 惊喜
          </button>
        </form>
      </div>
    </div>
  );
};

export default IntroOverlay;
