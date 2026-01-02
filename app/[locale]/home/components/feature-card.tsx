"use client";
import { ArrowRight } from "lucide-react";
import { Feature } from "../types";

interface FeatureCardProps {
  feature: Feature;
}

export function FeatureCard({ feature }: FeatureCardProps) {
  const Icon = feature.icon;

  return (
    <div className="group relative h-full">
      <div className="absolute inset-0 bg-gradient-to-r from-primary/10 to-secondary/10 rounded-8 blur opacity-0 group-hover:opacity-100 transition duration-300"></div>
      <div
        className="relative bg-card border border-border rounded-8 p-8 transition h-full flex flex-col shadow-soft
        hover:shadow-soft hover:border-primary/60 focus-within:shadow-soft focus-within:border-primary/80 active:scale-[0.98] active:shadow-soft
        dark:bg-card dark:border-border"
        tabIndex={0}
      >
        <div className="flex items-start justify-between mb-6">
          <div className="bg-muted rounded-8 p-3 group-hover:bg-primary/10 transition">
            <Icon className="w-6 h-6 text-foreground/80" />
          </div>
          {feature.isNew && (
            <span className="bg-primary text-primary-foreground text-xs font-semibold px-3 py-1 rounded-8">
              New
            </span>
          )}
        </div>

        <h3 className="text-lg font-semibold text-foreground mb-3">{feature.title}</h3>
        <p className="text-muted-foreground text-sm leading-relaxed mb-6 flex-grow">
          {feature.description}
        </p>

        {feature.href && (
          <a
            href={feature.href}
            className="inline-flex items-center gap-2 text-primary font-medium group/link hover:gap-3 transition-all focus:outline-none focus:ring-2 focus:ring-primary/40"
            tabIndex={0}
          >
            Learn more
            <ArrowRight className="w-4 h-4" />
          </a>
        )}
      </div>
    </div>
  );
}
