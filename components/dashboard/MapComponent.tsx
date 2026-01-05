"use client";

import React, { useEffect, useState, useRef } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

interface DoctorLocation {
  id: string;
  name: string;
  latitude: number;
  longitude: number;
  address: string;
  specialty?: string;
}

interface MapComponentProps {
  locations: DoctorLocation[];
}

// Custom hook to invalidate map size
function MapInvalidator() {
  const map = useMap();
  useEffect(() => {
    setTimeout(() => {
      map.invalidateSize();
    }, 100);
  }, [map]);
  return null;
}

export default function MapComponent({ locations }: MapComponentProps) {
  const [isMounted, setIsMounted] = useState(false);
  const [customIcon, setCustomIcon] = useState<L.Icon | null>(null);
  const [mapKey, setMapKey] = useState(0);

  useEffect(() => {
    // Only run on client side
    if (typeof window === "undefined") return;

    setIsMounted(true);

    // Fix Leaflet default icon issue with Next.js
    delete (L.Icon.Default.prototype as any)._getIconUrl;
    L.Icon.Default.mergeOptions({
      iconRetinaUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
      iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
      shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
    });

    // Create custom blue marker icon
    const icon = L.icon({
      iconUrl:
        "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzIiIGhlaWdodD0iMzIiIHZpZXdCb3g9IjAgMCAyNCAyNCIgZmlsbD0iIzBmNzJmNCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cGF0aCBkPSJNMTIgMkM4LjEzIDIgNSA1LjEzIDUgOWMwIDUuMjUgNyAxMyA3IDEzczctNy43NSA3LTEzYzAtMy44Ny0zLjEzLTctNy03em0wIDkuNWMtMS4zOCAwLTIuNS0xLjEyLTIuNS0yLjVzMS4xMi0yLjUgMi41LTIuNSAyLjUgMS4xMiAyLjUgMi41LTEuMTIgMi41LTIuNSAyLjV6Ii8+PC9zdmc+",
      iconSize: [32, 32],
      iconAnchor: [16, 32],
      popupAnchor: [0, -32],
    });

    setCustomIcon(icon);

    // Cleanup function
    return () => {
      setIsMounted(false);
      // Force a new map instance on next mount by changing the key
      setMapKey((prev) => prev + 1);
    };
  }, []);

  // Center of Lahore for default map view
  const mapCenter: [number, number] = [31.5204, 74.3587];
  const mapZoom = 13;

  if (!isMounted || !customIcon) {
    return (
      <div className="w-full h-full flex items-center justify-center bg-[#f5f5f5]">
        <div className="text-(--gray-5)">Loading map...</div>
      </div>
    );
  }

  return (
    <div style={{ height: "100%", width: "100%" }}>
      <style jsx global>{`
        .leaflet-popup-content-wrapper {
          background: white;
          border-radius: 8px;
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
          padding: 0;
        }
        .leaflet-popup-content {
          margin: 0;
          min-width: 200px;
        }
        .leaflet-popup-tip {
          background: white;
        }
        .leaflet-container a.leaflet-popup-close-button {
          display: none;
        }
      `}</style>
      <MapContainer
        key={`map-${mapKey}`}
        center={mapCenter}
        zoom={mapZoom}
        scrollWheelZoom={true}
        style={{ height: "100%", width: "100%" }}
        className="z-0"
        zoomControl={false}
      >
        <MapInvalidator />

        {/* Clean light map tiles - Similar to your reference image */}
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
          url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
        />

        {/* Doctor Location Markers */}
        {locations.map((location) => (
          <Marker
            key={location.id}
            position={[location.latitude, location.longitude]}
            icon={customIcon}
          >
            <Popup>
              <div className="p-4">
                <h4 className="t-h4 text-(--gray-9) mb-1">{location.name}</h4>
                {location.specialty && (
                  <p className="t-cap text-primary font-semibold mb-1">{location.specialty}</p>
                )}
                <p className="t-sm text-(--gray-6)">{location.address}</p>
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
}
