
import React, { useState, useEffect } from 'react';
import { MEMORY_SYMBOLS } from '../constants';
import { CardState } from '../types';

interface Props {
  name: string;
}

const MemoryGame: React.FC<Props> = ({ name }) => {
  const [cards, setCards] = useState<CardState[]>([]);
  const [flippedCards, setFlippedCards] = useState<number[]>([]);
  const [moves, setMoves] = useState(0);
  const [isWon, setIsWon] = useState(false);

  const initGame = () => {
    const deck = [...MEMORY_SYMBOLS, ...MEMORY_SYMBOLS]
      .sort(() => Math.random() - 0.5)
      .map((symbol, index) => ({
        id: index,
        symbol,
        isFlipped: false,
        isMatched: false,
      }));
    setCards(deck);
    setFlippedCards([]);
    setMoves(0);
    setIsWon(false);
  };

  useEffect(() => {
    initGame();
  }, []);

  const handleCardClick = (id: number) => {
    if (flippedCards.length === 2 || cards[id].isFlipped || cards[id].isMatched) return;

    const newCards = [...cards];
    newCards[id].isFlipped = true;
    setCards(newCards);

    const newFlipped = [...flippedCards, id];
    setFlippedCards(newFlipped);

    if (newFlipped.length === 2) {
      setMoves(moves + 1);
      const [first, second] = newFlipped;
      if (cards[first].symbol === cards[second].symbol) {
        newCards[first].isMatched = true;
        newCards[second].isMatched = true;
        setCards(newCards);
        setFlippedCards([]);
        if (newCards.every(c => c.isMatched)) setIsWon(true);
      } else {
        setTimeout(() => {
          newCards[first].isFlipped = false;
          newCards[second].isFlipped = false;
          setCards(newCards);
          setFlippedCards([]);
        }, 800);
      }
    }
  };

  return (
    <div className="bg-pink-900/10 p-4 sm:p-8 rounded-2xl border border-pink-200/5 backdrop-blur-md">
      <div className="flex justify-between items-center mb-6">
        <span className="text-pink-200/60 font-serif-elegant italic text-sm">步数: {moves}</span>
        {isWon && <span className="text-pink-400 font-bold animate-pulse text-sm">🎉 太棒了，{name}!</span>}
        <button onClick={initGame} className="text-[10px] px-3 py-1.5 border border-pink-400/30 rounded-full hover:bg-pink-400/10 active:scale-95 transition-all">重新开始</button>
      </div>

      <div className="grid grid-cols-4 gap-2 sm:gap-4">
        {cards.map(card => (
          <div
            key={card.id}
            onClick={() => handleCardClick(card.id)}
            className={`aspect-square cursor-pointer transition-all duration-500 [transform-style:preserve-3d] ${card.isFlipped || card.isMatched ? '[transform:rotateY(180deg)]' : ''}`}
          >
            <div className="absolute inset-0 bg-pink-800/10 rounded-lg border border-pink-200/5 flex items-center justify-center [backface-visibility:hidden]">
              <div className="w-4 h-4 rounded-full border border-pink-400/10" />
            </div>
            <div className={`absolute inset-0 ${card.isMatched ? 'bg-pink-500/20' : 'bg-pink-500/40'} rounded-lg border border-pink-400/40 flex items-center justify-center [backface-visibility:hidden] [transform:rotateY(180deg)] text-2xl sm:text-3xl`}>
              {card.symbol}
            </div>
          </div>
        ))}
      </div>
      <p className="mt-6 text-center text-[10px] text-pink-200/30 italic">翻开所有匹配的印记，收藏你的幸运</p>
    </div>
  );
};

export default MemoryGame;
