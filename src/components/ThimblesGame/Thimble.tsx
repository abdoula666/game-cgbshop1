import React from 'react';
import { motion } from 'framer-motion';
import { useGesture } from 'react-use-gesture';
import { isMobile } from 'react-device-detect';

interface Props {
  position: number;
  showBall: boolean;
  hasBall: boolean;
  isLifted: boolean;
  onClick: () => void;
  disabled: boolean;
}

export const Thimble: React.FC<Props> = ({
  position,
  showBall,
  hasBall,
  isLifted,
  onClick,
  disabled
}) => {
  const bind = useGesture({
    onClick: () => {
      if (!disabled) onClick();
    }
  });

  return (
    <motion.div
      {...bind()}
      className="relative w-32 h-40 touch-manipulation thimble"
      initial="initial"
      animate={isLifted ? "lifted" : "initial"}
      variants={{
        initial: { y: 0, rotateX: 0, scale: 1 },
        lifted: { y: -50, rotateX: 30, scale: 1.1 }
      }}
      whileHover={!disabled && !isMobile ? { scale: 1.05 } : {}}
      whileTap={!disabled ? { scale: 0.95 } : {}}
      transition={{
        type: "spring",
        stiffness: 300,
        damping: 20,
        mass: 0.8
      }}
      style={{
        touchAction: 'none',
        userSelect: 'none'
      }}
    >
      {/* Rest of the component remains unchanged */}
    </motion.div>
  );
};
