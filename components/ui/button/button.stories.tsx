import type { Meta, StoryObj } from "@storybook/react";
import { Button } from "./button";

const meta: Meta<typeof Button> = {
  title: "Components/UI/Button",
  component: Button,
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: { type: "select" },
      options: ["default", "destructive", "outline", "secondary", "ghost", "link"],
    },
    size: {
      control: { type: "select" },
      options: ["default", "sm", "lg", "icon"],
    },
    asChild: {
      control: { type: "boolean" },
    },
    disabled: {
      control: { type: "boolean" },
    },
  },
};

export default meta;
type Story = StoryObj<typeof Button>;

// Variant Stories
export const Default: Story = {
  args: {
    children: "Button",
    variant: "default",
    size: "default",
    disabled: false,
    asChild: false,
  },
};

export const Destructive: Story = {
  args: {
    children: "Destructive",
    variant: "destructive",
    size: "default",
    disabled: false,
    asChild: false,
  },
};

export const Outline: Story = {
  args: {
    children: "Outline",
    variant: "outline",
    size: "default",
    disabled: false,
    asChild: false,
  },
};

export const Secondary: Story = {
  args: {
    children: "Secondary",
    variant: "secondary",
    size: "default",
    disabled: false,
    asChild: false,
  },
};

export const Ghost: Story = {
  args: {
    children: "Ghost",
    variant: "ghost",
    size: "default",
    disabled: false,
    asChild: false,
  },
};

export const Link: Story = {
  args: {
    children: "Link",
    variant: "link",
    size: "default",
    disabled: false,
    asChild: false,
  },
};

// Size Stories
export const Small: Story = {
  args: {
    children: "Small Button",
    variant: "default",
    size: "sm",
    disabled: false,
    asChild: false,
  },
};

export const Large: Story = {
  args: {
    children: "Large Button",
    variant: "default",
    size: "lg",
    disabled: false,
    asChild: false,
  },
};

export const Icon: Story = {
  args: {
    children: "🚀",
    variant: "default",
    size: "icon",
    disabled: false,
    asChild: false,
  },
};

// Disabled States
export const DefaultDisabled: Story = {
  args: {
    children: "Disabled",
    variant: "default",
    size: "default",
    disabled: true,
    asChild: false,
  },
};

export const DestructiveDisabled: Story = {
  args: {
    children: "Disabled",
    variant: "destructive",
    size: "default",
    disabled: true,
    asChild: false,
  },
};

export const OutlineDisabled: Story = {
  args: {
    children: "Disabled",
    variant: "outline",
    size: "default",
    disabled: true,
    asChild: false,
  },
};

export const SecondaryDisabled: Story = {
  args: {
    children: "Disabled",
    variant: "secondary",
    size: "default",
    disabled: true,
    asChild: false,
  },
};

export const GhostDisabled: Story = {
  args: {
    children: "Disabled",
    variant: "ghost",
    size: "default",
    disabled: true,
    asChild: false,
  },
};

export const LinkDisabled: Story = {
  args: {
    children: "Disabled",
    variant: "link",
    size: "default",
    disabled: true,
    asChild: false,
  },
};

// Size + Variant Combinations
export const SmallDestructive: Story = {
  args: {
    children: "Small Destructive",
    variant: "destructive",
    size: "sm",
    disabled: false,
    asChild: false,
  },
};

export const LargeOutline: Story = {
  args: {
    children: "Large Outline",
    variant: "outline",
    size: "lg",
    disabled: false,
    asChild: false,
  },
};

export const SmallGhost: Story = {
  args: {
    children: "Small Ghost",
    variant: "ghost",
    size: "sm",
    disabled: false,
    asChild: false,
  },
};

export const LargeSecondary: Story = {
  args: {
    children: "Large Secondary",
    variant: "secondary",
    size: "lg",
    disabled: false,
    asChild: false,
  },
};

// Icon Variants
export const IconDestructive: Story = {
  args: {
    children: "❌",
    variant: "destructive",
    size: "icon",
    disabled: false,
    asChild: false,
  },
};

export const IconOutline: Story = {
  args: {
    children: "⭐",
    variant: "outline",
    size: "icon",
    disabled: false,
    asChild: false,
  },
};

export const IconSecondary: Story = {
  args: {
    children: "⚙️",
    variant: "secondary",
    size: "icon",
    disabled: false,
    asChild: false,
  },
};

export const IconGhost: Story = {
  args: {
    children: "👻",
    variant: "ghost",
    size: "icon",
    disabled: false,
    asChild: false,
  },
};

// asChild Examples
export const AsChildLink: Story = {
  args: {
    children: "External Link",
    variant: "link",
    size: "default",
    disabled: false,
    asChild: true,
  },
  render: (args) => (
    <Button {...args}>
      <a href="https://example.com" target="_blank" rel="noopener noreferrer">
        External Link
      </a>
    </Button>
  ),
};

export const AsChildDiv: Story = {
  args: {
    children: "Div Button",
    variant: "default",
    size: "default",
    disabled: false,
    asChild: true,
  },
  render: (args) => (
    <Button {...args}>
      <div>Div Button</div>
    </Button>
  ),
};
