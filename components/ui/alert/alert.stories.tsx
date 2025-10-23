import type { Meta, StoryObj } from "@storybook/react";
import { Alert, AlertTitle, AlertDescription } from "./alert";
import {
  AlertTriangle,
  CheckCircle,
  Info,
  XCircle,
  Bell,
  Shield,
  Zap,
  Heart,
  Star,
  AlertCircle,
  Terminal,
  Lightbulb,
  Download,
  Upload,
  WifiOff,
} from "lucide-react";

// Define custom story args type
interface AlertStoryArgs {
  variant?: "default" | "destructive";
  title?: string;
  description?: string;
  showIcon?: boolean;
  className?: string;
}

const meta: Meta<AlertStoryArgs> = {
  title: "Components/UI/Alert",
  component: Alert,
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: { type: "select" },
      options: ["default", "destructive"],
      description: "The visual style variant of the alert",
    },
    title: {
      control: { type: "text" },
      description: "The alert title text",
    },
    description: {
      control: { type: "text" },
      description: "The alert description text",
    },
    showIcon: {
      control: { type: "boolean" },
      description: "Whether to show the icon",
    },
  },
};

export default meta;
type Story = StoryObj<AlertStoryArgs>;

export const Default: Story = {
  args: {
    variant: "default",
    title: "Heads up!",
    description: "You can add components and dependencies to your app using the cli.",
    showIcon: true,
  },
  render: ({ title, description, showIcon, ...args }) => (
    <Alert {...args}>
      {showIcon && <AlertCircle />}
      {title && <AlertTitle>{title}</AlertTitle>}
      {description && <AlertDescription>{description}</AlertDescription>}
    </Alert>
  ),
};

export const Destructive: Story = {
  args: {
    variant: "destructive",
    title: "Error",
    description: "Your session has expired. Please log in again.",
    showIcon: true,
  },
  render: ({ title, description, showIcon, ...args }) => (
    <Alert {...args}>
      {showIcon && <XCircle />}
      {title && <AlertTitle>{title}</AlertTitle>}
      {description && <AlertDescription>{description}</AlertDescription>}
    </Alert>
  ),
};

export const Success: Story = {
  args: {
    variant: "default",
    title: "Success!",
    description: "Your changes have been saved successfully.",
    showIcon: true,
  },
  render: ({ title, description, showIcon, ...args }) => (
    <Alert {...args} className="border-green-200 bg-green-50 text-green-800">
      {showIcon && <CheckCircle className="text-green-600" />}
      {title && <AlertTitle>{title}</AlertTitle>}
      {description && <AlertDescription>{description}</AlertDescription>}
    </Alert>
  ),
};

export const Warning: Story = {
  args: {
    variant: "default",
    title: "Warning",
    description: "This action cannot be undone. Please proceed with caution.",
    showIcon: true,
  },
  render: ({ title, description, showIcon, ...args }) => (
    <Alert {...args} className="border-yellow-200 bg-yellow-50 text-yellow-800">
      {showIcon && <AlertTriangle className="text-yellow-600" />}
      {title && <AlertTitle>{title}</AlertTitle>}
      {description && <AlertDescription>{description}</AlertDescription>}
    </Alert>
  ),
};

export const InfoAlert: Story = {
  args: {
    variant: "default",
    title: "Information",
    description: "New features are available. Check out what's new in the latest update.",
    showIcon: true,
  },
  render: ({ title, description, showIcon, ...args }) => (
    <Alert {...args} className="border-blue-200 bg-blue-50 text-blue-800">
      {showIcon && <Info className="text-blue-600" />}
      {title && <AlertTitle>{title}</AlertTitle>}
      {description && <AlertDescription>{description}</AlertDescription>}
    </Alert>
  ),
};

export const WithoutIcon: Story = {
  args: {
    variant: "default",
    title: "No Icon Alert",
    description: "This alert doesn't have an icon. The layout adjusts automatically.",
    showIcon: false,
  },
  render: ({ title, description, showIcon, ...args }) => (
    <Alert {...args}>
      {showIcon && <AlertCircle />}
      {title && <AlertTitle>{title}</AlertTitle>}
      {description && <AlertDescription>{description}</AlertDescription>}
    </Alert>
  ),
};

export const TitleOnly: Story = {
  args: {
    variant: "default",
    title: "Simple notification alert with just a title",
    description: "",
    showIcon: true,
  },
  render: ({ title, description, showIcon, ...args }) => (
    <Alert {...args}>
      {showIcon && <Bell />}
      {title && <AlertTitle>{title}</AlertTitle>}
      {description && description && <AlertDescription>{description}</AlertDescription>}
    </Alert>
  ),
};

