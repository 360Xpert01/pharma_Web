import { Check } from "lucide-react";
import { PricingPlan } from "./pricing-section";
import { Button } from "../ui/button/button";

interface PricingCardProps {
  plan: PricingPlan;
}

export function PricingCard({ plan }: PricingCardProps) {
  return (
    <div
      className={`relative flex flex-col rounded-lg border transition-all duration-300 hover:shadow-lg ${
        plan.isPopular
          ? "border-primary/30 bg-primary/5 ring-2 ring-primary/20 md:scale-105"
          : "border-border bg-background"
      }`}
    >
      {/* Popular Badge */}
      {plan.isPopular && (
        <div className="absolute -top-3 left-1/2 -translate-x-1/2">
          <div className="rounded-full bg-primary px-3 py-1 text-xs font-semibold text-primary-foreground">
            Most Popular
          </div>
        </div>
      )}

      <div className="flex flex-col flex-1 p-6 md:p-8">
        {/* Plan Header */}
        <div className="mb-6">
          <h3 className="text-xl font-bold text-foreground mb-1">{plan.name}</h3>
          <p className="text-sm text-muted-foreground">{plan.description}</p>
        </div>

        {/* Price */}
        <div className="mb-6">
          <div className="flex items-baseline gap-1">
            <span className="text-4xl font-bold text-foreground">${plan.price}</span>
            <span className="text-muted-foreground">/{plan.period}</span>
          </div>
        </div>

        {/* Features */}
        <div className="mb-8 flex-1">
          <ul className="space-y-3">
            {plan.features.map((feature, index) => (
              <li key={index} className="flex items-start gap-3">
                <Check className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                <span className="text-sm text-muted-foreground">{feature}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Button */}
        <Button
          variant={plan.buttonVariant}
          className={`w-full ${
            plan.isPopular
              ? "bg-primary text-primary-foreground hover:bg-primary/90"
              : "border-border text-foreground hover:bg-muted"
          }`}
        >
          {plan.buttonText}
        </Button>
      </div>
    </div>
  );
}
