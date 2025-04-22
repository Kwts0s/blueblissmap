import { FC } from 'react';
import { PlayAreaButton } from './PlayAreaButton';


interface NavigationMenuProps {
  onToggleLayer: () => void;
  isActive: boolean;
}

export const NavigationMenu: FC<NavigationMenuProps> = ({ onToggleLayer, isActive }) => {
  return (
    <div className="absolute top-3 left-4 z-10">
      <PlayAreaButton onToggleLayer={onToggleLayer} isActive={isActive} />
    </div>
  );
};