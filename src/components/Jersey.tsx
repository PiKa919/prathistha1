import { FC } from 'react';

interface JerseyProps {
  color: string;
  number: string;
}

export const Jersey: FC<JerseyProps> = ({ color, number }) => {
  return (
    <div className="flex justify-center items-center">
      <div className={`w-80 h-96 sm:w-60 sm:h-72 ${color} relative rounded-lg shadow-md hover:scale-105 transition-transform`}>
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-6xl sm:text-4xl font-bold text-white">{number}</span>
        </div>
      </div>
    </div>
  );
};
