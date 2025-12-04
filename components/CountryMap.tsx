"use client";

import React from "react";
import { TrendingUp } from "lucide-react";
import { ComposableMap, Geographies, Geography } from "react-simple-maps";

const geoUrl = "https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json";

const countryData: Record<string, number> = {
  PAK: 48,
  ARE: 27,
  GBR: 18,
  USA: 7,
  CAN: 45,
  BRA: 22,
  AUS: 30,
  JPN: 15,
};

const getFillColor = (geo: any) => {
  const code = geo.properties.ISO_A3;
  const value =
    (code === "PAK" && countryData.PAK) ||
    (code === "ARE" && countryData.ARE) ||
    (code === "GBR" && countryData.GBR) ||
    (code === "USA" && countryData.USA) ||
    (code === "CAN" && countryData.PAK) ||
    (code === "BRA" && countryData.BRA) ||
    (code === "AUS" && countryData.AUS) ||
    (code === "JPN" && countryData.JPN) ||
    0;

  if (value >= 40) return "#1E40AF"; // Darkest blue
  if (value >= 30) return "#2563EB";
  if (value >= 20) return "#3B82F6";
  if (value >= 10) return "#60A5FA";
  if (value > 0) return "#93BBFC";
  return "#E5E7EB"; // Default gray
};

export default function TopSalesMap() {
  return (
    <div className="w-full bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Top Sales From</h2>
          <p className="text-sm text-green-600 font-medium flex items-center gap-1 mt-1">
            <TrendingUp className="w-4 h-4" />
            +24% Vs. Previous month
          </p>
        </div>
      </div>

      <div className="flex justify-between gap-2 w-[100%] ">
        <div className="space-y-1 w-[10%]">
          <div className="space-y-4">
            <div className="flex items-center gap-4">
              <div className="w-10 h-7 rounded-sm overflow-hidden shadow-sm">
                <div className="w-full h-full bg-green-600"></div>
                <div className="w-full h-1.5 bg-white"></div>
                <div className="w-full h-1.5 bg-red-600"></div>
              </div>
              <div>
                <p className="font-semibold text-gray-900">PAK</p>
                <p className="text-2xl font-bold text-blue-600">48%</p>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <div className="w-10 h-7 rounded-sm overflow-hidden shadow-sm">
                <div className="w-full h-2 bg-red-600"></div>
                <div className="w-full h-2 bg-white"></div>
                <div className="w-full h-3 bg-green-600"></div>
              </div>
              <div>
                <p className="font-semibold text-gray-900">UAE</p>
                <p className="text-2xl font-bold text-blue-600">27%</p>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <div
                className="w-10 h-7 rounded-sm shadow-sm bg-cover bg-center"
                style={{ backgroundImage: "url('https://flagcdn.com/gb.svg')" }}
              />
              <div>
                <p className="font-semibold text-gray-900">UK</p>
                <p className="text-2xl font-bold text-blue-600">18%</p>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <div
                className="w-10 h-7 rounded-sm shadow-sm bg-cover bg-center"
                style={{ backgroundImage: "url('https://flagcdn.com/us.svg')" }}
              />
              <div>
                <p className="font-semibold text-gray-900">US</p>
                <p className="text-xl font-bold text-blue-600">07%</p>
              </div>
            </div>
          </div>
        </div>

        {/* Map */}
        <div className=" w-[90%] ">
          <div className="">
            <ComposableMap
              projection="geoMercator"
              projectionConfig={{
                scale: 160,
                center: [5, 40],
              }}
              style={{ width: "100%", height: "400px" }}
            >
              <Geographies geography={geoUrl}>
                {({ geographies }) =>
                  geographies.map((geo) => (
                    <Geography
                      key={geo.rsmKey}
                      geography={geo}
                      fill={getFillColor(geo)}
                      stroke="#fff"
                      strokeWidth={0.5}
                      style={{
                        default: { outline: "none" },
                        hover: { outline: "none", fill: "#2563EB" },
                        pressed: { outline: "none" },
                      }}
                    />
                  ))
                }
              </Geographies>
            </ComposableMap>
          </div>
        </div>

        {/* Legend */}
      </div>
    </div>
  );
}
