"use client";

import { TrustedByItem } from "../types";

interface TrustedByCardProps {
  item: TrustedByItem;
}

export function TrustedByCard({ item }: TrustedByCardProps) {
  return (
    <div className="group relative">
      <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-8 blur opacity-0 group-hover:opacity-100 transition duration-300"></div>
      <div className="relative bg-gray-900/50 border border-gray-700 rounded-8 p-6 text-center hover:border-gray-600 transition">
        <div className="text-4xl mb-3">{item.icon}</div>
        <h3 className="text-lg font-semibold text-[var(--background)] mb-2">{item.name}</h3>
        <p className="text-[var(--gray-4)] text-sm">{item.description}</p>
      </div>
    </div>
  );
}
