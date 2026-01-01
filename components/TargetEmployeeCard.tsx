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
        return "bg-(--destructive-0) text-(--destructive)";
      case "L02":
        return "bg-(--primary) text-(--light)";
      case "E74":
        return "bg-(--primary) text-(--light)";
      default:
        return "bg-(--gray-0) text-(--gray-6)";
    }
  };

  return (
    <div className="bg-(--background) rounded-2xl border border-(--gray-2) overflow-hidden hover:bg-(--gray-0) transition-colors">
      {/* Employee Header - Always Visible */}
      <div className="px-6 py-4">
        <div className="flex items-center">
          {/* Month Label - 10% */}
          <div className="w-[10%]">
            <h3 className="text-sm font-bold text-(--gray-9)">{month}</h3>
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
              <h3 className="font-bold text-(--gray-9) text-sm">{target.employeeName}</h3>
              <p className="text-xs text-(--gray-5)">{target.employeeRole}</p>
            </div>
          </div>

          {/* Team Name - 18% */}
          <div className="w-[18%]">
            <p className="text-sm text-(--gray-9) font-medium">{target.teamName}</p>
          </div>

          {/* Channel Name - 18% */}
          <div className="w-[18%]">
            <p className="text-sm text-(--gray-9) font-medium">{target.channelName}</p>
          </div>

          {/* Line Manager - 18% */}
          <div className="w-[18%]">
            <p className="text-sm text-(--gray-9) font-medium">{target.lineManager}</p>
          </div>

          {/* View Details Button */}
          <div className="w-[10%] flex justify-end">
            <button
              onClick={() => setIsExpanded(!isExpanded)}
              className="flex items-center gap-2 text-sm text-(--gray-5) hover:text-(--gray-9) transition whitespace-nowrap cursor-pointer"
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
        className={`border-t border-(--gray-2) bg-(--gray-0) overflow-hidden transition-all duration-300 ease-in-out ${isExpanded ? "max-h-[2000px] opacity-100 px-6 py-5" : "max-h-0 opacity-0 px-6 py-0"}`}
      >
        {/* Search Component and Tags */}
        <div className="mb-5 flex items-center justify-between">
          {/* Search Component */}
          <div className="relative w-64">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-(--gray-4)" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search..."
              className="w-full pl-10 pr-4 py-2 border border-(--gray-3) rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-(--primary) focus:border-(--primary)"
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
              className="bg-(--background) rounded-lg px-4 py-3 border border-(--gray-2)"
            >
              {editingProduct === product.id ? (
                /* Edit Mode */
                <div className="space-y-2">
                  {/* Product Name */}
                  <div>
                    <p className="font-semibold text-(--gray-9) text-sm">{product.productName}</p>
                  </div>

                  {/* Inputs in a row */}
                  <div className="flex gap-2">
                    {/* Monthly Target Input */}
                    <div className="flex-1">
                      <label className="text-xs text-(--gray-5) mb-1 block">Target</label>
                      <input
                        type="number"
                        value={editValues.monthlyTarget}
                        onChange={(e) =>
                          setEditValues({
                            ...editValues,
                            monthlyTarget: parseInt(e.target.value) || 0,
                          })
                        }
                        className="w-full px-2 py-1 border border-(--gray-3) rounded text-xs focus:outline-none focus:ring-1 focus:ring-(--primary)"
                      />
                    </div>

                    {/* Share Input */}
                    <div className="flex-1">
                      <label className="text-xs text-(--gray-5) mb-1 block">Share</label>
                      <input
                        type="number"
                        value={editValues.share}
                        onChange={(e) =>
                          setEditValues({ ...editValues, share: parseInt(e.target.value) || 0 })
                        }
                        className="w-full px-2 py-1 border border-(--gray-3) rounded text-xs focus:outline-none focus:ring-1 focus:ring-(--primary)"
                      />
                    </div>
                  </div>

                  {/* Save/Cancel Buttons */}
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => handleSaveEdit(product.id)}
                      className="flex-1 px-2 py-1 bg-(--primary) text-(--light) rounded text-xs hover:bg-(--primary-2) transition"
                    >
                      Save
                    </button>
                    <button
                      onClick={handleCancelEdit}
                      className="flex-1 px-2 py-1 bg-(--gray-2) text-(--gray-7) rounded text-xs hover:bg-(--gray-3) transition"
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
                      <p className="font-semibold text-(--gray-9) text-sm">{product.productName}</p>
                    </div>

                    {/* Packets */}
                    <div>
                      <p className="text-sm text-(--gray-7)">{product.targetPackets} Packets</p>
                    </div>

                    {/* Achievement Percentage */}
                    <div>
                      <p className="text-sm font-bold text-(--gray-9)">
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
                      className="p-1.5 text-(--primary) hover:bg-(--primary-0) rounded transition"
                      title="Edit"
                    >
                      <Edit2 className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => handleDelete(product.id)}
                      className="p-1.5 text-(--destructive) hover:bg-(--destructive-0) rounded transition"
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
