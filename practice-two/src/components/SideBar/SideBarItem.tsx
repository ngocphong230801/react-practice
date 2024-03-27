import React, { useCallback } from 'react';

interface SidebarItemProps {
  label: string;
  icon: string;
  url: string;
  isActive: boolean;
  onClick: () => void;
}

const SidebarItem: React.FC<SidebarItemProps> = React.memo((
  { label, icon, isActive, onClick }
): React.ReactElement => {
  const handleClick = useCallback(() => {
    onClick();
  }, [onClick]);

  const activeClass = isActive ? 'actives' : '';

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
