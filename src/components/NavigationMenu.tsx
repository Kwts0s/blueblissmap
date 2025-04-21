import { FC } from 'react';
import { PlayAreaButton } from './PlayAreaButton';

interface NavigationMenuProps {
  onToggleLayer: () => void;
  isActive: boolean;
}

export const NavigationMenu: FC<NavigationMenuProps> = ({ onToggleLayer, isActive }) => {
  return (
    <div className="z-10">
      <PlayAreaButton onToggleLayer={onToggleLayer} isActive={isActive} />
    </div>
  );
};