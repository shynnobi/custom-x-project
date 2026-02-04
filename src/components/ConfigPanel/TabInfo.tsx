import { ReactElement } from 'react';
import { FaCircleInfo, FaInstagram, FaXTwitter } from 'react-icons/fa6';

import { useExperience } from '@contexts/ExperienceContext';

import CustomTabButton from './CustomTabButton';
import CustomTabPanel from './CustomTabPanel';

export const TabPanelInfo = (): ReactElement => {
  const { isScreenPortraitMode } = useExperience();

  return (
    <CustomTabPanel>
      <div
        className={`${isScreenPortraitMode ? 'flex flex-wrap justify-center' : 'flex flex-col'} gap-2`}
      >
        <h1 className="text-3xl uppercase mb-3 text-center leading-5">
          Custom X Project <br />{' '}
          <span className="font-sans text-base font-bold">by Shynn</span>
        </h1>

        <div className="text-center flex flex-col gap-6">
          <div className="border p-3 border-blue-300 notched-corner">
            <p className="font-sans">
              I create this project as a tribute to the Mega Man serie,
              it&apos;s one of my favorite game license with iconic characters
              like Mega Man and Zero. Build your own customized character and
              share it on social media or make some wallpapers phone, have fun!
            </p>
          </div>

          <div className="border p-3 border-blue-300  notched-corner">
            <h2 className="text-2xl uppercase mb-1">Tech stack</h2>
            <ul className="text-xl leading-tight">
              <li>
                Blender + Vite + JavaScript + TypeScript + React Three Fiber +
                Tailwind CSS + Netlify
              </li>
            </ul>
          </div>

          <div className="border p-3 border-blue-300 notched-corner">
            <h3 className="text-2xl font-bold uppercase mb-1">Disclaimer</h3>
            <p className="font-sans text-sm">
              This fan-made project is not affiliated with or endorsed by
              CAPCOM. All rights to Mega Man and related characters belong to
              CAPCOM Co., Ltd. It is created for non-commercial purposes out of
              appreciation for the original work.
            </p>
          </div>

          <div className="mb-6">
            <p className="text-xl uppercase font-semibold mb-2 leading-tight">
              For any questions, <br />
              hit me up on X or Instagram
            </p>
            <ul className="flex gap-2 justify-center">
              <li>
                <a
                  className="text-white bg-black flex rounded-full p-4"
                  href="https://twitter.com/shynnobi_"
                  target="_blank"
                  rel="noreferrer"
                >
                  <FaXTwitter size={28} />
                </a>
              </li>
              <li>
                <a
                  className="text-white bg-black flex rounded-full p-4"
                  href="https://twitter.com/shynnobi_"
                  target="_blank"
                  rel="noreferrer"
                >
                  <FaInstagram size={28} />
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </CustomTabPanel>
  );
};

export const TabButtonInfo = (): ReactElement => {
  return <CustomTabButton title="Info" icon={FaCircleInfo} />;
};
