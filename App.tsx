
import React, { useState, useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import IntroOverlay from './components/IntroOverlay';
import FloatingParticles from './components/FloatingParticles';
import TypewriterHero from './components/TypewriterHero';
import SurpriseCards from './components/SurpriseCards';
import LoveCardGenerator from './components/LoveCardGenerator';
import MemoryGame from './components/MemoryGame';
import MusicPlayer from './components/MusicPlayer';
import ChristmasTree from './components/ChristmasTree';

gsap.registerPlugin(ScrollTrigger);

const App: React.FC = () => {
  const [userName, setUserName] = useState<string>('');
  const [isStarted, setIsStarted] = useState<boolean>(false);
  const mainRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isStarted && mainRef.current) {
      gsap.fromTo(mainRef.current, 
        { opacity: 0, y: 30 }, 
        { opacity: 1, y: 0, duration: 2, ease: 'power3.out' }
      );
    }
  }, [isStarted]);

  const handleStart = (name: string) => {
    setUserName(name || '亲爱的');
    setIsStarted(true);
  };

  return (
    <div className="relative min-h-screen text-white selection:bg-pink-400 selection:text-white bg-[#050208] overflow-x-hidden">
      <FloatingParticles />
      <MusicPlayer />
      
      {!isStarted && <IntroOverlay onStart={handleStart} />}

      {isStarted && (
        <main ref={mainRef} className="relative z-10 w-full px-4 pt-6 pb-20 flex flex-col items-center">
          {/* 2025 Christmas Badge */}
          <div className="group mb-6 px-5 py-2 bg-white/5 backdrop-blur-3xl rounded-full border border-pink-500/20 text-[10px] sm:text-[11px] tracking-[0.4em] sm:tracking-[0.6em] uppercase text-pink-100 shadow-[0_0_30px_rgba(255,182,203,0.2)] animate-pulse transition-all duration-700">
            ✨ Exclusive for {userName} · Christmas 2025 ✨
          </div>

          <TypewriterHero name={userName} />

          {/* 核心：圣诞树 - 移动端适配容器 */}
          <div className="w-full flex justify-center -mt-10 mb-12 relative scale-90 sm:scale-100">
             <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[280px] sm:w-[500px] h-[280px] sm:h-[500px] bg-pink-500/10 blur-[100px] sm:blur-[150px] rounded-full pointer-events-none" />
            <ChristmasTree />
          </div>
          
          <section className="w-full max-w-lg mt-20 relative px-2">
            <div className="absolute -top-12 left-1/2 -translate-x-1/2 flex items-center gap-4 text-pink-300/30">
               <span className="h-px w-12 sm:w-24 bg-gradient-to-r from-transparent via-pink-300/40 to-transparent" />
               <span className="text-xl sm:text-2xl italic font-romantic tracking-widest">Secret Letter</span>
               <span className="h-px w-12 sm:w-24 bg-gradient-to-l from-transparent via-pink-300/40 to-transparent" />
            </div>
            <h2 className="text-4xl sm:text-5xl font-romantic text-center mb-10 text-white drop-shadow-[0_0_15px_rgba(255,192,203,0.5)]">
              致你的圣诞告白
            </h2>
            <SurpriseCards name={userName} />
          </section>

          <section className="w-full max-w-lg mt-32 sm:mt-48 px-2">
            <div className="text-center mb-12 space-y-4">
                <div className="text-pink-300/50 text-[9px] tracking-[0.6em] uppercase">Interactive Moments</div>
                <h2 className="text-3xl sm:text-4xl font-serif-elegant italic text-pink-100/90">
                  冬日温暖 · 记忆拼图
                </h2>
                <div className="h-px w-12 bg-pink-500/40 mx-auto" />
                <p className="text-pink-200/40 text-sm font-light italic px-4">翻开那些属于我们 2025 的微光瞬间</p>
            </div>
            <MemoryGame name={userName} />
          </section>

          <section className="w-full max-w-lg mt-32 sm:mt-48 relative px-2">
            <h2 className="text-3xl sm:text-4xl font-romantic text-center mb-16 text-white/90">
              永久留存的浪漫
            </h2>
            <LoveCardGenerator name={userName} />
          </section>

          <footer className="mt-40 sm:mt-60 w-full max-w-xl mx-auto text-center space-y-10 px-4">
            <div className="relative">
                <div className="absolute inset-0 flex items-center" aria-hidden="true">
                    <div className="w-full border-t border-white/5"></div>
                </div>
                <div className="relative flex justify-center">
                    <span className="bg-[#050208] px-6 text-2xl text-pink-300/50 animate-bounce">❄️</span>
                </div>
            </div>
            
            <div className="space-y-6">
              <p className="text-pink-100/90 font-romantic text-2xl sm:text-3xl leading-relaxed">
                “遇见你，是 2025 也是我一生中最完美的奇迹。”
              </p>
              <div className="h-0.5 w-16 bg-gradient-to-r from-transparent via-pink-500/40 to-transparent mx-auto" />
              <p className="text-pink-100/20 text-[10px] font-serif-elegant tracking-[0.4em] uppercase">
                 Eternity in my heart · 2025 Christmas
              </p>
            </div>
            
            <div className="pt-6">
                <button 
                  onClick={() => alert('按下收藏夹图标或 Ctrl+D 即可将 2025 的这份心意永久收藏 ~')}
                  className="group relative w-full sm:w-auto px-10 py-4 bg-white/5 border border-pink-500/20 rounded-2xl hover:bg-pink-500/10 transition-all duration-700 text-[10px] font-bold tracking-[0.5em] uppercase shadow-[0_0_40px_rgba(219,39,119,0.1)] overflow-hidden"
                >
                  <span className="relative z-10 text-pink-100 group-hover:text-white transition-all duration-700">收藏 2025 独家浪漫</span>
                  <div className="absolute inset-0 bg-gradient-to-r from-pink-500/0 via-pink-500/20 to-pink-500/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1500" />
                </button>
            </div>
          </footer>
        </main>
      )}
    </div>
  );
};

export default App;
