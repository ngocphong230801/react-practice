// react
import React from 'react';

interface SidebarItemProps {
  label: string;
  icon: string;
  url: string;
  isActive: boolean;
  onClick: () => void;
}

const SidebarItem: React.FC<SidebarItemProps> = ({
  label,
  icon,
  url,
  isActive,
  onClick,
}: SidebarItemProps): React.ReactElement => {
  const activeClass = isActive ? 'actives' : '';

  return (
    <li className={`sidebar-item ${activeClass}`} onClick={() => url && onClick()}>
      <div className="sidebar-item">
        <img src={icon} alt={label} className="icon" />
        <span className="sidebar-item-content">{label}</span>
      </div>
    </li>
  );
};

export default SidebarItem;
