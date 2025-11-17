"use client";

import React from "react";
import { MoreVertical } from "lucide-react";

interface Campaign {
  id: string;
  condition: string;
  channel: string;
  brand: string;
  productTitle?: string;
  products: string[];
  assignedUsers: string[]; // array of avatar URLs
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
  return (
    <div className="w-full  items-center overflow-hidden">
      <div className="">
        {campaignsData.map((campaign) => (
          <div
            key={campaign.id}
            className="px-8  py-1  hover:bg-gray-50 transition-colors duration-200 flex items-center justify-between"
          >
            {/* Left Side */}
            <div className="flex-1 items-center justify-center rounded-md p-2 border border-gray-200   grid grid-cols-12 gap-2 text-sm">
              {/* Condition */}
              <div className="col-span-2 font-medium text-gray-900">{campaign.condition}</div>

              {/* Channel */}
              <div className="col-span-2 text-gray-600">{campaign.channel}</div>

              {/* Brand */}
              <div className="col-span-2 font-medium text-gray-900">{campaign.brand}</div>

              {/* Products */}
              <div className="col-span-4 text-gray-600">
                <p className="font-bold mb-1">{campaign.productTitle}</p>
                <div className="flex flex-wrap gap-2">
                  {campaign.products.map((product, idx) => (
                    <span
                      key={idx}
                      className="px-2.5 py-1 bg-gray-100 text-gray-700 rounded-full text-xs font-medium"
                    >
                      {product}
                    </span>
                  ))}
                </div>
              </div>

              {/* Assigned Users + Status */}
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
                    <div className="w-9 h-9 rounded-full bg-gray-200 border-2 border-white flex items-center justify-center text-xs font-medium text-gray-600 ring-2 ring-gray-100">
                      +{campaign.assignedUsers.length - 5}
                    </div>
                  )}
                </div>

                {/* Status Badge */}
                <span
                  className={`px-6 py-3 rounded-full text-sm font-medium ${
                    campaign.status === "Active"
                      ? "bg-green-100 text-green-800"
                      : "bg-gray-100 text-gray-600"
                  }`}
                >
                  {campaign.status}
                </span>

                {/* More Options */}
                <button className="text-gray-400 hover:text-gray-600 transition">
                  <MoreVertical className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