export const DescriptionOnly: Story = {
  args: {
    variant: "default",
    title: "",
    description:
      "This alert only contains a description without a title. Perfect for simple messages.",
    showIcon: true,
  },
  render: ({ title, description, showIcon, ...args }) => (
    <Alert {...args}>
      {showIcon && <Shield />}
      {title && title && <AlertTitle>{title}</AlertTitle>}
      {description && <AlertDescription>{description}</AlertDescription>}
    </Alert>
  ),
};

export const LongContent: Story = {
  args: {
    variant: "default",
    title: "Important Security Update Required",
    description:
      "We've detected unusual activity on your account. To ensure your security, please update your password immediately. This security measure helps protect your personal information and prevents unauthorized access. You can update your password in the account settings section. If you didn't request this change or suspect unauthorized access, please contact our support team immediately at support@example.com or call 1-800-123-4567.",
    showIcon: true,
  },
  render: ({ title, description, showIcon, ...args }) => (
    <Alert {...args}>
      {showIcon && <AlertTriangle />}
      {title && <AlertTitle>{title}</AlertTitle>}
      {description && <AlertDescription>{description}</AlertDescription>}
    </Alert>
  ),
};

export const CustomStyling: Story = {
  args: {
    variant: "default",
    title: "Premium Feature",
    description: "Unlock advanced analytics and reporting features with our premium plan.",
    showIcon: true,
  },
  render: ({ title, description, showIcon, ...args }) => (
    <Alert
      {...args}
      className="border-purple-200 bg-gradient-to-r from-purple-50 to-pink-50 text-purple-800"
    >
      {showIcon && <Star className="text-purple-600" />}
      {title && <AlertTitle className="text-purple-900 font-bold">{title}</AlertTitle>}
      {description && (
        <AlertDescription className="text-purple-700">{description}</AlertDescription>
      )}
    </Alert>
  ),
};

export const NetworkStatus: Story = {
  args: {
    variant: "destructive",
    title: "Connection Lost",
    description:
      "Unable to connect to the server. Please check your internet connection and try again.",
    showIcon: true,
  },
  render: ({ title, description, showIcon, ...args }) => (
    <Alert {...args}>
      {showIcon && <WifiOff />}
      {title && <AlertTitle>{title}</AlertTitle>}
      {description && <AlertDescription>{description}</AlertDescription>}
    </Alert>
  ),
};

export const UpdateAvailable: Story = {
  args: {
    variant: "default",
    title: "Update Available",
    description:
      "Version 2.1.0 is now available. This update includes bug fixes and performance improvements.",
    showIcon: true,
  },
  render: ({ title, description, showIcon, ...args }) => (
    <Alert {...args} className="border-indigo-200 bg-indigo-50 text-indigo-800">
      {showIcon && <Download className="text-indigo-600" />}
      {title && <AlertTitle>{title}</AlertTitle>}
      {description && <AlertDescription>{description}</AlertDescription>}
    </Alert>
  ),
};

export const SystemMaintenance: Story = {
  args: {
    variant: "default",
    title: "Scheduled Maintenance",
    description:
      "Our systems will be undergoing maintenance on Sunday, March 15th from 2:00 AM to 6:00 AM EST. Some features may be temporarily unavailable during this time.",
    showIcon: true,
  },
  render: ({ title, description, showIcon, ...args }) => (
    <Alert {...args} className="border-orange-200 bg-orange-50 text-orange-800">
      {showIcon && <AlertTriangle className="text-orange-600" />}
      {title && <AlertTitle>{title}</AlertTitle>}
      {description && <AlertDescription>{description}</AlertDescription>}
    </Alert>
  ),
};

export const FeatureAnnouncement: Story = {
  args: {
    variant: "default",
    title: "New Feature Launch",
    description:
      "Introducing real-time collaboration! You can now work together with your team in real-time.",
    showIcon: true,
  },
  render: ({ title, description, showIcon, ...args }) => (
    <Alert {...args} className="border-green-200 bg-green-50 text-green-800">
      {showIcon && <Zap className="text-green-600" />}
      {title && <AlertTitle>{title}</AlertTitle>}
      {description && <AlertDescription>{description}</AlertDescription>}
    </Alert>
  ),
};

export const TerminalCommand: Story = {
  args: {
    variant: "default",
    title: "Quick Setup",
    description: "npm install @ui/components - Run this command to install the component library.",
    showIcon: true,
  },
  render: ({ title, description, showIcon, ...args }) => (
    <Alert {...args} className="border-gray-200 bg-gray-50 text-gray-800 font-mono">
      {showIcon && <Terminal className="text-gray-600" />}
      {title && <AlertTitle>{title}</AlertTitle>}
      {description && (
        <AlertDescription>
          <code className="bg-gray-200 px-2 py-1 rounded text-sm">
            {description.split(" - ")[0]}
          </code>
          <br />
          {description.split(" - ")[1]}
        </AlertDescription>
      )}
    </Alert>
  ),
};

