import { FC } from "react";

interface PlayAreaButtonProps {
  onToggleLayer: () => void;
  isActive: boolean;
}

export const PlayAreaButton: FC<PlayAreaButtonProps> = ({
  onToggleLayer,
  isActive,
}) => {
  return (
    <button
      onClick={onToggleLayer}
      className={`absolute top-4 left-4 z-10 rounded-full p-2 shadow-[0_4px_15px_rgba(11,180,170,0.75)] transition-colors ${
        isActive ? 'bg-teal-700' : 'bg-teal-600'
      }`}
    >
      <img
        src="/map.png"
        alt="Toggle Play Area"
        className="p-2 h-10 sm:w-12 sm:h-12 md:w-12  md:h-12 object-contain"
      />
    </button>
  );
};
