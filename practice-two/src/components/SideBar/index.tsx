import React, { useCallback, useMemo } from 'react';
import { NavLink, useNavigate, useLocation } from 'react-router-dom';

// assets
import { feature } from '@assets/icon';
import { logo } from '@assets/image';

// constant
import SIDEBAR_ITEM from '@constants/sidebar';

// css
import './index.css';

// children
import SidebarItem from './SideBarItem';

const SideBar: React.FC = React.memo(() => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleNavigation = useCallback((url: string) => {
    navigate(url);
  }, [navigate]);

  const getItemClickHandler = useCallback((url: string | undefined) => {
    return () => {
      if (url !== undefined) {
        handleNavigation(url);
      }
    };
  }, [handleNavigation]);
    
  const renderList = useMemo(() => SIDEBAR_ITEM.map(({ id, label, icon, url }) => (
    <SidebarItem
      key={id}
      label={label}
      icon={icon}
      url={url || ''}
      isActive={location.pathname === url}
      onClick={getItemClickHandler(url)}
    />
  )), [getItemClickHandler, location.pathname]);

  return (
    <div className="sidebar">
      <div className="sidebar-header">
        <NavLink to="/" className="logo">
          <img src={logo} alt="logo" />
        </NavLink>
        <h1 className="sidebar-heading">Udemy Inter. School</h1>
      </div>
      <ul className="sidebar-menu">{renderList}</ul>
      <NavLink to="/feature" className="sidebar-feature">
        <img src={feature} alt="Feature" />
        <span className="sidebar-item-content">Feature</span>
        <p className="new-item">New</p>
      </NavLink>
    </div>
  );
});

export default SideBar;
