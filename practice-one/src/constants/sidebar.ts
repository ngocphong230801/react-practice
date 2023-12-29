import { Billing, Dashboard, Exams, Setting, Student } from "../assets/icon";

const SIDEBAR_ITEM = [
    {
        label: 'Dashboard',
        icon: Dashboard,
        url: '/'
    },
    {
        label: 'Teacher',
        icon: Dashboard,
    },
    {
        label: 'Student/ Classes',
        icon: Student,
        url: '/student'
    },
    {
        label: 'Billing',
        icon: Billing,
    },
    {
        label: 'Setting and profile',
        icon: Setting,
    },
    {
        label: 'Exams',
        icon: Exams,
    },
]

export default SIDEBAR_ITEM
