import type { LucideIcon } from "lucide-react";

export interface Feature {
  id: string;
  title: string;
  description: string;
  icon: LucideIcon;
  isNew?: boolean;
  href?: string;
}

export interface TrustedByItem {
  id: string;
  name: string;
  icon: string;
  description: string;
}
