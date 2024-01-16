import { billing, dashboard, exams, setting, student } from "../assets/icon";

const SIDEBAR_ITEM = [
    {
        id: 'home',
        label: 'Dashboard',
        icon: dashboard,
        url: '/'
    },
    { 
        id: 'teacher',
        label: 'Teacher',
        icon: dashboard,
    },
    {   
        id: 'student',
        label: 'Student/ Classes',
        icon: student,
        url: '/student'
    },
    {
        id: 'v',
        label: 'Billing',
        icon: billing,
    },
    {
        id: 'setting',
        label: 'Setting and profile',
        icon: setting,
    },
    {
        id: 'exams',
        label: 'Exams',
        icon: exams,
    },
]

export default SIDEBAR_ITEM
