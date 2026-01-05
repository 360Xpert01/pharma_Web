"use client";

import React, { useState, useMemo } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  generateHeatmapData,
  getPerformanceColor,
  type HeatmapCell,
  type HeatmapConfig,
} from "./heatmapData";

interface HeatmapProps {
  data?: HeatmapCell[];
  config?: HeatmapConfig;
  className?: string;
}

export default function Heatmap({ data, config, className }: HeatmapProps) {
  // Use useMemo to generate data only once, preventing color changes on clicks
  const heatmapData = useMemo(() => {
    if (data) return data;
    // Default config: rows aur columns change kar sakte hain
    return generateHeatmapData(config || { rows: 20, columns: 10 }); // Territory count ke hisaab se adjust karein
  }, [data, config]);

  // Dynamically calculate grid dimensions based on actual data
  const gridDimensions = useMemo(() => {
    if (config) {
      return { rows: config.rows, columns: config.columns };
    }

    // Auto-calculate optimal grid layout based on data length
    const dataLength = heatmapData.length;
    const maxColumns = 20; // Maximum columns for better UX
    const columns = Math.min(dataLength, maxColumns);
    const rows = Math.ceil(dataLength / columns);

    return { rows, columns };
  }, [heatmapData.length, config]);

  const [hoveredCell, setHoveredCell] = useState<HeatmapCell | null>(null);
  const [tooltipPosition, setTooltipPosition] = useState({ x: 0, y: 0 });

  const handleMouseEnter = (cell: HeatmapCell, event: React.MouseEvent<HTMLDivElement>) => {
    setHoveredCell(cell);
    const rect = event.currentTarget.getBoundingClientRect();
    setTooltipPosition({
      x: rect.left + rect.width / 2,
      y: rect.top - 10,
    });
  };

  const handleMouseLeave = () => {
    setHoveredCell(null);
  };

  return (
    <Card className={className}>
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="t-h4 text-[var(--gray-9)]">Territory Performance Heatmap</CardTitle>

          {/* Legend - Three Color Boxes */}
          <div className="flex items-center gap-2">
            <div className="w-24 h-8 rounded-8 bg-[#32D74B]" />
            <div className="w-24 h-8 rounded-8 bg-[#F95D55]" />
            <div className="w-24 h-8 rounded-8 bg-[#F4BA45]" />
          </div>
        </div>
      </CardHeader>

      <CardContent className="pt-0 pb-4">
        {/* Heatmap Grid - All boxes in square shape filling available space */}
        <div className="w-full aspect-[2/1] overflow-hidden">
          <div
            className="grid h-full w-full"
            style={{
              gridTemplateColumns: `repeat(${gridDimensions.columns}, 1fr)`,
              gridTemplateRows: `repeat(${gridDimensions.rows}, 1fr)`,
              gap: "0.25rem",
            }}
          >
            {heatmapData.map((cell) => (
              <div
                key={cell.id}
                className="aspect-square rounded-8 cursor-pointer transition-transform hover:scale-105 hover:shadow-md"
                style={{ backgroundColor: getPerformanceColor(cell.coverage) }}
                onMouseEnter={(e) => handleMouseEnter(cell, e)}
                onMouseLeave={handleMouseLeave}
              />
            ))}
          </div>
        </div>

        {/* Tooltip */}
        {hoveredCell && (
          <div
            className="fixed z-50 pointer-events-none"
            style={{
              left: `${tooltipPosition.x}px`,
              top: `${tooltipPosition.y}px`,
              transform: "translate(-50%, -100%)",
            }}
          >
            <div className="bg-white text-[var(--gray-9)] px-4 py-3 rounded-tl-8 rounded-tr-8 rounded-br-8 shadow-lg border border-[var(--gray-2)]">
              {/* Territory Name */}
              <div className="text-[var(--gray-5)] t-sm mb-3">{hoveredCell.territoryName}</div>

              {/* Metrics */}
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <span className="t-label-b text-[var(--gray-9)]">Call Logged:</span>
                  <span className="t-label text-[var(--gray-9)]">{hoveredCell.catLogout}</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="t-label-b text-[var(--gray-9)]">Order Value:</span>
                  <span className="t-label text-[var(--gray-9)]">
                    {hoveredCell.docMap.toLocaleString()}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="t-label-b text-[var(--gray-9)]">Coverage:</span>
                  <span className="t-label text-[var(--gray-9)]">{hoveredCell.coverage}%</span>
                </div>
              </div>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
