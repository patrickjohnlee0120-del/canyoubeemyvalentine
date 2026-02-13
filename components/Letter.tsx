
import React, { useState, useEffect } from 'react';
import { playSound } from '../utils/sounds';

const Letter: React.FC = () => {
  const [typedText, setTypedText] = useState('');
  const fullText = "My dearest, Angelica\n\nFrom the moment I met you, my world became brighter, and happier. Thank you for making me the luckiest and happiest person. I love you so much forever\n\nForever yours\nBebubooboobear";

  useEffect(() => {
    let i = 0;
    const interval = setInterval(() => {
      setTypedText(fullText.slice(0, i));
      i++;
      if (i > fullText.length) {
        clearInterval(interval);
        playSound('ding');
      }
    }, 45);

    return () => {
      clearInterval(interval);
    };
  }, []);

  return (
    <div className="relative w-full max-w-[360px] animate-fade-in-up">
      <div className="bg-white p-8 rounded-lg shadow-2xl border-t-4 border-rose-300 transform rotate-1">
        <div className="w-full h-full min-h-[360px] border border-pink-50 p-4 bg-[radial-gradient(#fff1f2_1px,transparent_1px)] [background-size:24px_24px]">
          <p className="font-pacifico text-rose-500 text-xl md:text-2xl whitespace-pre-wrap leading-relaxed">
            {typedText}
          </p>
        </div>
      </div>
      <style>{`
        @keyframes fade-in-up {
          0% { opacity: 0; transform: translateY(20px) rotate(0deg); }
          100% { opacity: 1; transform: translateY(0) rotate(1deg); }
        }
        .animate-fade-in-up {
          animation: fade-in-up 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }
      `}</style>
    </div>
  );
};

export default Letter;
