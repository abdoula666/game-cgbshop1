import gsap from 'gsap';
import { GAME_CONSTANTS } from './constants';

export const animateWheel = (wheelRef: HTMLElement, finalRotation: number): Promise<void> => {
  return new Promise((resolve) => {
    gsap.to(wheelRef, {
      rotation: `+=${finalRotation}`,
      duration: GAME_CONSTANTS.WHEEL.SPIN_DURATION / 1000,
      ease: "power2.out",
      onComplete: resolve
    });
  });
};

export const animateThimbles = (thimbles: HTMLElement[]): Promise<void> => {
  return new Promise((resolve) => {
    const timeline = gsap.timeline();
    const duration = GAME_CONSTANTS.THIMBLES.SHUFFLE_DURATION / 
                    (GAME_CONSTANTS.THIMBLES.SHUFFLE_MOVES * 1000);

    for (let i = 0; i < GAME_CONSTANTS.THIMBLES.SHUFFLE_MOVES; i++) {
      const thimble1 = thimbles[i % 2];
      const thimble2 = thimbles[(i % 2) + 1];

      timeline.to([thimble1, thimble2], {
        x: (index) => index === 0 ? '+=100' : '-=100',
        duration: duration,
        ease: 'power2.inOut'
      });
    }

    timeline.then(resolve);
  });
};