// header.tsx
import Header from ".";

// react story book
import { Meta, StoryObj } from "@storybook/react";

// components
import Button from "../Button";
import { Notify } from "@components/Icon";

// type
import { THeader } from "@type/header";

export default {
    title: "Components/Header",
    component: Header,
} as Meta;

type Story = StoryObj<typeof Header>;

export const Default: Story = {
    args: {
        className: THeader.SECONDARY,
        title: "Learn how to launch faster",
        content : "watch our webinar for tips from our experts and get a limited time offer.",
        icon: <Notify />,
        children: <Button title = "Log out"/>
    },
};
