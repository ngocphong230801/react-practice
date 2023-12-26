import "./index.css"
import React from "react"

const ListStudent: React.FC = (): React.ReactElement => {
    return (
        <div className="list-student">
            <ul className="list-header">
                <li className="list-header-item name">Name</li>
                <li className="list-header-item id">StudentID</li>
                <li className="list-header-item email">Email address</li>
                <li className="list-header-item class">Class</li>
                <li className="list-header-item gender">Gender</li>
            </ul>
            <ul className="list-body"></ul>
        </div>
    )
}

export default ListStudent
