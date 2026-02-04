import {
  createContext,
  FC,
  ReactNode,
  useCallback,
  useContext,
  useMemo,
  useState,
} from 'react';
import { useGLTF } from '@react-three/drei';

import { MODEL_ARMATURE } from '@constants/constantsModels';
import { ActionName, AnimationContextValue } from '@interfaces/animation';

// Define the context
const AnimationContext = createContext<AnimationContextValue | undefined>(
  undefined
);

export const AnimationPlayerProvider: FC<{ children: ReactNode }> = ({
  children,
}) => {
  const { animations } = useGLTF(MODEL_ARMATURE.path);

  // Memoize the animation names array
  const animationNames: ActionName[] = animations.map(
    (animation) => animation.name
  ) as ActionName[];

  // Memoize the total animations count
  const totalAnimations = useMemo(
    () => animationNames.length,
    [animationNames]
  );

  // State for current animation index
  const [currentAnimationIndex, setCurrentAnimationIndex] = useState<number>(4);

  // Memoized current animation name
  const animationName = useMemo(
    () => animationNames[currentAnimationIndex],
    [animationNames, currentAnimationIndex]
  );

  // Function to change animation index
  const changeAnimationIndex = useCallback(
    (index: number) => {
      if (index >= 0 && index < animationNames.length) {
        setCurrentAnimationIndex(index);
      } else {
        console.warn('Attempted to set animation index out of bounds');
      }
    },
    [animationNames]
  );

  // Function to go to the previous animation
  const handlePrevious = useCallback(() => {
    changeAnimationIndex(
      currentAnimationIndex === 0
        ? animationNames.length - 1
        : currentAnimationIndex - 1
    );
  }, [changeAnimationIndex, currentAnimationIndex, animationNames.length]);

  // Function to go to the next animation
  const handleNext = useCallback(() => {
    changeAnimationIndex(
      currentAnimationIndex === animationNames.length - 1
        ? 0
        : currentAnimationIndex + 1
    );
  }, [changeAnimationIndex, currentAnimationIndex, animationNames.length]);

  // Function to randomize the animation
  const randomizeAnimation = useCallback(() => {
    let randomIndex: number;

    do {
      randomIndex = Math.floor(Math.random() * animationNames.length);
    } while (randomIndex === currentAnimationIndex);

    changeAnimationIndex(randomIndex);
  }, [animationNames.length, changeAnimationIndex, currentAnimationIndex]);

  return (
    <AnimationContext.Provider
      value={{
        animationName,
        currentAnimationIndex,
        changeAnimationIndex,
        animationNames,
        totalAnimations,
        handlePrevious,
        handleNext,
        randomizeAnimation,
      }}
    >
      {children}
    </AnimationContext.Provider>
  );
};

// Hook to use the AnimationPlayer context
export const useAnimation = (): AnimationContextValue => {
  const context = useContext(AnimationContext);
  if (context === undefined) {
    throw new Error(
      'useAnimation must be used within an AnimationPlayerProvider'
    );
  }
  return context;
};
