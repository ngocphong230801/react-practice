import { billing, dashboard, exams, setting, student } from "../assets/icon";

const SIDEBAR_ITEM = [
    {
        label: 'Dashboard',
        icon: dashboard,
        url: '/'
    },
    {
        label: 'Teacher',
        icon: dashboard,
    },
    {
        label: 'Student/ Classes',
        icon: student,
        url: '/student'
    },
    {
        label: 'Billing',
        icon: billing,
    },
    {
        label: 'Setting and profile',
        icon: setting,
    },
    {
        label: 'Exams',
        icon: exams,
    },
]

export default SIDEBAR_ITEM
