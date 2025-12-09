"use client";

import React, { useState } from "react";
import { Search, Plus, Trash2, X } from "lucide-react";
import Image from "next/image";

interface Product {
  id: string;
  code: string;
  date: string;
  name: string;
  skus: string[];
}

interface Rep {
  id: string;
  name: string;
  avatar: string;
  brick: string;
}

const products: Product[] = [
  {
    id: "1",
    code: "BRND12345678",
    date: "2025-09-20",
    name: "Amoxicillin",
    skus: ["Capsule 500mg", "Capsule 800mg", "Capsule 1200mg"],
  },
  { id: "2", code: "BRND23456789", date: "2025-10-15", name: "Ibuprofen", skus: ["Tablet 200mg"] },
  {
    id: "3",
    code: "BRND34567890",
    date: "2025-11-10",
    name: "Simvastatin",
    skus: ["Tablet 10mg", "Tablet 40mg"],
  },
  {
    id: "4",
    code: "BRND45678901",
    date: "2025-12-05",
    name: "Lisinopril",
    skus: ["Tablet 5mg", "Tablet 10mg"],
  },
];

const repsData: Rep[] = [
  { id: "1", name: "Ahmed Khan", avatar: "/girlPic.svg", brick: "Nazimabad" },
  { id: "2", name: "Sara Ali", avatar: "/girlPic.svg", brick: "Gulshan" },
  { id: "3", name: "Omar Farooq", avatar: "/girlPic.svg", brick: "Clifton" },
  { id: "4", name: "Ayesha Siddiqui", avatar: "/girlPic.svg", brick: "Defence" },
];

