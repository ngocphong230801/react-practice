// react
import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

// assets
import { logo, feature } from '@assets/icon';

// constant
import SIDEBAR_ITEM from '@constants/sidebar';

// css
import './SideBar.css';

// children
import SidebarItem from './SideBarItem';

const SideBar: React.FC = (): React.ReactElement => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleNavigation = (url: string) => {
    navigate(url);
  };

  const renderList = SIDEBAR_ITEM.map((item, index) => {
    const { label, icon, url } = item;

    const isActive = location.pathname === url;

    return (
      <SidebarItem
        key={index}
        label={label}
        icon={icon}
        url={url || ''}
        isActive={isActive}
        onClick={() => url && handleNavigation(url)}
      />
    );
  });

  return (
    <div className="sidebar">
      <div className="sidebar-header">
        <a href="#" className="logo">
          <img src={logo} alt="logo" />
        </a>
        <h1 className="sidebar-heading">Udemy Inter. School</h1>
      </div>
      <ul className="sidebar-menu">{renderList}</ul>
      <a href="#" className="sidebar-feature" onClick={() => handleNavigation('your-feature-url')}>
        <img src={feature} alt="Feature" />
        <span className="sidebar-item-content">Feature</span>
        <button className="new-item">New</button>
      </a>
    </div>
  );
};

export default SideBar;
