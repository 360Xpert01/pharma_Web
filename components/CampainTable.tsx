"use client";

import React, { useState } from "react";
import { MoreVertical } from "lucide-react";
import TableColumnHeader from "@/components/TableColumnHeader";

interface Campaign {
  id: string;
  name: string;
  channel: string;
  brand: string;
  productTitle?: string;
  products: string[];
  assignedUsers: string[];
  status: "Active" | "Inactive";
}

const campaignsData: Campaign[] = [
  {
    id: "1",
    name: "Migraine Headache",
    channel: "Doctors",
    brand: "Haleon",
    productTitle: "Panadol",
    products: ["Panadol Extra", "Paracetamol", "Caffeine"],
    assignedUsers: ["/u1.jpg", "/u2.jpg", "/u3.jpg", "/u4.jpg", "/u5.jpg"],
    status: "Active",
  },
  {
    id: "2",
    name: "High Blood Pressure",
    channel: "Chain Pharmacy",
    brand: "PharmaCorp",
    productTitle: "Amlodipine",
    products: ["Lisinopril", "Losartan", "Hydrochlorothiazide"],
    assignedUsers: ["/u6.jpg", "/u7.jpg", "/u8.jpg", "/u9.jpg"],
    status: "Active",
  },
  {
    id: "3",
    name: "Asthma",
    channel: "Doctors",
    productTitle: "Albuterol",
    brand: "HealthPlus",
    products: ["Budesonide", "Levalbuterol", "Montelukast"],
    assignedUsers: ["/u10.jpg", "/u11.jpg", "/u12.jpg"],
    status: "Active",
  },
  {
    id: "4",
    name: "Diabetes Type 2",
    channel: "Pharmacy/Stores",
    productTitle: "Metformin",
    brand: "Medico",
    products: ["Glyburide", "Dapagliflozin", "Liraglutide"],
    assignedUsers: ["/u13.jpg", "/u14.jpg", "/u15.jpg", "/u16.jpg"],
    status: "Active",
  },
  {
    id: "5",
    name: "Cholesterol",
    channel: "GT’s",
    productTitle: "Cetirizine",
    brand: "CardioCare",
    products: ["Simvastatin", "Rosuvastatin", "Ezetimibe"],
    assignedUsers: ["/u17.jpg", "/u18.jpg", "/u19.jpg"],
    status: "Inactive",
  },
  {
    id: "6",
    name: "Allergies",
    channel: "Doctors",
    productTitle: "Cetirizine",
    brand: "AllergyRelief",
    products: ["Loratadine", "Fexofenadine", "Desloratadine"],
    assignedUsers: ["/u20.jpg", "/u21.jpg", "/u22.jpg", "/u23.jpg", "/u24.jpg"],
    status: "Active",
  },
  {
    id: "7",
    name: "Arthritis",
    channel: "Pharmacy/Stores",
    productTitle: "Ibuprofen",
    brand: "PainManagement",
    products: ["Naproxen", "Celecoxib", "Diclofenac"],
    assignedUsers: ["/u25.jpg", "/u26.jpg", "/u27.jpg", "/u28.jpg"],
    status: "Active",
  },
  {
    id: "8",
    name: "Anxiety",
    channel: "Doctors",
    productTitle: "Sertraline",
    brand: "MentalWellness",
    products: ["Escitalopram", "Fluoxetine", "Paroxetine"],
    assignedUsers: ["/u29.jpg", "/u30.jpg"],
    status: "Active",
  },
];
export default function CampaignsTable() {
  // Har row ka apna dropdown state
  const [openId, setOpenId] = useState<string | null>(null);

  const handleToggle = (id: string) => {
    setOpenId((prev) => (prev === id ? null : id));
  };

  // Table header columns
  const campaignColumns = [
    { label: "Name", className: "col-span-2" },
    { label: "Channel", className: "col-span-2" },
    { label: "Brand", className: "col-span-2" },
    { label: "Products", className: "col-span-2 ml-6" },
    { label: "Assigned", className: "col-span-2 ml-[160px]" },
    { label: "Status", className: "col-span-1 ml-[80px]" },
    { label: "", className: "col-span-1 ml-6" },
  ];

  return (
    <div className="w-full overflow-hidden">
      {/* Header */}
      <div className="px-3">
        <TableColumnHeader columns={campaignColumns} gridCols={12} />
      </div>

      {/* Rows */}
      <div>
        {campaignsData.map((campaign) => (
          <div
            key={campaign.id}
            className="px-3 py-1 hover:bg-gray-50 transition-colors duration-200 relative"
            onClick={() => setOpenId(null)}
          >
            {/* Grid with all columns including actions */}
            <div className="rounded-md p-2 border border-gray-200 grid grid-cols-12 gap-3 text-sm">
              {/* Name */}
              <div className="col-span-2 font-semibold text-font-semibold">{campaign.name}</div>

              {/* Channel */}
              <div className="col-span-2 font-semibold text-black">{campaign.channel}</div>

              {/* Brand */}
              <div className="col-span-2 font-semibold text-black">{campaign.brand}</div>

              {/* Products */}
              <div className="col-span-2">
                <p className="font-bold mb-0">{campaign.productTitle}</p>
                <div className="flex flex-wrap gap-1">
                  {campaign.products.map((product, idx) => (
                    <span key={idx} className="text-gray-400 text-sm font-normal">
                      {product}
                    </span>
                  ))}
                </div>
              </div>

              {/* Assigned Users */}
              <div className="col-span-2 flex items-center ml-[150px]">
                <div className="flex -space-x-2">
                  {campaign.assignedUsers.slice(0, 5).map((avatar, idx) => (
                    <div
                      key={idx}
                      className="w-9 h-9 rounded-full border-2 border-white overflow-hidden ring-2 ring-gray-100"
                    >
                      <img
                        src={avatar}
                        alt={`User ${idx + 1}`}
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          e.currentTarget.src = `https://ui-avatars.com/api/?name=User+${idx + 1}`;
                        }}
                      />
                    </div>
                  ))}

                  {campaign.assignedUsers.length > 5 && (
                    <div className="w-9 h-9 rounded-full border-2 border-white flex items-center justify-center text-xs font-medium text-gray-600 ring-2 ring-gray-100">
                      +{campaign.assignedUsers.length - 5}
                    </div>
                  )}
                </div>
              </div>

              {/* Status */}
              <div className="col-span-1 flex items-center justify-center ml-[100px]">
                <span
                  className={`px-4 min-w-[90px] text-center py-1 rounded-full text-sm font-medium ${
                    campaign.status === "Active"
                      ? "bg-green-100 text-green-600"
                      : "bg-gray-100 text-gray-600"
                  }`}
                >
                  {campaign.status}
                </span>
              </div>

              {/* Actions - Inside grid */}
              <div
                className="col-span-1 flex items-center justify-center ml-6"
                onClick={(e) => e.stopPropagation()}
              >
                <button
                  onClick={() => handleToggle(campaign.id)}
                  className="text-gray-400 hover:text-gray-600 transition"
                >
                  <MoreVertical className="w-5 h-5" />
                </button>

                {/* Dropdown */}
                {openId === campaign.id && (
                  <div className="absolute right-0 top-6 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 z-50">
                    <button
                      onClick={() => {
                        console.log("Edit", campaign.id);
                        setOpenId(null);
                      }}
                      className="w-full text-left px-4 py-2 text-sm hover:bg-gray-100"
                    >
                      Edit
                    </button>

                    <button
                      onClick={() => {
                        console.log("Duplicate", campaign.id);
                        setOpenId(null);
                      }}
                      className="w-full text-left px-4 py-2 text-sm hover:bg-gray-100"
                    >
                      Duplicate
                    </button>

                    <button
                      onClick={() => {
                        console.log("Delete", campaign.id);
                        setOpenId(null);
                      }}
                      className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100"
                    >
                      Delete
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