export default function CreateTeamForm() {
  const [teamName, setTeamName] = useState("");
  const [channel, setChannel] = useState("");
  const [callPoint, setCallPoint] = useState("");
  const [status, setStatus] = useState("Active");
  const [searchQuery, setSearchQuery] = useState("");
  const [searchQueryPeople, setSearchQueryPeople] = useState("");
  const [selectedProducts, setSelectedProducts] = useState<Product[]>([]);
  const [assignedReps, setAssignedReps] = useState<Rep[]>([]);
  const [pulseGenerated, setPulseGenerated] = useState<Rep[]>([]);

  const filteredProducts = products.filter(
    (p) =>
      p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.code.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const addProduct = (product: Product) => {
    if (!selectedProducts.find((p) => p.id === product.id)) {
      setSelectedProducts([...selectedProducts, product]);
    }
    setSearchQuery("");
  };

  const removeProduct = (id: string) => {
    setSelectedProducts(selectedProducts.filter((p) => p.id !== id));
  };

  const toggleRep = (rep: Rep) => {
    if (assignedReps.find((r) => r.id === rep.id)) {
      setAssignedReps(assignedReps.filter((r) => r.id !== rep.id));
    } else {
      setAssignedReps([...assignedReps, rep]);
    }
  };

  return (
    <div className="w-full bg-white rounded-3xl shadow-lg border border-gray-100 ">
      <div className="p-10 space-y-10">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Create New Team</h1>
          <p className="text-sm text-gray-500 mt-2">
            Configure your sales team with products and territories
          </p>
        </div>

        {/* Team Info */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Team Code */}
          {/* Team Name */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Team Name <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              value={teamName}
              onChange={(e) => setTeamName(e.target.value)}
              placeholder="e.g. Karachi North Team"
              className="w-full px-5 py-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Team Code</label>
            <div className="px-5 py-4 bg-gray-50 border border-gray-200 rounded-xl font-mono text-gray-900">
              TEAM-X9K2P7M
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Pulse Generated Code
              <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              value={pulseGenerated}
              onChange={(e) => setPulseGenerated(e.target.value)}
              placeholder="Pulse Generated Code"
              className="w-full px-5 py-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none"
            />
          </div>

          {/* Channel */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Channel <span className="text-red-500">*</span>
            </label>
            <select
              value={channel}
              onChange={(e) => setChannel(e.target.value)}
              className="w-full px-5 py-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none bg-white"
            >
              <option value="">Select Channel</option>
              <option>Doctor</option>
              <option>Pharmacy</option>
              <option>Hospital</option>
              <option>Clinic</option>
            </select>
          </div>

          {/* Call Point */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Call Point <span className="text-red-500">*</span>
            </label>
            <select
              value={callPoint}
              onChange={(e) => setCallPoint(e.target.value)}
              className="w-full px-5 py-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none bg-white"
            >
              <option value="">Select Call Point</option>
              <option>A.O Clinic</option>
              <option>360Xpert Solutions</option>
              <option>UBL Sports Complex</option>
            </select>
          </div>

          {/* Status */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Status <span className="text-red-500">*</span>
            </label>
            <select
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              className="w-full px-5 py-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none bg-white"
            >
              <option>Active</option>
              <option>Inactive</option>
            </select>
          </div>
        </div>

        {/* Product Search */}
        <div>
          <h2 className="text-xl font-bold text-gray-900 mb-4">Select Products</h2>
          <div className="relative">
            <Search className="absolute left-4 top-4 w-5 h-5 text-gray-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by product name or code..."
              className="w-full pl-12 pr-5 py-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none"
            />
          </div>

          {/* Search Results */}
          {searchQuery && (
            <div className="mt-3 space-y-2 max-h-60 overflow-y-auto bg-gray-50 rounded-xl p-4 border border-gray-200">
              {filteredProducts.map((product) => (
                <div
                  key={product.id}
                  onClick={() => addProduct(product)}
                  className="p-3 bg-white rounded-lg hover:bg-blue-50 cursor-pointer border border-gray-200 transition"
                >
                  <div className="flex justify-between items-center">
                    <div>
                      <span className="font-medium">{product.name}</span>
                      <span className="text-sm text-gray-500 ml-3">{product.code}</span>
                    </div>
                    <span className="text-sm text-gray-600">{product.skus.join(", ")}</span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Selected Products */}
        {selectedProducts.length > 0 && (
          <div>
            <h2 className="text-xl font-bold text-gray-900 mb-4">Selected Products</h2>
            <div className="space-y-3">
              {selectedProducts.map((product) => (
                <div
                  key={product.id}
                  className="bg-gray-50 rounded-xl p-5 flex items-center justify-between border border-gray-200"
                >
                  <div className="grid grid-cols-4 gap-6 flex-1">
                    <div>
                      <p className="text-xs text-gray-500">Product Code</p>
                      <p className="font-mono font-bold">{product.code}</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500">Added On</p>
                      <p className="font-medium">{product.date}</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500">Product Name</p>
                      <p className="font-medium">{product.name}</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500">SKUs</p>
                      <p className="text-sm text-gray-700">{product.skus.join(" | ")}</p>
                    </div>
                  </div>
                  <button
                    onClick={() => removeProduct(product.id)}
                    className="ml-6 text-red-500 hover:bg-red-50 p-2 rounded-lg transition"
                  >
                    <Trash2 className="w-5 h-5" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Assign Agents - FULLY WORKING VERSION */}
        <div>
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Assign Agents</h2>

          <div className="flex flex-col lg:flex-row items-start lg:items-center gap-8">
            {/* Search Input */}
            <div className="flex-1 max-w-lg">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Enter Agent Name
              </label>
              <div className="relative">
                <Search className="absolute left-4 top-4 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  value={searchQueryPeople}
                  onChange={(e) => setSearchQueryPeople(e.target.value)}
                  placeholder="e.g john doe (Optional)"
                  className="w-full pl-12 pr-5 py-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none bg-white"
                />
              </div>

              {/* Search Suggestions Dropdown */}
              {searchQueryPeople && (
                <div className="mt-2 w-full bg-white border border-gray-200 rounded-xl shadow-lg max-h-64 overflow-y-auto z-10">
                  {repsData
                    .filter((rep) =>
                      rep.name.toLowerCase().includes(searchQueryPeople.toLowerCase())
                    )
                    .map((rep) => (
                      <div
                        key={rep.id}
                        onClick={() => {
                          if (!assignedReps.find((r) => r.id === rep.id)) {
                            setAssignedReps([...assignedReps, rep]);
                          }
                          setSearchQueryPeople(""); // clear search after selection
                        }}
                        className="flex items-center gap-4 px-4 py-3 hover:bg-gray-50 cursor-pointer transition"
                      >
                        <Image
                          src={rep.avatar}
                          alt={rep.name}
                          width={40}
                          height={40}
                          className="rounded-full"
                        />
                        <div className="ml-3">
                          <p className="font-medium text-gray-900">{rep.name}</p>
                          <p className="text-sm text-gray-500">{rep.brick}</p>
                        </div>
                      </div>
                    ))}
                </div>
              )}
            </div>

            {/* Selected Agents Avatars */}
            <div className="flex items-center -space-x-4">
              {assignedReps.length === 0 ? (
                <span className="text-gray-400 text-sm italic">No agents assigned yet</span>
              ) : (
                <>
                  {assignedReps.map((rep, index) => (
                    <div
                      key={rep.id}
                      className="relative group"
                      style={{ zIndex: assignedReps.length - index }}
                    >
                      <Image
                        src={rep.avatar}
                        alt={rep.name}
                        width={56}
                        height={56}
                        className="rounded-full border-4 border-white shadow-md ring-2 ring-gray-100"
                      />
                      {/* Remove Button on Hover */}
                      <button
                        onClick={() => toggleRep(rep)}
                        className="absolute inset-0 rounded-full bg-black/70 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center"
                      >
                        <X className="w-7 h-7 text-white" />
                      </button>
                    </div>
                  ))}

                  {/* Plus Button to add more */}
                  {assignedReps.length < repsData.length && (
                    <div className="w-14 h-14 rounded-full bg-gradient-to-br from-blue-500 to-blue-600 border-4 border-white shadow-lg flex items-center justify-center cursor-pointer hover:from-blue-600 hover:to-blue-700 transition">
                      <Plus className="w-7 h-7 text-white" />
                    </div>
                  )}
                </>
              )}
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex justify-end gap-4 pt-8 border-t border-gray-200">
          <button className="px-8 py-3.5 border border-gray-300 text-gray-700 font-medium rounded-full hover:bg-gray-50 transition">
            Discard
          </button>
          <button className="px-10 py-3.5 bg-blue-600 text-white font-medium rounded-full hover:bg-blue-700 transition flex items-center gap-3 shadow-lg">
            <Plus className="w-5 h-5" />
            Create Team
          </button>
        </div>
      </div>
    </div>
  );
}
