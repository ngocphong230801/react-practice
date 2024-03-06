import { Meta, StoryObj } from '@storybook/react';
import SideBar from './index';
import { BrowserRouter as Router } from 'react-router-dom';

type SidebarItem = {
  label: string;
  icon: string;
  url?: string;
};

// Mocked data for sidebar items
const SIDEBAR_ITEM_MOCK: SidebarItem[] = [
  { label: 'Home', icon: 'path/to/home/icon', url: '/home' },
  { label: 'Courses', icon: 'path/to/courses/icon', url: '/courses' },
];

const defaultExport: Meta = {
  title: 'Components/SideBar',
  component: SideBar,
  decorators: [
    (Story) => (
      <Router>
        <Story />
      </Router>
    )
  ],
};
export default defaultExport;

const Template: StoryObj<typeof SideBar> = {
  args: {
    sidebarItems: SIDEBAR_ITEM_MOCK,
  },
};

export const Default = Template;
