import StudentPage from "../pages/students";
import DashboadPage from "../pages/dashboad";

export const routers = [
    {
        path: "/home",
        element: <DashboadPage />
    },
    {
        path: "/student",
        element: <StudentPage />
    }
]
