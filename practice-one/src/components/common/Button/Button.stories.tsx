import type { Meta, StoryObj } from "@storybook/react";
import Button from ".";
import { Variant } from "../../../types/variant";

export default {
    title: "Components/Button",
    component: Button,
} as Meta;

type Story = StoryObj<typeof Button>;

export const Default: Story = {
    args: {
        variant: Variant.DEFAULT,
        children: "Add Student",
      },
};
