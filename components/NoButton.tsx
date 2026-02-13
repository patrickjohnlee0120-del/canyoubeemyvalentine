
import React, { useState, useCallback, useRef } from 'react';

interface NoButtonProps {
  onAccept: () => void;
}

const NoButton: React.FC<NoButtonProps> = ({ onAccept }) => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [attempts, setAttempts] = useState(0);
  const [teaseText, setTeaseText] = useState<string | null>(null);
  const [isTransformed, setIsTransformed] = useState(false);
  const buttonRef = useRef<HTMLButtonElement>(null);

  const escalatingMessages = [
    "Oops! I don’t think so 😜",
    "Wait… sure ka ba dyan bebi? 🥺",
    "Lahh… 💔",
    "Bebii?:(( 😢",
    "NOOOOOOO:(",
    "Fine, have it your way... ✨"
  ];

  const moveButton = useCallback(() => {
    if (isTransformed) return;

    const currentAttempt = attempts;
    
    // Update message
    setTeaseText(escalatingMessages[Math.min(currentAttempt, escalatingMessages.length - 1)]);
    
    // Check for transformation
    if (currentAttempt >= 5) {
      setIsTransformed(true);
      setPosition({ x: 0, y: 0 }); // Snap back to center
      return;
    }

    // Boundaries logic for 390px wide viewport
    const screenWidth = Math.min(window.innerWidth, 390);
    const screenHeight = Math.min(window.innerHeight, 844);
    
    const margin = 100; 
    const rangeX = (screenWidth / 2) - margin;
    const rangeY = (screenHeight / 4) - margin;

    // Ensure it's never perfectly at 0,0 during the game to keep it "moving"
    const randomX = (Math.random() - 0.5) * rangeX * 2;
    const randomY = (Math.random() - 0.5) * rangeY * 2;

    setPosition({ x: randomX, y: randomY });
    setAttempts((prev) => prev + 1);
  }, [attempts, isTransformed]);

  const handlePointerDown = (e: React.PointerEvent) => {
    if (isTransformed) {
      onAccept();
      return;
    }
    e.preventDefault();
    moveButton();
  };

  return (
    <div 
      className={`relative transition-all duration-700 ease-in-out z-50 flex items-center justify-center w-full pointer-events-none`}
      style={{ 
        transform: `translate(${position.x}px, ${position.y}px)`,
        marginTop: isTransformed ? '0' : '0' 
      }}
    >
      <div className="relative pointer-events-auto">
        {teaseText && !isTransformed && (
          <div className="absolute -top-12 left-1/2 -translate-x-1/2 whitespace-nowrap bg-white/95 backdrop-blur-sm px-4 py-2 rounded-2xl shadow-lg text-sm font-semibold text-rose-500 animate-message-pop border border-rose-100">
            {teaseText}
          </div>
        )}
        
        <button
          ref={buttonRef}
          onPointerDown={handlePointerDown}
          className={`w-[160px] h-[56px] rounded-full text-xl font-bold shadow-md transition-all flex items-center justify-center border-none outline-none ${
            isTransformed 
              ? 'bg-rose-400 text-white animate-heart-beat w-[200px]' 
              : 'bg-stone-200 text-stone-500 active:scale-95'
          }`}
          style={{
            transform: !isTransformed && attempts > 3 ? `scale(${Math.max(0.7, 1 - (attempts - 3) * 0.1)})` : 'scale(1)',
          }}
        >
          {isTransformed ? "Yes 💖" : "No 💔"}
        </button>
      </div>

      <style>{`
        @keyframes message-pop {
          0% { opacity: 0; transform: translate(-50%, 10px) scale(0.8); }
          20% { opacity: 1; transform: translate(-50%, -5px) scale(1.1); }
          40% { transform: translate(-50%, 0) scale(1); }
          80% { opacity: 1; }
          100% { opacity: 0; transform: translate(-50%, -10px) scale(0.9); }
        }
        .animate-message-pop {
          animation: message-pop 1.5s ease-out forwards;
        }
        @keyframes heart-beat {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.08); }
        }
        .animate-heart-beat {
          animation: heart-beat 0.8s infinite ease-in-out;
        }
      `}</style>
    </div>
  );
};

export default NoButton;
