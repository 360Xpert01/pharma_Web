"use client";

import React, { useState, useEffect } from "react";
import { Plus, Trash2, Search, ChevronDown, ChevronRight } from "lucide-react";
import Image from "next/image";
import { useAppDispatch, useAppSelector } from "@/store";
import {
  generatePrefix,
  resetGeneratePrefixState,
} from "@/store/slices/preFix/generatePrefixSlice";
import { getAllChannels } from "@/store/slices/channel/getAllChannelsSlice";
import { getAllCallPoints } from "@/store/slices/callPoint/getAllCallPointsSlice";

interface Product {
  id: string;
  code: string;
  name: string;
}

interface Member {
  id: string;
  name: string;
  pulseCode: string;
  role: string;
  bricks?: number[]; // Example bricks
}

export default function CreateCampaignForm() {
  const dispatch = useAppDispatch();

  // Redux selectors
  const {
    generatedPrefix,
    loading: prefixLoading,
    error: prefixError,
  } = useAppSelector((state) => state.generatePrefix);
  const { channels, loading: channelsLoading } = useAppSelector((state) => state.allChannels);
  const { callPoints, loading: callPointsLoading } = useAppSelector((state) => state.allCallPoints);

  // Form States
  const [status, setStatus] = useState<"Active" | "Inactive">("Active");
  const [teamName, setTeamName] = useState("");
  const [selectedChannelId, setSelectedChannelId] = useState("");
  const [selectedCallPointId, setSelectedCallPointId] = useState("");
  const [products, setProducts] = useState<Product[]>([
    { id: "1", code: "PLS_PROD-0034", name: "Amoxicillin" },
    { id: "2", code: "PLS_PROD-0123", name: "Lisinopril" },
    { id: "3", code: "PLS_PROD-0123", name: "Lisinopril" },
    { id: "4", code: "PLS_PROD-0078", name: "Ibuprofen" },
    { id: "5", code: "PLS_PROD-0034", name: "Amoxicillin" },
    { id: "6", code: "PLS_PROD-0123", name: "Lisinopril" },
    { id: "7", code: "PLS_PROD-0123", name: "Lisinopril" },
    { id: "8", code: "PLS_PROD-0078", name: "Ibuprofen" },
  ]);

  const members: Member[] = [
    { id: "1", name: "Ayan Tajammul", pulseCode: "", role: "Area Sales Manager" },
    { id: "2", name: "Arqam Hussain", pulseCode: "", role: "Sales Manager" },
    { id: "3", name: "Majid Hussain", pulseCode: "", role: "Sales Representative" },
    { id: "4", name: "Danish Kumar", pulseCode: "", role: "Sales Representative" },
    {
      id: "5",
      name: "Daniyal Ahmed",
      pulseCode: "",
      role: "Sales Representative",
      bricks: [846, 830, 843, 852, 874, 838, 850, 1023, 841, 859],
    },
  ];

  useEffect(() => {
    // Generate pulse code for "Team" entity
    dispatch(generatePrefix({ entity: "Team" }));

    // Fetch all channels for dropdown
    dispatch(getAllChannels());

    // Fetch all call points for dropdown
    dispatch(getAllCallPoints());

    return () => {
      dispatch(resetGeneratePrefixState());
    };
  }, [dispatch]);

  const removeProduct = (id: string) => {
    setProducts(products.filter((p) => p.id !== id));
  };

  const [openSections, setOpenSections] = useState({
    areaManager: true, // Ayan Tajammul open by default
    salesManager: true, // Arqam Hussain open by default
  });

  const toggleSection = (section: "areaManager" | "salesManager") => {
    setOpenSections((prev) => ({
      ...prev,
      [section]: !prev[section],
    }));
  };

  return (
    <div className=" ">
      <div className="bg-white rounded-2xl shadow-lg p-8 space-y-10">
        {/* Team Name Section */}
        <div className="space-y-6">
          <h2 className="text-2xl font-bold text-gray-900">Team Name</h2>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 items-end">
            <div>
              <label className="block text-sm font-medium text-gray-700">Pulse Code*</label>
              <input
                type="text"
                value={generatedPrefix || ""}
                placeholder={prefixLoading ? "Generating..." : "PLS_TEM_072384"}
                readOnly
                className="mt-1 w-full px-4 py-3 border border-gray-300 rounded-xl bg-gray-50 text-gray-700 cursor-not-allowed outline-none"
                title={prefixError || "Auto-generated pulse code (read-only)"}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Team Name*</label>
              <input
                type="text"
                value={teamName}
                onChange={(e) => setTeamName(e.target.value)}
                placeholder="e.g. High Blood Pressure"
                className="mt-1 w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Channel Name*</label>
              <select
                value={selectedChannelId}
                onChange={(e) => setSelectedChannelId(e.target.value)}
                className="mt-1 w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none bg-white"
              >
                <option value="">Select Channel</option>
                {channelsLoading ? (
                  <option disabled>Loading channels...</option>
                ) : (
                  channels.map((channel) => (
                    <option key={channel.id} value={channel.id}>
                      {channel.name}
                    </option>
                  ))
                )}
              </select>
            </div>
            <div className="flex justify-end">
              <div className="inline-flex border border-gray-300 rounded-full p-1 bg-gray-50">
                <button
                  onClick={() => setStatus("Active")}
                  className={`px-6 py-2 rounded-full text-sm font-medium cursor-pointer ${status === "Active" ? "bg-blue-600 text-white" : "text-gray-600"}`}
                >
                  Active
                </button>
                <button
                  onClick={() => setStatus("Inactive")}
                  className={`px-6 py-2 rounded-full text-sm font-medium cursor-pointer ${status === "Inactive" ? "bg-blue-600 text-white" : "text-gray-600"}`}
                >
                  Inactive
                </button>
              </div>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Call Point*</label>
            <select
              value={selectedCallPointId}
              onChange={(e) => setSelectedCallPointId(e.target.value)}
              className="mt-1 w-full max-w-md px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none bg-white"
            >
              <option value="">Select Call Point</option>
              {callPointsLoading ? (
                <option disabled>Loading call points...</option>
              ) : (
                callPoints.map((callPoint) => (
                  <option key={callPoint.id} value={callPoint.id}>
                    {callPoint.name}
                  </option>
                ))
              )}
            </select>
          </div>
        </div>

        {/* Select Products */}
        <div className="space-y-6">
          <h2 className="text-2xl font-bold text-gray-900">Select Products</h2>

          <div className="flex items-center gap-4">
            <input
              type="text"
              placeholder="Search Product Name"
              className="flex-1 px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none"
            />
            <button className="px-6 py-3 bg-blue-600 text-white rounded-full flex items-center gap-2 hover:bg-blue-700 transition cursor-pointer">
              <Plus className="w-5 h-5" />
              Add Products
            </button>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {products.map((product) => (
              <div
                key={product.id}
                className="bg-gray-50 border border-gray-200 rounded-xl p-4 flex items-center justify-between hover:bg-gray-100 transition"
              >
                <div>
                  <p className="text-sm font-semibold text-gray-900">{product.code}</p>
                  <p className="text-sm text-gray-600">{product.name}</p>
                </div>
                <button
                  onClick={() => removeProduct(product.id)}
                  className="text-red-500 hover:text-red-700 cursor-pointer"
                >
                  <Trash2 className="w-5 h-5" />
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Assign Members */}
        <div className="space-y-6 py-8">
          {/* Section Title + Search */}
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Assign Members</h2>
            <div className="relative max-w-md">
              <input
                type="text"
                placeholder="e.g. john doe (Optional)"
                className="w-full px-4 py-3 pl-12 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none text-gray-600"
              />
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            </div>
          </div>

          {/* Hierarchy Tree */}
          <div className="relative">
            {/* Main Vertical Line (from top to bottom) */}
            {/* <div className="absolute left-10 top-10 bottom-[408px] border-t-4  border-dotted  w-0.5 bg-gray-300 z-0" /> */}
            <div className="absolute left-10 top-10 bottom-[408px] border-l-2 border-dotted border-gray-300 z-0" />

            {/* Level 1: Area Sales Manager */}
            <div className="relative">
              <div
                onClick={() => toggleSection("areaManager")}
                className="flex items-center gap-4 bg-white border border-gray-200 rounded-2xl p-6 hover:shadow-md transition-all cursor-pointer select-none"
              >
                <button className="flex-shrink-0 w-8 h-8 flex items-center justify-center cursor-pointer">
                  {openSections.areaManager ? (
                    <ChevronDown className="w-5 h-5 text-gray-600" />
                  ) : (
                    <ChevronRight className="w-5 h-5 text-gray-600" />
                  )}
                </button>

                <div className="w-12 h-12 rounded-full bg-gray-300 overflow-hidden flex-shrink-0">
                  <Image
                    src="/ayan.jpg"
                    alt="Ayan"
                    width={48}
                    height={48}
                    className="object-cover"
                  />
                </div>

                <div className="flex-1">
                  <p className="font-semibold text-gray-900">Ayan Tajammul</p>
                  <p className="text-sm text-gray-600">Area Sales Manager</p>
                </div>

                <button className="text-gray-400 hover:text-gray-600 cursor-pointer">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z"
                    />
                  </svg>
                </button>
              </div>

              {/* Children of Area Manager - Only show if open */}
              {openSections.areaManager && (
                <div className="relative mt-4">
                  {/* Horizontal + Vertical Line for children */}
                  {/* <div className="absolute left-10 top-0 bottom-0 w-0.5 bg-gray-300" /> */}
                  <div className="absolute left-10 top-8 border-t-2 border-gray-100 border-dotted  w-12 h-0.5 bg-gray-300" />

                  {/* Level 2: Sales Manager */}
                  <div className="ml-16 relative">
                    <div
                      onClick={() => toggleSection("salesManager")}
                      className="flex items-center gap-4 bg-white border border-gray-200 rounded-2xl p-6 hover:shadow-md transition-all cursor-pointer select-none"
                    >
                      <button className="flex-shrink-0 w-8 h-8 flex items-center justify-center cursor-pointer">
                        {openSections.salesManager ? (
                          <ChevronDown className="w-5 h-5 text-gray-600" />
                        ) : (
                          <ChevronRight className="w-5 h-5 text-gray-600" />
                        )}
                      </button>

                      <div className="w-12 h-12 rounded-full bg-gray-300 overflow-hidden flex-shrink-0">
                        <Image
                          src="/arqam.jpg"
                          alt="Arqam"
                          width={48}
                          height={48}
                          className="object-cover"
                        />
                      </div>

                      <div className="flex-1">
                        <p className="font-semibold text-gray-900">Arqam Hussain</p>
                        <p className="text-sm text-gray-600">Sales Manager</p>
                      </div>

                      <button className="text-gray-400 hover:text-gray-600 cursor-pointer">
                        <svg
                          className="w-6 h-6"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z"
                          />
                        </svg>
                      </button>
                    </div>

                    {/* Children of Sales Manager - Only show if open */}
                    {openSections.salesManager && (
                      <div className="relative mt-4">
                        {/* Vertical Line for Sales Reps */}
                        {/* <div className="absolute left-10 top-0 bottom-13 w-0.5 bg-gray-300" /> */}
                        {/* <div className="absolute left-10 top-8 w-6 h-0.5 border-l-2 border-dotted  bg-gray-300" /> */}
                        <div className="absolute left-10 top-0 bottom-13 border-l-2 border-dotted border-gray-300" />
                        <div className="absolute left-10 top-8 w-6 border-t-2 border-dotted border-gray-300" />

                        {/* Level 3: Sales Representatives */}
                        <div className="ml-16 space-y-4">
                          {/* Majid Hussain */}
                          <div className="bg-white border border-gray-200 rounded-2xl p-6 flex items-center justify-between hover:shadow-md transition">
                            <div className="flex items-center gap-4">
                              <div className="w-12 h-12 rounded-full bg-gray-300 overflow-hidden">
                                <Image
                                  src="/majid.jpg"
                                  alt="Majid"
                                  width={48}
                                  height={48}
                                  className="object-cover"
                                />
                              </div>
                              <div>
                                <p className="font-semibold text-gray-900">Majid Hussain</p>
                                <p className="text-sm text-gray-600">Sales Representative</p>
                              </div>
                            </div>
                            <button className="px-6 py-3 bg-blue-600 text-white rounded-full flex items-center gap-2 hover:bg-blue-700 shadow-sm cursor-pointer">
                              <Plus className="w-5 h-5" />
                              Assign Bricks
                            </button>
                          </div>

                          {/* Danish Kumar */}
                          {/* <div className="absolute left-10 top-38 w-6 h-0.5 bg-gray-300" /> */}
                          <div className="absolute left-10 top-38 w-6 border-t-2 border-dotted border-gray-300" />

                          <div className="bg-white border border-gray-200 rounded-2xl p-6 flex items-center justify-between hover:shadow-md transition">
                            <div className="flex items-center gap-4">
                              <div className="w-12 h-12 rounded-full bg-gray-300 overflow-hidden">
                                <Image
                                  src="/danish.jpg"
                                  alt="Danish"
                                  width={48}
                                  height={48}
                                  className="object-cover"
                                />
                              </div>
                              <div>
                                <p className="font-semibold text-gray-900">Danish Kumar</p>
                                <p className="text-sm text-gray-600">Sales Representative</p>
                              </div>
                            </div>
                            <div className="relative max-w-xs">
                              <input
                                type="text"
                                placeholder="e.g. KL123, KL456, KL789"
                                className="w-full px-4 py-3 pl-10 border border-gray-300 rounded-full focus:ring-2 focus:ring-blue-500 outline-none text-sm"
                              />
                              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                            </div>
                          </div>

                          {/* Daniyal Ahmed */}
                          <div className="absolute left-10 top-68 w-6 border-t-2 border-gray-100 border-dotted h-0.5 bg-gray-300" />

                          <div className="bg-white border border-gray-200 rounded-2xl p-6 flex items-center justify-between hover:shadow-md transition">
                            <div className="flex items-center gap-4">
                              <div className="w-12 h-12 rounded-full bg-gray-300 overflow-hidden">
                                <Image
                                  src="/girlPic.svg"
                                  alt="Daniyal"
                                  width={48}
                                  height={48}
                                  className="object-cover"
                                />
                              </div>
                              <div>
                                <p className="font-semibold text-gray-900">Daniyal Ahmed</p>
                                <p className="text-sm text-gray-600">Sales Representative</p>
                              </div>
                            </div>
                            <div className="flex items-center gap-3">
                              <div className="flex flex-wrap gap-2">
                                {[
                                  "L46",
                                  "939 x",
                                  "L43",
                                  "L52",
                                  "874",
                                  "L38",
                                  "L59",
                                  "1023",
                                  "L41",
                                  "L55",
                                ].map((brick) => (
                                  <span
                                    key={brick}
                                    className="px-3 py-1.5 bg-blue-100 text-blue-700 text-sm font-medium rounded-full"
                                  >
                                    {brick}
                                  </span>
                                ))}
                              </div>
                              <button className="px-6 py-3 bg-blue-600 text-white rounded-full flex items-center gap-2 hover:bg-blue-700 shadow-sm cursor-pointer">
                                <Plus className="w-5 h-5" />
                                Assign Bricks
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Buttons */}
        <div className="flex justify-end gap-4 pt-6">
          <button className="px-6 py-3 border border-gray-300 text-gray-700 rounded-full hover:bg-gray-50 transition cursor-pointer">
            Discard
          </button>
          <button className="px-8 py-3 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition flex items-center gap-2 shadow-lg cursor-pointer">
            <Plus className="w-5 h-5" />
            Add Campaign
          </button>
        </div>
      </div>
    </div>
  );
}
