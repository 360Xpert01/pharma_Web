export interface HeatmapCell {
  id: string;
  territoryName: string;
  catLogout: number;
  docMap: number;
  coverage: number; // percentage 0-100
}

export interface HeatmapConfig {
  rows: number;
  columns: number;
}

// Default configuration
export const defaultHeatmapConfig: HeatmapConfig = {
  rows: 8,
  columns: 20,
};

// Generate mock data for heatmap
export const generateHeatmapData = (
  config: HeatmapConfig = defaultHeatmapConfig
): HeatmapCell[] => {
  const data: HeatmapCell[] = [];
  const totalCells = config.rows * config.columns;

  for (let i = 0; i < totalCells; i++) {
    // Random performance scores distributed across different ranges
    const coverage = Math.floor(Math.random() * 100);

    data.push({
      id: `territory-${i}`,
      territoryName: `Territory ${i + 1}`,
      catLogout: Math.floor(Math.random() * 500) + 100,
      docMap: Math.floor(Math.random() * 300) + 50,
      coverage,
    });
  }

  return data;
};

// Helper function to get color based on performance (coverage percentage)
export const getPerformanceColor = (coverage: number): string => {
  // More granular color gradient with multiple shades of each color

  // Dark Green shades (80-100%) - Using custom green palette
  if (coverage >= 95) return "#32D74B"; // Very dark green
  if (coverage >= 90) return "#32D74B"; // Dark green
  if (coverage >= 85) return "#70FF85"; // Medium green
  if (coverage >= 80) return "#70FF85"; // Light medium green

  // Light Green shades (70-79%)
  if (coverage >= 75) return "#C5FFCE"; // Very light green
  if (coverage >= 70) return "#C5FFCE"; // Pale green

  // Yellow/Orange shades (50-69%) - Using custom yellow palette
  if (coverage >= 65) return "#F4BA45"; // Dark yellow/orange
  if (coverage >= 60) return "#F4BA45"; // Orange yellow
  if (coverage >= 55) return "#FFDA8F"; // Medium yellow
  if (coverage >= 50) return "#FFE7B5"; // Light yellow

  // Light Red/Pink shades (30-49%) - Using custom red palette
  if (coverage >= 45) return "#FFCFCD"; // Light pink
  if (coverage >= 40) return "#FFCFCD"; // Pale red
  if (coverage >= 35) return "#FF958F"; // Medium red
  if (coverage >= 30) return "#FF958F"; // Light medium red

  // Dark Red shades (0-29%)
  if (coverage >= 25) return "#F95D55"; // Dark red
  if (coverage >= 20) return "#F95D55"; // Darker red
  if (coverage >= 15) return "#F95D55"; // Very dark red

  // Darkest Red (0-14%)
  return "#F95D55"; // Darkest red
};
