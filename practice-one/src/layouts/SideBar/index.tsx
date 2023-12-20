import { Logo, Dashboard, Student, Setting, Exams, Billing, Feature } from "../../assets/icon"
import "./SideBar.css"
import "../../assets/icon/index"

const SideBar  = () => {
    const handleItemClick = (event: React.MouseEvent<HTMLLIElement, MouseEvent>) => {
        const sidebarItems = document.querySelectorAll('.sidebar-item');
        sidebarItems.forEach(item => {
            item.classList.remove('active');
        });

        const currentItem = event.currentTarget;
        currentItem.classList.add('active');
    };

    return (
        <div className="sidebar">
            <div className="sidebar-header">
                <a href="#" className="logo" ><img src={Logo} alt="logo" /></a>
                <h1 className="sidebar-heading">Udemy Inter. school</h1>
            </div>
            <ul className="sidebar-menu">
                <li className="sidebar-item active" onClick={handleItemClick}><img src={Dashboard} alt="Dashboard" /><span className="sidebar-item-content">Dashboard</span></li>
                <li className="sidebar-item" onClick={handleItemClick}><img src={Dashboard} alt="Teacher" /><span className="sidebar-item-content">Teacher</span></li>
                <li className="sidebar-item" onClick={handleItemClick}><img src={Student} alt="Student" /><span className="sidebar-item-content">Student/ classes</span></li>
                <li className="sidebar-item" onClick={handleItemClick}><img src={Billing} alt="Billing" /><span className="sidebar-item-content">Billing</span></li>
                <li className="sidebar-item" onClick={handleItemClick}><img src={Setting} alt="Setting" /><span className="sidebar-item-content">Setting and profile</span></li>
                <li className="sidebar-item" onClick={handleItemClick}><img src={Exams} alt="Exams" /><span className="sidebar-item-content">Exams</span></li>
            </ul>
            <a href="#" className="sidebar-feature">
                <img src={Feature} alt="Feature" />
                <span className="sidebar-item-content">Feature</span>
                <button className="new-item">New</button>
            </a>
        </div>
    )
}

export default SideBar
