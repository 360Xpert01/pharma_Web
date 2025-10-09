import type { Meta, StoryObj } from "@storybook/react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "./accordion";

const meta: Meta<typeof Accordion> = {
  title: "Components/UI/Accordion",
  component: Accordion,
  tags: ["autodocs"],
  argTypes: {
    type: {
      control: { type: "select" },
      options: ["single", "multiple"],
      description: "Determines whether one or multiple items can be opened at the same time",
    },
    collapsible: {
      control: { type: "boolean" },
      description:
        "When type is 'single', allows closing content when clicking trigger for an open item",
    },
    disabled: {
      control: { type: "boolean" },
      description: "When true, prevents the user from interacting with the accordion",
    },
  },
};

export default meta;
type Story = StoryObj<typeof Accordion>;

// Basic Accordion Stories
export const Default: Story = {
  args: {
    type: "single",
    collapsible: false,
  },
  render: (args) => (
    <Accordion {...args} className="w-full max-w-md">
      <AccordionItem value="item-1">
        <AccordionTrigger>Is it accessible?</AccordionTrigger>
        <AccordionContent>Yes. It adheres to the WAI-ARIA design pattern.</AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-2">
        <AccordionTrigger>Is it styled?</AccordionTrigger>
        <AccordionContent>
          Yes. It comes with default styles that matches the other components' aesthetic.
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-3">
        <AccordionTrigger>Is it animated?</AccordionTrigger>
        <AccordionContent>
          Yes. It's animated by default, but you can disable it if you prefer.
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  ),
};

export const SingleCollapsible: Story = {
  args: {
    type: "single",
    collapsible: true,
  },
  render: (args) => (
    <Accordion {...args} className="w-full max-w-md">
      <AccordionItem value="item-1">
        <AccordionTrigger>Can I close this when open?</AccordionTrigger>
        <AccordionContent>
          Yes! With collapsible=true, you can close an open item by clicking its trigger again.
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-2">
        <AccordionTrigger>What about this one?</AccordionTrigger>
        <AccordionContent>Same behavior - click the trigger again to close it.</AccordionContent>
      </AccordionItem>
    </Accordion>
  ),
};

export const Multiple: Story = {
  args: {
    type: "multiple",
  },
  render: (args) => (
    <Accordion {...args} className="w-full max-w-md">
      <AccordionItem value="item-1">
        <AccordionTrigger>Can multiple items be open?</AccordionTrigger>
        <AccordionContent>
          Yes! With type="multiple", you can have multiple accordion items open at the same time.
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-2">
        <AccordionTrigger>Does this stay open?</AccordionTrigger>
        <AccordionContent>Yes, this will stay open when you open other items.</AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-3">
        <AccordionTrigger>And this one too?</AccordionTrigger>
        <AccordionContent>Absolutely! All items can be open simultaneously.</AccordionContent>
      </AccordionItem>
    </Accordion>
  ),
};

export const Disabled: Story = {
  args: {
    type: "single",
    collapsible: true,
    disabled: true,
  },
  render: (args) => (
    <Accordion {...args} className="w-full max-w-md">
      <AccordionItem value="item-1">
        <AccordionTrigger>This is disabled</AccordionTrigger>
        <AccordionContent>You shouldn't be able to interact with this accordion.</AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-2">
        <AccordionTrigger>So is this</AccordionTrigger>
        <AccordionContent>All items are disabled when the accordion is disabled.</AccordionContent>
      </AccordionItem>
    </Accordion>
  ),
};

export const DisabledItem: Story = {
  args: {
    type: "single",
    collapsible: true,
  },
  render: (args) => (
    <Accordion {...args} className="w-full max-w-md">
      <AccordionItem value="item-1">
        <AccordionTrigger>This item works normally</AccordionTrigger>
        <AccordionContent>This item is fully functional and can be opened/closed.</AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-2" disabled>
        <AccordionTrigger>This item is disabled</AccordionTrigger>
        <AccordionContent>
          This content cannot be accessed because the item is disabled.
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-3">
        <AccordionTrigger>This item also works</AccordionTrigger>
        <AccordionContent>Only the middle item is disabled, this one works fine.</AccordionContent>
      </AccordionItem>
    </Accordion>
  ),
};

export const WithDefaultOpen: Story = {
  args: {
    type: "single",
    collapsible: true,
    defaultValue: "item-2",
  },
  render: (args) => (
    <Accordion {...args} className="w-full max-w-md">
      <AccordionItem value="item-1">
        <AccordionTrigger>First item</AccordionTrigger>
        <AccordionContent>This item starts closed.</AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-2">
        <AccordionTrigger>Second item (opens by default)</AccordionTrigger>
        <AccordionContent>This item starts open because defaultValue="item-2".</AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-3">
        <AccordionTrigger>Third item</AccordionTrigger>
        <AccordionContent>This item also starts closed.</AccordionContent>
      </AccordionItem>
    </Accordion>
  ),
};

export const WithMultipleDefaultOpen: Story = {
  args: {
    type: "multiple",
    defaultValue: ["item-1", "item-3"],
  },
  render: (args) => (
    <Accordion {...args} className="w-full max-w-md">
      <AccordionItem value="item-1">
        <AccordionTrigger>First item (opens by default)</AccordionTrigger>
        <AccordionContent>
          This item starts open because it's in the defaultValue array.
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-2">
        <AccordionTrigger>Second item</AccordionTrigger>
        <AccordionContent>This item starts closed.</AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-3">
        <AccordionTrigger>Third item (opens by default)</AccordionTrigger>
        <AccordionContent>
          This item also starts open because it's in the defaultValue array.
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  ),
};

