
import React, { useState } from 'react';
import { gsap } from 'gsap';
import { ROMANTIC_QUOTES } from '../constants';

interface Props {
  name: string;
}

const SurpriseCards: React.FC<Props> = ({ name }) => {
  const [currentQuote, setCurrentQuote] = useState(ROMANTIC_QUOTES[0].replace('{name}', name));
  const [isAnimating, setIsAnimating] = useState(false);

  const handleNewQuote = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    
    gsap.to('.quote-text', {
      opacity: 0,
      y: 10,
      duration: 0.5,
      onComplete: () => {
        const randomIndex = Math.floor(Math.random() * ROMANTIC_QUOTES.length);
        setCurrentQuote(ROMANTIC_QUOTES[randomIndex].replace('{name}', name));
        gsap.to('.quote-text', { opacity: 1, y: 0, duration: 0.8, ease: 'power2.out' });
        setIsAnimating(false);
      }
    });

    // Simple confetti-like effect
    const button = document.getElementById('surprise-btn');
    if (button) {
      gsap.fromTo(button, { scale: 0.95 }, { scale: 1, duration: 0.3, ease: 'elastic.out' });
    }
  };

  return (
    <div className="relative group">
      <div className="absolute -inset-1 bg-gradient-to-r from-pink-600 to-purple-600 rounded-2xl blur opacity-25 group-hover:opacity-50 transition duration-1000 group-hover:duration-200"></div>
      <div className="relative flex flex-col items-center p-12 bg-[#1a1421] border border-pink-200/10 rounded-2xl shadow-2xl">
        <div className="mb-8 p-4 rounded-full bg-pink-500/10 text-pink-300">
          <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
          </svg>
        </div>
        
        <p className="quote-text text-xl md:text-2xl text-center leading-relaxed font-serif-elegant italic text-pink-50">
          “{currentQuote}”
        </p>
        
        <button
          id="surprise-btn"
          onClick={handleNewQuote}
          className="mt-12 px-8 py-3 bg-pink-500/20 hover:bg-pink-500/40 border border-pink-500/50 rounded-full transition-all duration-300 flex items-center gap-2 group/btn"
        >
          <span>再给我一个小惊喜</span>
          <span className="group-hover/btn:rotate-12 transition-transform">✨</span>
        </button>
      </div>
    </div>
  );
};

export default SurpriseCards;
