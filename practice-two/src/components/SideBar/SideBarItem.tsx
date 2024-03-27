import React from 'react';

interface SidebarItemProps {
  label: string;
  icon: string;
  url: string;
  isActive: boolean;
  onClick: () => void;
}

const SidebarItem: React.FC<SidebarItemProps> = React.memo((
  { label, icon, url, isActive, onClick }
): React.ReactElement => {
  const activeClass = isActive ? 'actives' : '';

  const handleClick = () => {
    if (url) {
      onClick();
    }
  };

  return (
    <li className={`sidebar-item ${activeClass}`} onClick={handleClick}>
      <div className="sidebar-item">
        <img src={icon} alt={label} className="icon" />
        <span className="sidebar-item-content">{label}</span>
      </div>
    </li>
  );
});

export default SidebarItem;
