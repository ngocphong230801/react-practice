import {
  Logo,
  Dashboard,
  Student,
  Feature,
} from "../../assets/icon";
import "./SideBar.css";
import "../../assets/icon/index";
import { NavLink } from "react-router-dom";


const SideBar: React.FC = (): React.ReactElement => {

  const listItem = [
    {label: 'home', icon: Dashboard, url:'/home'},
    {label: 'student', icon: Student, url:'/student'},
    {label: 'teacher', icon: Student}
]

  const renderList = listItem.map((item) => {
    const {label, icon, url} = item || {}
    return <NavLink to= {url} className={({ isActive }) => [isActive ? "actives" : ""].join(" ")}>
    <img src={icon} alt={icon} />{label}</NavLink>
})

  return (
    <div className="sidebar">
      <div className="sidebar-header">
        <a href="#" className="logo">
          <img src={Logo} alt="logo" />
        </a>
        <h1 className="sidebar-heading">Udemy Inter. School</h1>
      </div>
      <ul className="sidebar-menu">
        <li>
        {renderList}
        </li>
      </ul>
      <a href="#" className="sidebar-feature">
        <img src={Feature} alt="Feature" />
        <span className="sidebar-item-content">Feature</span>
        <button className="new-item">New</button>
      </a>
    </div>
  );
};

export default SideBar;
