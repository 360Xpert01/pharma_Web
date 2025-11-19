"use client";

import React, { useState } from "react";
import { MoreVertical } from "lucide-react";

interface Campaign {
  id: string;
  condition: string;
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
    condition: "Migraine Headache",
    channel: "Doctors",
    brand: "Haleon",
    productTitle: "Panadol",
    products: ["Panadol Extra", "Paracetamol", "Caffeine"],
    assignedUsers: ["/u1.jpg", "/u2.jpg", "/u3.jpg", "/u4.jpg", "/u5.jpg"],
    status: "Active",
  },
  {
    id: "2",
    condition: "High Blood Pressure",
    channel: "Chain Pharmacy",
    brand: "PharmaCorp",
    productTitle: "Amlodipine",
    products: ["Lisinopril", "Losartan", "Hydrochlorothiazide"],
    assignedUsers: ["/u6.jpg", "/u7.jpg", "/u8.jpg", "/u9.jpg"],
    status: "Active",
  },
  {
    id: "3",
    condition: "Asthma",
    channel: "Doctors",
    productTitle: "Albuterol",
    brand: "HealthPlus",
    products: ["Budesonide", "Levalbuterol", "Montelukast"],
    assignedUsers: ["/u10.jpg", "/u11.jpg", "/u12.jpg"],
    status: "Active",
  },
  {
    id: "4",
    condition: "Diabetes Type 2",
    channel: "Pharmacy/Stores",
    productTitle: "Metformin",
    brand: "Medico",
    products: ["Glyburide", "Dapagliflozin", "Liraglutide"],
    assignedUsers: ["/u13.jpg", "/u14.jpg", "/u15.jpg", "/u16.jpg"],
    status: "Active",
  },
  {
    id: "5",
    condition: "Cholesterol",
    channel: "GT’s",
    productTitle: "",
    brand: "CardioCare",
    products: ["Simvastatin", "Rosuvastatin", "Ezetimibe"],
    assignedUsers: ["/u17.jpg", "/u18.jpg", "/u19.jpg"],
    status: "Inactive",
  },
  {
    id: "6",
    condition: "Allergies",
    channel: "Doctors",
    productTitle: "Cetirizine",
    brand: "AllergyRelief",
    products: ["Loratadine", "Fexofenadine", "Desloratadine"],
    assignedUsers: ["/u20.jpg", "/u21.jpg", "/u22.jpg", "/u23.jpg", "/u24.jpg"],
    status: "Active",
  },
  {
    id: "7",
    condition: "Arthritis",
    channel: "Pharmacy/Stores",
    productTitle: "Ibuprofen",
    brand: "PainManagement",
    products: ["Naproxen", "Celecoxib", "Diclofenac"],
    assignedUsers: ["/u25.jpg", "/u26.jpg", "/u27.jpg", "/u28.jpg"],
    status: "Active",
  },
  {
    id: "8",
    condition: "Anxiety",
    channel: "Doctors",
    productTitle: "Sertraline",
    brand: "MentalWellness",
    products: ["Escitalopram", "Fluoxetine", "Paroxetine"],
    assignedUsers: ["/u29.jpg", "/u30.jpg"],
    status: "Active",
  },
];

export default function CampaignsTable() {
  // Ab har row ka apna dropdown state
  const [openId, setOpenId] = useState<string | null>(null);

  return (
    <div className="w-full items-center overflow-hidden">
      <div className="">
        {campaignsData.map((campaign) => (
          <div
            key={campaign.id}
            className="px-8 py-1 hover:bg-gray-50 transition-colors duration-200 flex items-center justify-between relative"
          >
            {/* Left Side - Tumhara original grid */}
            <div className="flex-1 items-center justify-center rounded-md p-2 border border-gray-200 grid grid-cols-12 gap-2 text-sm">
              {/* Condition */}
              <div className="col-span-2 font-semibold font-sans text-font-semibold">
                {campaign.condition}
              </div>

              {/* Channel */}
              <div className="col-span-2 font-semibold font-sans text-black">
                {campaign.channel}
              </div>

              {/* Brand */}
              <div className="col-span-2 font-semibold text-black">{campaign.brand}</div>

              {/* Products */}
              <div className="col-span-4 font-semibold text-black">
                <p className="font-bold mb-1">{campaign.productTitle}</p>
                <div className="flex flex-wrap gap-2">
                  {campaign.products.map((product, idx) => (
                    <span key={idx} className="py-1 text-gray-400 rounded-full text-sm font-normal">
                      {product}
                    </span>
                  ))}
                </div>
              </div>

              {/* Assigned Users + Status + More Button */}
              <div className="col-span-2 flex items-center justify-end gap-4">
                {/* Avatar Stack */}
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
                          e.currentTarget.src = `https://ui-avatars.com/api/?name=User+${idx + 1}&background=random`;
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

                {/* Status Badge */}
                <span
                  className={`px-7 py-1 rounded-full text-sm font-medium ${
                    campaign.status === "Active"
                      ? "bg-green-100 text-green-600"
                      : "bg-gray-100 text-gray-600"
                  }`}
                >
                  {campaign.status}
                </span>

                {/* More Options Button */}
                <div className="relative">
                  <button
                    onClick={() => setOpenId(openId === campaign.id ? null : campaign.id)}
                    className="text-gray-400 hover:text-gray-600 transition"
                  >
                    <MoreVertical className="w-5 h-5" />
                  </button>

                  {/* Dropdown - Sirf isi row ka */}
                  {openId === campaign.id && (
                    <>
                      <div className="fixed inset-0 z-40" onClick={() => setOpenId(null)} />
                      <div className="absolute right-0 top-6 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 z-50">
                        <div className="py-1">
                          <button
                            onClick={() => {
                              console.log("Edit", campaign.id);
                              setOpenId(null);
                            }}
                            className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                          >
                            Edit
                          </button>
                          <button
                            onClick={() => {
                              console.log("Duplicate", campaign.id);
                              setOpenId(null);
                            }}
                            className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
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
                      </div>
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
