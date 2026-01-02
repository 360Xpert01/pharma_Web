import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { ExpandIcon, CollapseIcon } from "@/lib/icons";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { FormField } from "@/types";

interface SectionWrapperProps {
  field: FormField;
  children: React.ReactNode;
}

export const FormWrapper = ({ field, children }: SectionWrapperProps) => {
  const [isOpen, setIsOpen] = useState(field.defaultOpen ?? true);
  const isCollapsible = field.collapsible ?? true;

  // Calculate responsive grid classes
  const getGridClasses = () => {
    if (!field.grid) return "space-y-4";

    const { columns, gap = "4" } = field.grid;

    const gapClass = `gap-${gap}`;
    const classes: string[] = ["grid", gapClass];

    if (typeof columns === "number") {
      classes.push(`grid-cols-${columns}`);
    } else {
      if (columns?.sm) classes.push(`grid-cols-${columns.sm}`);
      if (columns?.md) classes.push(`md:grid-cols-${columns.md}`);
      if (columns?.lg) classes.push(`lg:grid-cols-${columns.lg}`);
    }

    const result = classes.join(" ");
    return result;
  };

  const renderContent = () => <div className={cn(getGridClasses(), "w-full")}>{children}</div>;

  return (
    <div className="space-y-2 rounded-8 border p-4">
      {isCollapsible ? (
        <Collapsible open={isOpen} onOpenChange={setIsOpen}>
          <CollapsibleTrigger className="w-full">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold">{field.label}</h3>
              {isOpen ? <ExpandIcon /> : <CollapseIcon />}
            </div>
            {field.description && (
              <p className="text-sm text-muted-foreground">{field.description}</p>
            )}
          </CollapsibleTrigger>
          <CollapsibleContent className="mt-4">{renderContent()}</CollapsibleContent>
        </Collapsible>
      ) : (
        <>
          <div className="mb-4">
            <h3 className="text-lg font-semibold">{field.label}</h3>
            {field.description && (
              <p className="text-sm text-muted-foreground">{field.description}</p>
            )}
          </div>
          {renderContent()}
        </>
      )}
    </div>
  );
};
