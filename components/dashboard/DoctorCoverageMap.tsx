"use client";

import React from "react";
import dynamic from "next/dynamic";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button/button";
import { Menu } from "lucide-react";
import { cn } from "@/lib/utils";
import SearchInput from "@/components/ui/search-input";
import FilterDropdown, { type FilterConfig } from "@/components/ui/filter-dropdown";

// Dynamically import the entire map component with no SSR
const MapComponent = dynamic(() => import("./MapComponent"), {
  ssr: false,
  loading: () => (
    <div className="relative w-full h-[300px] bg-[#f5f5f5] flex items-center justify-center">
      <div className="text-(--gray-5)">Loading map...</div>
    </div>
  ),
});

interface DoctorLocation {
  id: string;
  name: string;
  latitude: number;
  longitude: number;
  address: string;
  specialty?: string;
}

interface DoctorCoverageMapProps {
  locations?: DoctorLocation[];
  className?: string;
  onSearch?: (query: string) => void;
  onMenuClick?: () => void;
  onFilterApply?: (filters: Record<string, string>) => void;
}

// Default locations in Lahore area (example coordinates)
const defaultLocations: DoctorLocation[] = [
  {
    id: "1",
    name: "Dr. Muhammad Khan",
    latitude: 31.5204,
    longitude: 74.3587,
    address: "Model Town, Lahore",
    specialty: "Cardiologist",
  },
  {
    id: "2",
    name: "Dr. Ahmed Ali",
    latitude: 31.5497,
    longitude: 74.3436,
    address: "Gulberg, Lahore",
    specialty: "Neurologist",
  },
  {
    id: "3",
    name: "Dr. Fatima Noor",
    latitude: 31.4789,
    longitude: 74.3249,
    address: "DHA Phase 5, Lahore",
    specialty: "Pediatrician",
  },
  {
    id: "4",
    name: "Dr. Hassan Raza",
    latitude: 31.5134,
    longitude: 74.3588,
    address: "Johar Town, Lahore",
    specialty: "Orthopedic",
  },
  {
    id: "5",
    name: "Dr. Ayesha Malik",
    latitude: 31.4824,
    longitude: 74.3387,
    address: "Cavalry Ground, Lahore",
    specialty: "Dermatologist",
  },
  {
    id: "6",
    name: "Dr. Bilal Ahmed",
    latitude: 31.5577,
    longitude: 74.3424,
    address: "Faisal Town, Lahore",
    specialty: "General Physician",
  },
];

// Custom filters for doctor map
const doctorFilters: FilterConfig[] = [
  {
    label: "Specialty",
    options: [
      { label: "All Specialties", value: "all" },
      { label: "Cardiologist", value: "cardiologist" },
      { label: "Neurologist", value: "neurologist" },
      { label: "Pediatrician", value: "pediatrician" },
      { label: "Orthopedic", value: "orthopedic" },
      { label: "Dermatologist", value: "dermatologist" },
    ],
  },
  {
    label: "Area",
    options: [
      { label: "All Areas", value: "all" },
      { label: "Model Town", value: "model_town" },
      { label: "Gulberg", value: "gulberg" },
      { label: "DHA", value: "dha" },
      { label: "Johar Town", value: "johar_town" },
    ],
  },
  {
    label: "Visit Status",
    options: [
      { label: "All", value: "all" },
      { label: "Visited", value: "visited" },
      { label: "Not Visited", value: "not_visited" },
      { label: "Scheduled", value: "scheduled" },
    ],
  },
];

export default function DoctorCoverageMap({
  locations = defaultLocations,
  className,
  onSearch,
  onMenuClick,
  onFilterApply,
}: DoctorCoverageMapProps) {
  const handleSearch = (value: string) => {
    onSearch?.(value);
  };

  const handleFilterApply = (filters: Record<string, string>) => {
    console.log("Map filters applied:", filters);
    onFilterApply?.(filters);
  };

  return (
    <Card className={cn("shadow-soft", className)}>
      <CardHeader className="pb-4">
        <div className="flex items-center justify-between gap-4">
          <CardTitle className="t-h4 text-(--gray-9)">Doctor Coverage Map</CardTitle>

          {/* Search, Filter and Menu */}
          <div className="flex items-center gap-2">
            <SearchInput placeholder="Search" onSearch={handleSearch} width="w-48" />
            <FilterDropdown filters={doctorFilters} onApply={handleFilterApply} />
          </div>
        </div>
      </CardHeader>

      <CardContent className="p-0">
        {/* Real Map with Leaflet */}
        <div className="relative w-full h-[300px] rounded-b-8 overflow-hidden">
          <MapComponent locations={locations} />
        </div>
      </CardContent>
    </Card>
  );
}
