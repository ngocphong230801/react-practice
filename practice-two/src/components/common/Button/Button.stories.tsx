// react
import type { Meta, StoryObj } from "@storybook/react";

// types
import { ButtonVariant } from "@type/varianButton";

// components
import { CheckDownIcon,SupportIcon } from "../Icon";


// item
import Button from ".";

export default {
    title: "Components/Button",
    component: Button,
} as Meta;

type Story = StoryObj<typeof Button>;

export const Default: Story = {
    args: {
        variant: ButtonVariant.DEFAULT,
        title: "Add Student",
        loading: false,
        disabled: false,
        buttonType: "button",
    },
};

export const Primary: Story = {
    args: {
        variant: ButtonVariant.PRIMARY,
        title: "Add Student",
        loading: false,
        disabled: false,
        buttonType: "button",
    },
};

export const Secondary: Story = {
    args: {
        variant: ButtonVariant.SECONDARY,
        iconLeft: <SupportIcon />,
        title: "Support",
        iconRight: <CheckDownIcon />,
        loading: false,
        disabled: false,
        buttonType: "button",
    },
};
