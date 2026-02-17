"use client";

import React from "react";
import { Paperclip, MoreVertical } from "lucide-react";
import Image from "next/image";

interface SampleItem {
  product: string;
  sku: string;
  date: string;
  quantity: number;
}

interface GiveawayItem {
  giveawayName: string;
  date: string;
  quantity: number;
}

interface VisitExpandedDetailsProps {
  visitId: string;
  sampleItems: SampleItem[];
  giveawayItems: GiveawayItem[];
  remarks: string;
  attachments: any[];
}

export default function VisitExpandedDetails({
  visitId,
  sampleItems,
  giveawayItems,
  remarks,
  attachments,
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
                    <div className="flex">
                      <span className="font-medium text-(--gray-8)">{item.product}</span>
                      <span className="text-xs text-(--gray-5) ml-2 mt-1  ">({item.sku})</span>
                    </div>
                    <div className="">
                      <span className="text-sm text-(--gray-5)">{item.date}</span>
                    </div>
                    <span className="text-sm font-bold text-(--gray-9) ml-4">
                      Qty: {item.quantity}
                    </span>
                    {/* <MoreVertical className="w-4 h-4 text-(--gray-4) ml-2" /> */}
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
                    <span className="font-medium text-(--gray-8) flex">{item.giveawayName}</span>
                    <span className="text-sm text-(--gray-5)">{item.date}</span>
                    <span className="text-sm font-bold text-(--gray-9) ml-4">
                      Qty: {item.quantity}
                    </span>
                    {/* <MoreVertical className="w-4 h-4 text-(--gray-4) ml-2" /> */}
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
              {attachments.length > 0 && (
                <span className="text-xs bg-(--primary-0) text-(--primary) px-2 py-0.5 rounded-8 font-medium">
                  {attachments.length}
                </span>
              )}
            </h4>

            {attachments.length > 0 ? (
              <div className="flex items-center gap-4 bg-(--background) rounded-8 p-3 border shadow-soft transition">
                <Paperclip className="w-6 h-6 text-(--gray-5)" />
                <div className="flex gap-3 flex-wrap">
                  {attachments.map((file, index) => (
                    <div key={index} className="relative group">
                      <div className="w-10 h-10 rounded-8 overflow-hidden border-2 border-(--gray-3)">
                        <Image
                          src={typeof file === "string" ? file : URL.createObjectURL(file)}
                          alt="attachment"
                          width={40}
                          height={40}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              <div className="text-sm text-(--gray-4) italic bg-(--background) rounded-8 p-3 border text-center shadow-soft">
                No attachments
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