export const ProTip: Story = {
  args: {
    variant: "default",
    title: "Pro Tip",
    description:
      "You can use keyboard shortcuts to navigate faster. Press '?' to see all available shortcuts.",
    showIcon: true,
  },
  render: ({ title, description, showIcon, ...args }) => (
    <Alert {...args} className="border-cyan-200 bg-cyan-50 text-cyan-800">
      {showIcon && <Lightbulb className="text-cyan-600" />}
      {title && <AlertTitle>{title}</AlertTitle>}
      {description && <AlertDescription>{description}</AlertDescription>}
    </Alert>
  ),
};

export const WithButton: Story = {
  args: {
    variant: "default",
    title: "Backup Reminder",
    description:
      "It's been 30 days since your last backup. Regular backups help protect your data.",
    showIcon: true,
  },
  render: ({ title, description, showIcon, ...args }) => (
    <Alert {...args} className="border-blue-200 bg-blue-50 text-blue-800">
      {showIcon && <Info className="text-blue-600" />}
      {title && <AlertTitle>{title}</AlertTitle>}
      {description && (
        <AlertDescription className="space-y-2">
          <p>{description}</p>
          <button className="bg-blue-600 text-white px-3 py-1 rounded text-sm hover:bg-blue-700 transition-colors">
            Create Backup Now
          </button>
        </AlertDescription>
      )}
    </Alert>
  ),
};

export const WithLink: Story = {
  args: {
    variant: "default",
    title: "Account Verification Required",
    description: "Please verify your email address to access all features.",
    showIcon: true,
  },
  render: ({ title, description, showIcon, ...args }) => (
    <Alert {...args}>
      {showIcon && <AlertCircle />}
      {title && <AlertTitle>{title}</AlertTitle>}
      {description && (
        <AlertDescription>
          {description}{" "}
          <a href="#" className="font-medium underline hover:text-blue-600">
            Resend verification email
          </a>
        </AlertDescription>
      )}
    </Alert>
  ),
};

export const MultipleAlerts: Story = {
  render: () => (
    <div className="space-y-4">
      <Alert className="border-green-200 bg-green-50 text-green-800">
        <CheckCircle className="text-green-600" />
        <AlertTitle>Success</AlertTitle>
        <AlertDescription>Profile updated successfully.</AlertDescription>
      </Alert>

      <Alert className="border-yellow-200 bg-yellow-50 text-yellow-800">
        <AlertTriangle className="text-yellow-600" />
        <AlertTitle>Attention</AlertTitle>
        <AlertDescription>Your subscription expires in 3 days.</AlertDescription>
      </Alert>

      <Alert variant="destructive">
        <XCircle />
        <AlertTitle>Error</AlertTitle>
        <AlertDescription>Failed to save changes. Please try again.</AlertDescription>
      </Alert>
    </div>
  ),
};

export const Compact: Story = {
  args: {
    variant: "default",
    title: "",
    description: "Thank you for your support! ❤️",
    showIcon: true,
  },
  render: ({ title, description, showIcon, ...args }) => (
    <Alert {...args} className="py-2">
      {showIcon && <Heart className="text-red-500" />}
      {title && <AlertTitle>{title}</AlertTitle>}
      {description && <AlertDescription className="text-xs">{description}</AlertDescription>}
    </Alert>
  ),
};

export const FullWidth: Story = {
  args: {
    variant: "default",
    title: "File Upload Complete",
    description:
      "All files have been successfully uploaded to your cloud storage. You can now access them from any device.",
    showIcon: true,
  },
  render: ({ title, description, showIcon, ...args }) => (
    <div className="w-full">
      <Alert {...args} className="w-full border-indigo-200 bg-indigo-50 text-indigo-800">
        {showIcon && <Upload className="text-indigo-600" />}
        {title && <AlertTitle>{title}</AlertTitle>}
        {description && <AlertDescription>{description}</AlertDescription>}
      </Alert>
    </div>
  ),
};

export const Dismissible: Story = {
  args: {
    variant: "default",
    title: "New Message",
    description: "You have a new message from John Doe.",
    showIcon: true,
  },
  render: ({ title, description, showIcon, ...args }) => (
    <Alert {...args} className="pr-12 relative">
      {showIcon && <Bell />}
      {title && <AlertTitle>{title}</AlertTitle>}
      {description && <AlertDescription>{description}</AlertDescription>}
      <button className="absolute top-2 right-2 text-gray-400 hover:text-gray-600">
        <XCircle className="h-4 w-4" />
      </button>
    </Alert>
  ),
};
