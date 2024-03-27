// storybook
import { Meta, StoryObj } from '@storybook/react';
import { text, boolean, select } from '@storybook/addon-knobs';

// item
import Button, { CustomButtonProps} from '.';

// icon
import { SupportIcon, CheckDownIcon } from '../Icon';

//type
import { ButtonVariant } from '@type/button';

export default {
    title: 'Components/Button',
    component: Button,
} as Meta<typeof Button>;

const Template = (args: CustomButtonProps) => <Button {...args} />;

export const Default: StoryObj<typeof Button> = {
    render: Template,
    args: {
        variant: select('Variant', { DEFAULT: ButtonVariant.DEFAULT, PRIMARY: ButtonVariant.PRIMARY }, ButtonVariant.DEFAULT),
        title: text('Title', 'Add Student'),
        loading: boolean('Loading', false),
        disabled: boolean('Disabled', false),
        buttonType: 'button',
    },
};

export const Primary: StoryObj<typeof Button> = {
    ...Default,
    args: {
        ...Default.args,
        variant: ButtonVariant.PRIMARY,
    },
};

export const Secondary: StoryObj<typeof Button> = {
    ...Default,
    args: {
        ...Default.args,
        variant: ButtonVariant.SECONDARY,
        iconLeft: <SupportIcon />,
        title: text('Title', 'Support'),
        iconRight: <CheckDownIcon />,
    },
    parameters: {
        docs: {
            description: {
                story: 'A secondary button with left and right icons.',
            },
        },
    },
    decorators: [
        (Story) => {
            const iconLeft = text('Icon Left', '');
            const iconRight = text('Icon Right', '');

            return (
                <div style={{ display: 'flex', alignItems: 'center' }}>
                    {iconLeft && <div style={{ marginRight: '8px' }}>{iconLeft}</div>}
                    <Story />
                    {iconRight && <div style={{ marginLeft: '8px' }}>{iconRight}</div>}
                </div>
            );
        },
    ],
};
