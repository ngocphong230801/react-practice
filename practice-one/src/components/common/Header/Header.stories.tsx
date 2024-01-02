import Header from "./index";
import { Meta, StoryObj } from "@storybook/react";
import Button from "../Button";
import { Notify } from "../Icon";
import { THeader } from "../../../types/header";

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

export const Primary: Story = {
    args: {
        className: THeader.PRIMARY,
        title: "Learn how to launch faster",
        content : "watch our webinar for tips from our experts and get a limited time offer.",
        icon: <Notify />,
        logOut: "Log out",
    },
};
