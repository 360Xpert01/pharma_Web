"use client";

import React, { useState } from "react";
import { ChevronDown, Edit2, Trash2, Search } from "lucide-react";
import Image from "next/image";
import { EmployeeTarget } from "@/types/target";

interface TargetEmployeeCardProps {
  target: EmployeeTarget;
  month: string;
}

export default function TargetEmployeeCard({ target, month }: TargetEmployeeCardProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [editingProduct, setEditingProduct] = useState<string | null>(null);
  const [editValues, setEditValues] = useState<{
    monthlyTarget: number;
    share: number;
  }>({ monthlyTarget: 0, share: 0 });

  const handleEdit = (productId: string, currentTarget: number, currentShare: number) => {
    setEditingProduct(productId);
    setEditValues({
      monthlyTarget: currentTarget,
      share: currentShare,
    });
  };

  const handleSaveEdit = (productId: string) => {
    console.log("Save edit for product:", productId, editValues);
    // TODO: Implement save functionality
    setEditingProduct(null);
  };

  const handleCancelEdit = () => {
    setEditingProduct(null);
  };

  const handleDelete = (productId: string) => {
    console.log("Delete product:", productId);
    // TODO: Implement delete functionality
  };

  const getStatusBadgeColor = (status: string) => {
    switch (status) {
      case "L43":
        return "bg-red-200 text-red-600";
      case "L02":
        return "bg-blue-500 text-gray-50";
      case "E74":
        return "bg-blue-500 text-gray-50";
      default:
        return "bg-gray-50 text-gray-600";
    }
  };

  return (
    <div className="bg-(--background) rounded-2xl border border-gray-200 overflow-hidden hover:bg-gray-50 transition-colors">
      {/* Employee Header - Always Visible */}
      <div className="px-6 py-4">
        <div className="flex items-center">
          {/* Month Label - 10% */}
          <div className="w-[10%]">
            <h3 className="text-sm font-bold text-gray-900">{month}</h3>
          </div>

          {/* Employee Profile - 18% */}
          <div className="w-[18%] flex items-center gap-3">
            <Image
              src={target.profilePicture || "/girlPic.svg"}
              alt={target.employeeName}
              width={40}
              height={40}
              className="rounded-full"
            />
            <div>
              <h3 className="font-bold text-gray-900 text-sm">{target.employeeName}</h3>
              <p className="text-xs text-gray-500">{target.employeeRole}</p>
            </div>
          </div>

          {/* Team Name - 18% */}
          <div className="w-[18%]">
            <p className="text-sm text-gray-900 font-medium">{target.teamName}</p>
          </div>

          {/* Channel Name - 18% */}
          <div className="w-[18%]">
            <p className="text-sm text-gray-900 font-medium">{target.channelName}</p>
          </div>

          {/* Line Manager - 18% */}
          <div className="w-[18%]">
            <p className="text-sm text-gray-900 font-medium">{target.lineManager}</p>
          </div>

          {/* View Details Button */}
          <div className="w-[10%] flex justify-end">
            <button
              onClick={() => setIsExpanded(!isExpanded)}
              className="flex items-center gap-2 text-sm text-gray-500 hover:text-gray-900 transition whitespace-nowrap cursor-pointer"
            >
              <span className="font-medium">View Details</span>
              <ChevronDown
                className={`w-4 h-4 transition-transform ${isExpanded ? "rotate-180" : ""}`}
              />
            </button>
          </div>
        </div>
      </div>

      {/* Expanded Products Section - Only show when expanded */}
      <div
        className={`border-t border-gray-200 bg-gray-50 overflow-hidden transition-all duration-300 ease-in-out ${isExpanded ? "max-h-[2000px] opacity-100 px-6 py-5" : "max-h-0 opacity-0 px-6 py-0"}`}
      >
        {/* Search Component and Tags */}
        <div className="mb-5 flex items-center justify-between">
          {/* Search Component */}
          <div className="relative w-64">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search..."
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          {/* Tags */}
          {target.tags && target.tags.length > 0 && (
            <div className="flex gap-2">
              {target.tags.map((tag) => (
                <span
                  key={tag}
                  className={`px-3 py-1 rounded-md text-xs font-semibold ${getStatusBadgeColor(tag)}`}
                >
                  {tag}
                </span>
              ))}
            </div>
          )}
        </div>

        {/* Product Cards Grid - 3 per row */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {target.products.map((product) => (
            <div
              key={product.id}
              className="bg-(--background) rounded-lg px-4 py-3 border border-gray-200"
            >
              {editingProduct === product.id ? (
                /* Edit Mode */
                <div className="space-y-2">
                  {/* Product Name */}
                  <div>
                    <p className="font-semibold text-gray-900 text-sm">{product.productName}</p>
                  </div>

                  {/* Inputs in a row */}
                  <div className="flex gap-2">
                    {/* Monthly Target Input */}
                    <div className="flex-1">
                      <label className="text-xs text-gray-500 mb-1 block">Target</label>
                      <input
                        type="number"
                        value={editValues.monthlyTarget}
                        onChange={(e) =>
                          setEditValues({
                            ...editValues,
                            monthlyTarget: parseInt(e.target.value) || 0,
                          })
                        }
                        className="w-full px-2 py-1 border border-gray-300 rounded text-xs focus:outline-none focus:ring-1 focus:ring-blue-500"
                      />
                    </div>

                    {/* Share Input */}
                    <div className="flex-1">
                      <label className="text-xs text-gray-500 mb-1 block">Share</label>
                      <input
                        type="number"
                        value={editValues.share}
                        onChange={(e) =>
                          setEditValues({ ...editValues, share: parseInt(e.target.value) || 0 })
                        }
                        className="w-full px-2 py-1 border border-gray-300 rounded text-xs focus:outline-none focus:ring-1 focus:ring-blue-500"
                      />
                    </div>
                  </div>

                  {/* Save/Cancel Buttons */}
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => handleSaveEdit(product.id)}
                      className="flex-1 px-2 py-1 bg-blue-600 text-white rounded text-xs hover:bg-blue-700 transition"
                    >
                      Save
                    </button>
                    <button
                      onClick={handleCancelEdit}
                      className="flex-1 px-2 py-1 bg-gray-200 text-gray-700 rounded text-xs hover:bg-gray-300 transition"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              ) : (
                /* View Mode - Horizontal Layout */
                <div className="flex items-center justify-between">
                  {/* Product Info */}
                  <div className="flex items-center gap-4 flex-1">
                    {/* Product Name */}
                    <div className="min-w-[120px]">
                      <p className="font-semibold text-gray-900 text-sm">{product.productName}</p>
                    </div>

                    {/* Packets */}
                    <div>
                      <p className="text-sm text-gray-700">{product.targetPackets} Packets</p>
                    </div>

                    {/* Achievement Percentage */}
                    <div>
                      <p className="text-sm font-bold text-gray-900">
                        {product.achievementPercentage}%
                      </p>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex items-center gap-1">
                    <button
                      onClick={() =>
                        handleEdit(product.id, product.targetPackets, product.achievementPercentage)
                      }
                      className="p-1.5 text-blue-500 hover:bg-blue-50 rounded transition"
                      title="Edit"
                    >
                      <Edit2 className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => handleDelete(product.id)}
                      className="p-1.5 text-red-500 hover:bg-red-50 rounded transition"
                      title="Delete"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
