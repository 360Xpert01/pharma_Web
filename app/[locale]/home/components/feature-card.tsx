"use client";

import { Feature } from "../types";

interface FeatureCardProps {
  feature: Feature;
}

export function FeatureCard({ feature }: FeatureCardProps) {
  return (
    <div className="group relative">
      <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-lg blur opacity-0 group-hover:opacity-100 transition duration-300"></div>
      <div className="relative bg-gray-900/50 border border-gray-700 rounded-lg p-6 hover:border-gray-600 transition h-full">
        <div className="text-3xl mb-4">{feature.icon}</div>
        <h3 className="text-lg font-semibold text-white mb-2">{feature.title}</h3>
        <p className="text-gray-400 text-sm leading-relaxed">{feature.description}</p>
      </div>
    </div>
  );
}
