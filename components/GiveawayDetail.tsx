"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@/store";
import {
  getGiveawayById,
  resetGetGiveawayByIdState,
} from "@/store/slices/giveaway/getGiveawayByIdSlice";
import Image from "next/image";
import ProductImage from "@/components/shared/ProductImage";
import { ArrowLeft, Edit2 } from "lucide-react";

export default function GiveawayDetail() {
  const searchParams = useSearchParams();
  const id = searchParams.get("id");
  const router = useRouter();
  const dispatch = useAppDispatch();

  const { giveaway, loading, error } = useAppSelector((state) => state.getGiveawayById);

  useEffect(() => {
    if (id) {
      dispatch(getGiveawayById(id));
    }

    return () => {
      dispatch(resetGetGiveawayByIdState());
    };
  }, [dispatch, id]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 border-4 border-[var(--primary)] border-t-transparent rounded-full animate-spin" />
          <p className="text-[var(--muted-foreground)]">Loading giveaway details...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="flex flex-col items-center gap-4 text-center">
          <div className="w-16 h-16 rounded-full bg-red-100 flex items-center justify-center">
            <span className="text-2xl">⚠️</span>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-[var(--foreground)] mb-2">
              Error Loading Giveaway
            </h3>
            <p className="text-[var(--muted-foreground)] mb-4">{error}</p>
            <button
              onClick={() => router.push("/dashboard/giveaway-Management")}
              className="px-4 py-2 bg-[var(--primary)] text-white rounded-8 hover:opacity-90 transition"
            >
              Back to Giveaways
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (!giveaway) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <p className="text-[var(--muted-foreground)]">Giveaway not found</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header with Back and Edit Buttons */}
      <div className="flex items-center justify-between">
        <button
          onClick={() => router.push("/dashboard/giveaway-Management")}
          className="flex items-center gap-2 text-[var(--muted-foreground)] hover:text-[var(--foreground)] transition"
        >
          <ArrowLeft className="w-5 h-5" />
          <span>Back to Giveaways</span>
        </button>

        <button
          onClick={() => router.push(`/dashboard/UpdateGiveaway?id=${giveaway.id}`)}
          className="flex items-center gap-2 px-4 py-2 bg-[var(--primary)] text-white rounded-8 hover:opacity-90 transition"
        >
          <Edit2 className="w-4 h-4" />
          <span>Edit Giveaway</span>
        </button>
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-12 gap-6">
        {/* Left Column - Image */}
        <div className="col-span-4">
          <div className="bg-[var(--background)] rounded-12 p-6 shadow-soft border border-[var(--gray-2)]">
            <div className="aspect-square rounded-8 overflow-hidden ring-2 ring-[var(--gray-2)] bg-[var(--gray-1)]">
              <ProductImage
                src={giveaway.imageUrl}
                alt={giveaway.name}
                width={400}
                height={400}
                className="object-cover w-full h-full"
              />
            </div>
          </div>
        </div>

        {/* Right Column - Detailed Information */}
        <div className="col-span-8 space-y-6">
          {/* Basic Information */}
          <div className="bg-[var(--background)] rounded-12 p-6 shadow-soft border border-[var(--gray-2)]">
            <h2 className="text-xl font-bold text-[var(--foreground)] mb-6">
              Giveaway Information
            </h2>

            <div className="grid grid-cols-2 gap-6">
              <div>
                <label className="text-sm font-semibold text-[var(--muted-foreground)] block mb-2">
                  Pulse Code
                </label>
                <p className="text-[var(--foreground)] font-medium">
                  {giveaway.pulseCode || "N/A"}
                </p>
              </div>

              {giveaway.legacyCode && (
                <div>
                  <label className="text-sm font-semibold text-[var(--muted-foreground)] block mb-2">
                    Legacy Code
                  </label>
                  <p className="text-[var(--foreground)] font-medium">{giveaway.legacyCode}</p>
                </div>
              )}

              <div className="col-span-2">
                <label className="text-sm font-semibold text-[var(--muted-foreground)] block mb-2">
                  Giveaway Name
                </label>
                <p className="text-[var(--foreground)] font-medium text-lg">{giveaway.name}</p>
              </div>

              <div>
                <label className="text-sm font-semibold text-[var(--muted-foreground)] block mb-2">
                  Category
                </label>
                <span className="inline-flex items-center px-3 py-1.5 rounded-8 text-xs bg-[var(--primary)]/10 text-[var(--primary)]">
                  {giveaway.category || "N/A"}
                </span>
              </div>

              <div>
                <label className="text-sm font-semibold text-[var(--muted-foreground)] block mb-2">
                  Units
                </label>
                <p className="text-[var(--foreground)] font-medium">{giveaway.units || 0}</p>
              </div>

              {giveaway.productName && (
                <div className="col-span-2">
                  <label className="text-sm font-semibold text-[var(--muted-foreground)] block mb-2">
                    Associated Product
                  </label>
                  <p className="text-[var(--foreground)] font-medium">{giveaway.productName}</p>
                </div>
              )}

              {giveaway.description && (
                <div className="col-span-2">
                  <label className="text-sm font-semibold text-[var(--muted-foreground)] block mb-2">
                    Description
                  </label>
                  <p className="text-[var(--foreground)]">{giveaway.description}</p>
                </div>
              )}
            </div>
          </div>

          {/* Timestamps */}
          {(giveaway.createdAt || giveaway.updatedAt) && (
            <div className="bg-[var(--background)] rounded-12 p-6 shadow-soft border border-[var(--gray-2)]">
              <h3 className="text-lg font-bold text-[var(--foreground)] mb-4">Timestamps</h3>

              <div className="grid grid-cols-2 gap-6">
                {giveaway.createdAt && (
                  <div>
                    <label className="text-sm font-semibold text-[var(--muted-foreground)] block mb-2">
                      Created At
                    </label>
                    <p className="text-[var(--foreground)]">
                      {new Date(giveaway.createdAt).toLocaleString()}
                    </p>
                  </div>
                )}

                {giveaway.updatedAt && (
                  <div>
                    <label className="text-sm font-semibold text-[var(--muted-foreground)] block mb-2">
                      Updated At
                    </label>
                    <p className="text-[var(--foreground)]">
                      {new Date(giveaway.updatedAt).toLocaleString()}
                    </p>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