export const LongContent: Story = {
  args: {
    type: "single",
    collapsible: true,
  },
  render: (args) => (
    <Accordion {...args} className="w-full max-w-lg">
      <AccordionItem value="item-1">
        <AccordionTrigger>What is React?</AccordionTrigger>
        <AccordionContent>
          React is a free and open-source front-end JavaScript library for building user interfaces
          based on UI components. It is maintained by Meta and a community of individual developers
          and companies. React can be used as a base in the development of single-page, mobile, or
          server-rendered applications with frameworks like Next.js. However, React is only
          concerned with state management and rendering that state to the DOM, so creating React
          applications usually requires the use of additional libraries for routing, as well as
          certain client-side functionality.
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-2">
        <AccordionTrigger>Benefits of TypeScript</AccordionTrigger>
        <AccordionContent>
          <ul className="list-disc list-inside space-y-2">
            <li>
              <strong>Static Type Checking:</strong> Catches errors at compile-time rather than
              runtime
            </li>
            <li>
              <strong>Better IDE Support:</strong> Enhanced autocomplete, navigation, and
              refactoring
            </li>
            <li>
              <strong>Code Documentation:</strong> Types serve as inline documentation
            </li>
            <li>
              <strong>Easier Refactoring:</strong> Safe and confident code changes
            </li>
            <li>
              <strong>Better Collaboration:</strong> Clear interfaces between team members
            </li>
            <li>
              <strong>Gradual Adoption:</strong> Can be introduced incrementally to existing
              projects
            </li>
          </ul>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  ),
};

export const Nested: Story = {
  args: {
    type: "single",
    collapsible: true,
  },
  render: (args) => (
    <Accordion {...args} className="w-full max-w-lg">
      <AccordionItem value="item-1">
        <AccordionTrigger>Frontend Technologies</AccordionTrigger>
        <AccordionContent>
          <Accordion type="single" collapsible className="pl-4">
            <AccordionItem value="nested-1">
              <AccordionTrigger className="text-sm">React</AccordionTrigger>
              <AccordionContent>
                A JavaScript library for building user interfaces.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="nested-2">
              <AccordionTrigger className="text-sm">Vue</AccordionTrigger>
              <AccordionContent>The Progressive JavaScript Framework.</AccordionContent>
            </AccordionItem>
          </Accordion>
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-2">
        <AccordionTrigger>Backend Technologies</AccordionTrigger>
        <AccordionContent>
          <Accordion type="single" collapsible className="pl-4">
            <AccordionItem value="nested-3">
              <AccordionTrigger className="text-sm">Node.js</AccordionTrigger>
              <AccordionContent>
                JavaScript runtime built on Chrome's V8 JavaScript engine.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="nested-4">
              <AccordionTrigger className="text-sm">Python</AccordionTrigger>
              <AccordionContent>
                A programming language that lets you work quickly.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  ),
};

export const CustomStyling: Story = {
  args: {
    type: "single",
    collapsible: true,
  },
  render: (args) => (
    <Accordion {...args} className="w-full max-w-md bg-slate-50 rounded-lg p-4">
      <AccordionItem value="item-1" className="border-2 border-blue-200 rounded-lg mb-2">
        <AccordionTrigger className="bg-blue-100 hover:bg-blue-200 px-4 py-2 rounded-t-lg font-semibold text-blue-800">
          Custom Styled Item 1
        </AccordionTrigger>
        <AccordionContent className="bg-white p-4 rounded-b-lg border-t-0 text-gray-700">
          This accordion item has custom styling with blue colors and rounded corners.
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-2" className="border-2 border-green-200 rounded-lg mb-2">
        <AccordionTrigger className="bg-green-100 hover:bg-green-200 px-4 py-2 rounded-t-lg font-semibold text-green-800">
          Custom Styled Item 2
        </AccordionTrigger>
        <AccordionContent className="bg-white p-4 rounded-b-lg border-t-0 text-gray-700">
          This one uses green colors to show how you can customize each item differently.
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  ),
};

export const FAQ: Story = {
  args: {
    type: "single",
    collapsible: true,
  },
  render: (args) => (
    <div className="w-full max-w-2xl">
      <h2 className="text-2xl font-bold mb-4">Frequently Asked Questions</h2>
      <Accordion {...args}>
        <AccordionItem value="faq-1">
          <AccordionTrigger>How do I reset my password?</AccordionTrigger>
          <AccordionContent>
            To reset your password, go to the login page and click "Forgot Password". Enter your
            email address and we'll send you a reset link. Follow the instructions in the email to
            create a new password.
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="faq-2">
          <AccordionTrigger>What payment methods do you accept?</AccordionTrigger>
          <AccordionContent>
            We accept all major credit cards (Visa, MasterCard, American Express), PayPal, Apple
            Pay, and Google Pay. All payments are processed securely through our encrypted payment
            system.
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="faq-3">
          <AccordionTrigger>How long does shipping take?</AccordionTrigger>
          <AccordionContent>
            Standard shipping takes 5-7 business days. Express shipping takes 2-3 business days.
            International shipping varies by location but typically takes 7-14 business days. You'll
            receive a tracking number once your order ships.
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="faq-4">
          <AccordionTrigger>Can I cancel my order?</AccordionTrigger>
          <AccordionContent>
            You can cancel your order within 1 hour of placing it by contacting customer support.
            Once an order has been processed and shipped, cancellation is not possible, but you can
            return the item following our return policy.
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  ),
};
