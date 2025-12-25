
import React, { useRef } from 'react';

interface Props {
  name: string;
}

const LoveCardGenerator: React.FC<Props> = ({ name }) => {
  const cardRef = useRef<HTMLDivElement>(null);

  const downloadCard = () => {
    window.print();
  };

  return (
    <div className="flex flex-col items-center group w-full px-2">
      <div 
        ref={cardRef}
        className="card-container w-full max-w-[340px] sm:max-w-sm p-6 sm:p-10 bg-white text-gray-800 rounded-2xl sm:rounded-3xl shadow-2xl space-y-6 sm:space-y-8 relative overflow-hidden transition-all duration-700"
        style={{
          background: 'linear-gradient(135deg, #fffafa 0%, #ffffff 100%)',
        }}
      >
        <div className="absolute top-0 right-0 w-24 h-24 bg-pink-100/40 rounded-bl-[80px] pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-32 h-32 bg-pink-50/40 rounded-tr-[100px] pointer-events-none" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-pink-50/20 text-6xl sm:text-8xl font-romantic pointer-events-none select-none">2025</div>
        
        <div className="relative z-10 border border-pink-200/50 p-6 sm:p-8 rounded-xl sm:rounded-2xl space-y-4 sm:space-y-6">
          <div className="text-center space-y-1">
            <h3 className="text-2xl sm:text-3xl font-romantic text-pink-600">致最爱的 {name}</h3>
            <div className="text-[9px] tracking-[0.2em] uppercase text-pink-300 font-bold">Christmas Edition · 2025</div>
          </div>
          
          <div className="h-px bg-gradient-to-r from-transparent via-pink-200 to-transparent w-full" />
          
          <p className="text-sm sm:text-base font-serif-elegant italic leading-relaxed text-gray-700 text-center px-1">
            “走过 2024，迎来 2025，我庆幸每一个重要的时刻都有你在身边。你是我生命中最温柔的底色。”
          </p>
          
          <div className="flex justify-between items-end pt-6">
            <div className="space-y-1">
                <div className="text-[8px] text-pink-300 uppercase">Created On</div>
                <div className="text-[10px] font-serif-elegant font-bold text-gray-400">
                  {new Date().toLocaleDateString()}
                </div>
            </div>
            <div className="text-right">
              <p className="text-[8px] uppercase tracking-tight text-gray-400 mb-0.5">With My Love</p>
              <p className="font-romantic text-xl sm:text-2xl text-pink-500 leading-none">Forever Yours</p>
            </div>
          </div>
        </div>
      </div>
      
      <div className="mt-10 space-y-4 text-center">
          <button 
            onClick={downloadCard}
            className="w-full sm:w-auto px-8 py-3 bg-pink-600 text-white rounded-xl text-[10px] font-bold tracking-[0.2em] uppercase transition-all shadow-lg active:scale-95"
          >
            打印 / 下载 2025 心意
          </button>
          <p className="text-[10px] text-pink-200/40 font-serif-elegant italic">手机端建议长按截图保存这份浪漫</p>
      </div>
    </div>
  );
};

export default LoveCardGenerator;
