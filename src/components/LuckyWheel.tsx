import { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { WheelSegment } from '../types';
import { wheelSegments } from '../config/wheel';
import { useGameSound } from '../hooks/useSound';
import gsap from 'gsap';

interface Props {
  onSpinComplete: (value: number) => void;
}

export const LuckyWheel: React.FC<Props> = ({ onSpinComplete }) => {
  const [isSpinning, setIsSpinning] = useState(false);
  const [selectedSegment, setSelectedSegment] = useState<WheelSegment | null>(null);
  const wheelRef = useRef<HTMLDivElement>(null);
  const playSound = useGameSound();

  const spin = () => {
    if (isSpinning || !wheelRef.current) return;

    setIsSpinning(true);
    setSelectedSegment(null);
    playSound('spin');
    
    const randomValue = Math.random();
    let cumulativeProbability = 0;
    let segment: WheelSegment | null = null;

    for (const s of wheelSegments) {
      cumulativeProbability += s.probability;
      if (randomValue <= cumulativeProbability) {
        segment = s;
        break;
      }
    }

    const extraSpins = 5;
    const segmentIndex = wheelSegments.indexOf(segment!);
    const segmentAngle = 360 / wheelSegments.length;
    const baseRotation = 360 * extraSpins;
    const segmentRotation = segmentAngle * segmentIndex;
    const finalRotation = baseRotation + segmentRotation + Math.random() * segmentAngle;

    gsap.to(wheelRef.current, {
      rotation: `+=${finalRotation}`,
      duration: 7,
      ease: "power2.out",
      onComplete: () => {
        setIsSpinning(false);
        setSelectedSegment(segment!);
        onSpinComplete(segment!.value);
        playSound('win');
      }
    });
  };

  return (
    <div className="relative w-[400px] h-[400px]">
      <div className="absolute inset-0 flex items-center justify-center">
        <motion.div 
          className="w-[380px] h-[380px] rounded-full bg-gradient-to-br from-blue-900 to-blue-800 
                     border-8 border-yellow-500 shadow-[0_0_20px_rgba(0,0,0,0.3)] overflow-hidden"
          initial={{ scale: 0.9 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", stiffness: 260, damping: 20 }}
        >
          <div 
            ref={wheelRef}
            className="relative w-full h-full"
            style={{ transformOrigin: 'center' }}
          >
            {wheelSegments.map((segment, index) => {
              const angle = (360 / wheelSegments.length) * index;
              return (
                <div
                  key={index}
                  className="absolute w-full h-full origin-center"
                  style={{
                    transform: `rotate(${angle}deg)`,
                    clipPath: 'polygon(50% 50%, 50% 0%, 100% 0%, 100% 50%)',
                  }}
                >
                  <div
                    className="absolute w-full h-full"
                    style={{
                      backgroundColor: segment.color,
                      borderLeft: '2px solid rgba(255,255,255,0.1)',
                      transform: 'rotate(45deg)',
                      transformOrigin: 'bottom left',
                    }}
                  >
                    <div
                      className="absolute flex flex-col items-center justify-center"
                      style={{
                        left: '75%',
                        top: '25%',
                        transform: 'translate(-50%, -50%) rotate(-45deg)',
                      }}
                    >
                      <motion.span 
                        className="text-3xl mb-1"
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ delay: index * 0.1 }}
                      >
                        {segment.flag}
                      </motion.span>
                      <span className="text-white text-xs font-bold px-2 py-1 rounded-full 
                                   bg-black bg-opacity-30">
                        {segment.value}
                      </span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </motion.div>
      </div>

      <motion.div 
        className="absolute top-0 left-1/2 -translate-x-1/2 -mt-4 w-8 h-8"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
      >
        <div className="w-full h-full bg-red-500 rounded-full shadow-lg" />
      </motion.div>

      <motion.button
        onClick={spin}
        disabled={isSpinning}
        className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 
                   w-20 h-20 rounded-full bg-gradient-to-br from-red-500 to-red-600 
                   text-white font-bold shadow-lg disabled:from-gray-400 disabled:to-gray-500 
                   disabled:cursor-not-allowed z-20 border-4 border-red-700"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        {isSpinning ? '...' : 'SPIN'}
      </motion.button>

      <AnimatePresence>
        {selectedSegment && !isSpinning && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="absolute -bottom-16 left-1/2 transform -translate-x-1/2 
                     bg-white px-4 py-2 rounded-lg shadow-lg text-center"
          >
            <p className="text-sm font-semibold">{selectedSegment.name}</p>
            <p className="text-xs text-gray-600">{selectedSegment.value} points</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};