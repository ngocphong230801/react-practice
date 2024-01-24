import { Meta, StoryObj } from "@storybook/react";
import Input from ".";
import { Variant } from "@type/variant";

export default {
  title: "Components/Input",
  component: Input,
} as Meta;

type Story = StoryObj<typeof Input>;

export const Default: Story = {
  args: {
    variant: Variant.DEFAULT,
    placeholder: "",
  },
};

export const Primary: Story = {
    args: {
      variant: Variant.PRIMARY,
      placeholder: "",
    },
};

export const Secondary: Story = {
    args: {
      variant: Variant.SECONDARY,
      placeholder: "Search for a student by name or email",
      className: "search-box",
    },
};
