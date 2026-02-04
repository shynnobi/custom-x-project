import { AnimationClip } from 'three';

// Utility type to extract the names from the animation clips
type ExtractAnimationNames<T> = T extends { name: infer N } ? N : never;
export type ActionName = ExtractAnimationNames<AnimationClip>;

export interface AnimationContextValue {
  animationName: ActionName | undefined;
  currentAnimationIndex: number;
  animationNames: ActionName[];
  totalAnimations: number;
  changeAnimationIndex: (index: number) => void; // Update to accept a number argument
  handleNext: () => void;
  handlePrevious: () => void;
  randomizeAnimation: () => void;
}
