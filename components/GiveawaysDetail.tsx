"use client";

import React from "react";
import Image from "next/image";

import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { fetchUserGiveawaysAllocation } from "@/store/slices/UserGiveaways/userGiveawaysSlice";
import { RootState, useAppDispatch } from "@/store";
import ImageWithFallback from "./shared/ImageWithFallback";

export default function GiveawaysDetail() {
  const searchParams = useSearchParams();
  const userId = searchParams.get("id");
  const dispatch = useAppDispatch();

  const { allocationData, loading, error } = useSelector((state: RootState) => state.userGiveaways);

  useEffect(() => {
    if (userId) {
      dispatch(fetchUserGiveawaysAllocation(userId));
    }
  }, [dispatch, userId]);

  if (loading) {
    return (
      <div className="w-full p-4 flex justify-center items-center min-h-[200px]">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-emerald-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="w-full p-4 text-center text-red-500">
        <p>Error: {error}</p>
      </div>
    );
  }

  const giveaways = allocationData?.giveaways || [];

  return (
    <div className="w-full">
      <div className="mt-3">
        <h2 className="text-xl font-bold mb-6 text-gray-800">Giveaways</h2>

        {giveaways.length === 0 ? (
          <p className="text-gray-500 text-center">No giveaways found.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {giveaways.map((giveaway) => (
              <div
                key={giveaway.id}
                className="flex items-center justify-between bg-white rounded-xl border border-gray-100 shadow-sm p-4 hover:shadow-md transition-shadow"
              >
                {/* Left: Giveaway Info */}
                <div className="flex items-center gap-3 min-w-[140px]">
                  <div className="w-12 h-12 rounded-lg overflow-hidden flex-shrink-0 bg-gray-50 border border-gray-100">
                    <ImageWithFallback
                      src={giveaway.imageUrl}
                      alt={giveaway.name}
                      width={48}
                      height={48}
                      className="object-contain p-1"
                      fallbackSrc="/images/MedicinePlaceholder.svg"
                    />
                  </div>
                  <div className="overflow-hidden">
                    <h3 className="font-bold text-gray-900 text-sm truncate">{giveaway.name}</h3>
                    <p className="text-xs text-gray-500 truncate">{giveaway.productSku}</p>
                  </div>
                </div>

                {/* Center: Total QTY */}
                <div className="text-center px-2">
                  <p className="text-[10px] uppercase font-bold text-gray-400 tracking-tight">
                    Total QTY
                  </p>
                  <p className="text-lg font-bold text-emerald-500 leading-none mt-1">
                    {giveaway.quantity}
                  </p>
                </div>

                {/* Right: QTY Left */}
                <div className="text-right pl-2">
                  <p className="text-[10px] uppercase font-bold text-gray-400 tracking-tight">
                    QTY Left
                  </p>
                  <p className="text-lg font-bold text-red-500 leading-none mt-1">
                    {giveaway.quantityLeft}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
