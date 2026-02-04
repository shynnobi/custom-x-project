import { ReactElement } from 'react';

import Experience from '@components/Experience';
import OverlayCanvas from '@components/OverlayCanvas';

import { AnimationPlayerProvider } from './contexts/AnimationContext';
import { ExperienceProvider } from './contexts/ExperienceContext';

function App(): ReactElement {
  return (
    <>
      <ExperienceProvider>
        <AnimationPlayerProvider>
          <OverlayCanvas />
          <Experience />
        </AnimationPlayerProvider>
      </ExperienceProvider>
    </>
  );
}

export default App;
