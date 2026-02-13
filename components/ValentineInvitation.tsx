
import React, { useState } from 'react';
import NoButton from './NoButton';

interface ValentineInvitationProps {
  onAccept: () => void;
}

const ValentineInvitation: React.FC<ValentineInvitationProps> = ({ onAccept }) => {
  const [isExiting, setIsExiting] = useState(false);

  const handleAccept = () => {
    setIsExiting(true);
    setTimeout(onAccept, 500);
  };

  return (
    <div className={`flex flex-col items-center justify-center text-center transition-all duration-500 w-full max-w-[390px] ${isExiting ? 'opacity-0 scale-95 pointer-events-none' : 'opacity-100 scale-100'}`}>
      <div className="mb-10 w-full">
        <h1 className="text-4xl md:text-6xl font-pacifico text-rose-500 mb-4 px-2 leading-tight">
          Will you be my Valentine?
        </h1>
        <div className="text-2xl animate-pulse">💖✨</div>
      </div>

      <div className="flex flex-col gap-6 items-center w-full min-h-[140px] relative">
        <button
          onClick={handleAccept}
          className="w-full max-w-[200px] h-[56px] bg-rose-400 text-white rounded-full text-xl font-bold shadow-lg transform hover:scale-105 active:scale-95 transition-all flex items-center justify-center z-10"
        >
          Yes 💖
        </button>

        <NoButton onAccept={handleAccept} />
      </div>
    </div>
  );
};

export default ValentineInvitation;
