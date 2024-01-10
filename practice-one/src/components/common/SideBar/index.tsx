// css
import "./SideBar.css";

// assets
import { Logo, Feature} from "@assets/icon/index";

// react
import { NavLink } from "react-router-dom";

// constants
import SIDEBAR_ITEM from "@constants/sidebar";

const SideBar: React.FC = (): React.ReactElement => {

  const renderList = SIDEBAR_ITEM.map((item, index) => {
    const { label, icon, url } = item;

    if (url) {
      return (
        <li key={index} className="sidebar-item">
          <NavLink to={url} className={({ isActive }) => isActive ? "actives" : ""}>
            <div className="sidebar-item">
              <img src={icon} alt={label} className="icon" />
              <span className="sidebar-item-content ">{label}</span>
            </div>
          </NavLink>
        </li>
      );
    } else {
      return (
        <li key={index} className="sidebar-item">
          <div className="sidebar-item">
            <img src={icon} alt={label} className="icon" />
            <span className="sidebar-item-content ">{label}</span>
          </div>
        </li>
      );
    }
  });

  return (
    <div className="sidebar">
      <div className="sidebar-header">
        <a href="#" className="logo">
          <img src={Logo} alt="logo" />
        </a>
        <h1 className="sidebar-heading">Udemy Inter. School</h1>
      </div>
      <ul className="sidebar-menu">
        {renderList}
      </ul>
      <a href="#" className="sidebar-feature">
        <img src={Feature} alt="Feature" />
        <span className="sidebar-item-content">Feature</span>
        <p className="new-item">New</p>
      </a>
    </div>
  );
};

export default SideBar;
