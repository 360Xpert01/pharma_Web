"use client";

import React from "react";
import { Paperclip, MoreVertical } from "lucide-react";
import Image from "next/image";

interface SampleItem {
  name: string;
  date: string;
  quantity: number;
}

interface GiveawayItem {
  name: string;
  date: string;
  quantity: number;
}

interface VisitExpandedDetailsProps {
  visitId: string;
  sampleItems: SampleItem[];
  giveawayItems: GiveawayItem[];
  remarks: string;
  selectedFiles: File[];
  onFilePickerOpen: () => void;
  onFileChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onRemoveImage: (index: number) => void;
  fileInputRef: (el: HTMLInputElement | null) => void;
}

export default function VisitExpandedDetails({
  visitId,
  sampleItems,
  giveawayItems,
  remarks,
  selectedFiles,
  onFilePickerOpen,
  onFileChange,
  onRemoveImage,
  fileInputRef,
}: VisitExpandedDetailsProps) {
  return (
    <div className="px-2">
      <div className="grid grid-cols-1 gap-10">
        {/* Samples & Giveaways */}
        <div className="space-y-8">
          {sampleItems.length > 0 && (
            <div>
              <h4 className="text-sm font-bold text-(--gray-8) mb-4">Sample Items</h4>
              <div className="space-y-3">
                {sampleItems.map((item, i) => (
                  <div
                    key={i}
                    className="flex justify-between items-center bg-(--background) rounded-8 px-5 py-4 border border-(--gray-2)"
                  >
                    <span className="font-medium text-(--gray-8)">{item.name}</span>
                    <span className="text-sm text-(--gray-5)">{item.date}</span>
                    <span className="text-sm font-bold text-(--gray-9)">{item.quantity}</span>
                    <MoreVertical className="w-4 h-4 text-(--gray-4)" />
                  </div>
                ))}
              </div>
            </div>
          )}

          {giveawayItems.length > 0 && (
            <div>
              <h4 className="text-sm font-bold text-(--gray-8) mb-4">Giveaway Items</h4>
              <div className="space-y-3">
                {giveawayItems.map((item, i) => (
                  <div
                    key={i}
                    className="flex justify-between items-center bg-(--background) rounded-8 px-5 py-4 border border-(--gray-2)"
                  >
                    <span className="font-medium text-(--gray-8)">{item.name}</span>
                    <span className="text-sm text-(--gray-5)">{item.date}</span>
                    <span className="text-sm font-bold text-(--gray-9)">{item.quantity}</span>
                    <MoreVertical className="w-4 h-4 text-(--gray-4)" />
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Remarks + Attachments */}
        <div className="flex w-full justify-between gap-10">
          {/* Remarks */}
          <div className="w-[49%]">
            <h4 className="text-sm font-bold text-(--gray-8) mb-3">Remarks</h4>
            <p className="text-sm leading-relaxed text-(--gray-6) bg-(--background) rounded-8 p-5 border shadow-soft">
              {remarks}
            </p>
          </div>

          {/* Attachments */}
          <div className="w-[49%]">
            <h4 className="text-sm font-bold text-(--gray-8) mb-3 flex items-center gap-2">
              Attachments
              {selectedFiles.length > 0 && (
                <span className="text-xs bg-(--primary-0) text-(--primary) px-2 py-0.5 rounded-8 font-medium">
                  {selectedFiles.length}
                </span>
              )}
            </h4>

            {/* Hidden Input */}
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              multiple
              className="hidden"
              onChange={onFileChange}
            />

            {selectedFiles.length > 0 ? (
              <div
                onClick={onFilePickerOpen}
                className="flex items-center gap-4 bg-(--background) rounded-8 p-3 border shadow-soft cursor-pointer hover:bg-(--gray-0) transition"
              >
                <Paperclip className="w-6 h-6 text-(--gray-5)" />
                <div className="flex gap-3 flex-wrap">
                  {selectedFiles.map((file, index) => (
                    <div key={index} className="relative group">
                      <div className="w-10 h-10 rounded-8 overflow-hidden border-2 border-(--gray-3)">
                        <Image
                          src={URL.createObjectURL(file)}
                          alt="attachment"
                          width={40}
                          height={40}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          onRemoveImage(index);
                        }}
                        className="absolute -top-1 -right-1 bg-(--destructive) text-(--light) rounded-8 w-5 h-5 text-xs flex items-center justify-center opacity-0 group-hover:opacity-100 transition"
                      >
                        ×
                      </button>
                    </div>
                  ))}
                  <div className="w-10 h-10 bg-(--gray-1) border-2 border-dashed border-(--gray-4) rounded-8 flex items-center justify-center">
                    <span className="text-xl text-(--gray-4)">+</span>
                  </div>
                </div>
              </div>
            ) : (
              <div
                onClick={onFilePickerOpen}
                className="text-sm text-(--gray-4) italic cursor-pointer hover:text-(--gray-6) transition bg-(--background) rounded-8 p-5 border text-center shadow-soft"
              >
                Click to add attachments
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
