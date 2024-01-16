import type { Meta, StoryObj } from "@storybook/react";
import Button from ".";
import { Variant } from "src/types";
import SupportIcon from "@components/Icon/IconSupport";
import CheckDownIcon from "@components/Icon/IconCheckDown";

export default {
    title: "Components/Button",
    component: Button,
} as Meta;

type Story = StoryObj<typeof Button>;

export const Default: Story = {
    args: {
        variant: Variant.DEFAULT,
        title: "Add Student",
        loading: false,
        disabled: false,
        buttonType: "button",
    },
};

export const Primary: Story = {
    args: {
        variant: Variant.PRIMARY,
        title: "Add Student",
        loading: false,
        disabled: false,
        buttonType: "button",
    },
};

export const Secondary: Story = {
    args: {
        variant: Variant.SECONDARY,
        iconLeft: <SupportIcon />,
        title: "Support",
        iconRight: <CheckDownIcon />,
        loading: false,
        disabled: false,
        buttonType: "button",
    },
};
