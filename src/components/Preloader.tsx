import { FC } from 'react';

export const Preloader: FC = () => {
  return (
    <div className="fixed inset-0 bg-[#ffffff] flex items-center justify-center z-[100] transition-opacity duration-500">
      <div className="abstract-loader">
        <div className="wave wave-1" />
        <div className="wave wave-2" />
        <div className="wave wave-3" />
      </div>
    </div>
  );
};