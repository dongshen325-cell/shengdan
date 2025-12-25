
import React, { useEffect, useState } from 'react';

interface Props {
  name: string;
}

const TypewriterHero: React.FC<Props> = ({ name }) => {
  const [displayText, setDisplayText] = useState('');
  const fullText = `致 ${name}：`;
  const [subText, setSubText] = useState('');
  const fullSubText = "在这繁华世界，万千美景，都不及你眼中的星光。";

  useEffect(() => {
    let i = 0;
    const timer = setInterval(() => {
      setDisplayText(fullText.substring(0, i));
      i++;
      if (i > fullText.length) {
        clearInterval(timer);
        startSubText();
      }
    }, 150);

    return () => clearInterval(timer);
  }, [name]);

  const startSubText = () => {
    let j = 0;
    const timer = setInterval(() => {
      setSubText(fullSubText.substring(0, j));
      j++;
      if (j > fullSubText.length) clearInterval(timer);
    }, 100);
  };

  return (
    <div className="text-center py-10 sm:py-20 space-y-6 sm:space-y-8 px-4">
      <h1 className="text-4xl sm:text-6xl md:text-7xl font-romantic text-pink-200 min-h-[1.2em] drop-shadow-lg">
        {displayText}<span className="animate-pulse">|</span>
      </h1>
      <p className="text-base sm:text-xl md:text-2xl text-pink-100/70 font-serif-elegant italic max-w-lg mx-auto leading-relaxed opacity-80">
        {subText}
      </p>
      
      <div className="flex justify-center pt-4 sm:pt-8">
        <div className="w-8 h-8 sm:w-10 sm:h-10 border-b-2 border-r-2 border-pink-200/20 rotate-45 animate-bounce" />
      </div>
    </div>
  );
};

export default TypewriterHero;
