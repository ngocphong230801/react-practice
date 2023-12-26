import { CheckDown, Notify, Support } from "../../components/Icon"
import Button from "../../components/common/Button"
import Header from "../../components/common/Header"
import SideBar from "../../layouts/SideBar"
import "./index.css"
import { Admin, AddClass, AddStudent } from "../../assets/icon"
import React from "react"

const DashboadPage: React.FC = (): React.ReactElement => {
    return (
        <div className="dashboad-page">
            <div className="dashboad-page-header">
                <Header
                    title="Learn how to launch faster"
                    content="watch our webinar for tips from our experts and get a limited time offer."
                    icon={<Notify />}
                />
                <SideBar />
                <Button
                    className="btn-default"
                    title="Logout"
                />
            </div>
            <div className="dashboad-page-body">
                <h2 className="greeting">Welcome to your dashboard, Udemy school</h2>
                <a href="#" className="school-mail">Uyo/school/@teachable.com</a>
                <div className="funtion">
                    <div className="funtion-item">
                        <div className="funtion-item-header">
                            <img src={Admin} alt="admin" />
                            <p className="funtion-item-title">Add other admins</p>
                        </div>
                        <p className="funtion-item-content">Create rich course content and coaching products for your students.
                            When you give them a pricing plan, they’ll appear on your site!</p>
                    </div>
                    <div className="funtion-item">
                        <div className="funtion-item-header">
                            <img src={AddClass} alt="AddClass" />
                            <p className="funtion-item-title">Add Class</p>
                        </div>
                        <p className="funtion-item-content">Create rich course content and coaching products for your students.
                            When you give them a pricing plan, they’ll appear on your site!</p>
                    </div>
                    <div className="funtion-item">
                        <div className="funtion-item-header">
                            <img src={AddStudent} alt="AddClass" />
                            <p className="funtion-item-title">Add Student</p>
                        </div>
                        <p className="funtion-item-content">Create rich course content and coaching products for your students.
                            When you give them a pricing plan, they’ll appear on your site!</p>
                    </div>
                </div>
            </div>
            <Button
                className="btn-secondary"
                title="Suport"
                iconLeft={<Support />}
                iconRight={<CheckDown />}
            />
        </div>
    )
}

export default DashboadPage
