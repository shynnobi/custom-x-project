import { ReactElement } from 'react';

interface SectionTitleProps {
  title?: string;
  lineColor?: string;
  textColor?: string;
  className?: string;
}

const SectionTitle = ({
  title,
  lineColor = 'border-gray-300',
  textColor = 'text-blue-800',
  className = '',
}: SectionTitleProps): ReactElement => (
  <div className={`flex items-center w-full ${className}`}>
    <div className={`flex-grow border-t ${lineColor}`} />
    <span className={`mx-2 uppercase ${textColor}`}>{title}</span>
    <div className={`flex-grow border-t ${lineColor}`} />
  </div>
);

export default SectionTitle;
