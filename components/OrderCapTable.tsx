"use client";

import React from "react";
import Image from "next/image";
import { ChevronRight } from "lucide-react";

interface BookingItem {
  id: string;
  avatar: string;
  name: string;
  position: string;
  company: string;
  date: string;
  medicine: string;
  dosages: string[];
  customer: string;
}

const bookingData: BookingItem[] = [
  {
    id: "1",
    avatar: "/avatars/mohammad-amir.jpg",
    name: "Mohammad Amir",
    position: "Sales Representative",
    company: "DavaGo - Clifton",
    date: "2025-10-15",
    medicine: "Amoxicillin",
    dosages: ["Tablet 10Mg", "Tablet 40Mg", "Tablet 40Mg"],
    customer: "Clifton",
  },
  {
    id: "2",
    avatar: "/avatars/sarah-johnson.jpg",
    name: "Sarah Johnson",
    position: "Marketing Specialist",
    company: "Imtiaz Medical Center",
    date: "2025-10-20",
    medicine: "Ibuprofen",
    dosages: ["Tablet 200Mg", "Tablet 400Mg"],
    customer: "Teen Talwaar",
  },
  {
    id: "3",
    avatar: "/avatars/michael-smith.jpg",
    name: "Michael Smith",
    position: "Product Manager",
    company: "Tech Innovations Inc.",
    date: "2025-12-01",
    medicine: "Paracetamol",
    dosages: ["Capsule 500Mg", "Capsule 1000Mg"],
    customer: "John Doe",
  },
  {
    id: "4",
    avatar: "/avatars/emily-davis.jpg",
    name: "Emily Davis",
    position: "UX Designer",
    company: "Creative Solutions Co.",
    date: "2025-09-15",
    medicine: "Aspirin",
    dosages: ["Tablet 100Mg", "Tablet 300Mg"],
    customer: "Jane Roe",
  },
  {
    id: "5",
    avatar: "/avatars/david-brown.jpg",
    name: "David Brown",
    position: "Software Engineer",
    company: "NextGen Systems",
    date: "2025-08-30",
    medicine: "Amoxicillin",
    dosages: ["Capsule 250Mg", "Capsule 500Mg"],
    customer: "Alice Smith",
  },
  {
    id: "6",
    avatar: "/avatars/sophia-wilson.jpg",
    name: "Sophia Wilson",
    position: "Data Analyst",
    company: "Market Insights LLC",
    date: "2025-11-05",
    medicine: "Metformin",
    dosages: ["Tablet 500Mg", "Tablet 1000Mg"],
    customer: "Bob Johnson",
  },
  {
    id: "7",
    avatar: "/avatars/james-taylor.jpg",
    name: "James Taylor",
    position: "Sales Executive",
    company: "Global Commerce",
    date: "2025-07-25",
    medicine: "Ciprofloxacin",
    dosages: ["Tablet 250Mg", "Tablet 500Mg"],
    customer: "Charlie Brown",
  },
  {
    id: "8",
    avatar: "/avatars/olivia-martinez.jpg",
    name: "Olivia Martinez",
    position: "HR Coordinator",
    company: "People First Corp.",
    date: "2025-06-10",
    medicine: "Lisinopril",
    dosages: ["Tablet 10Mg", "Tablet 20Mg"],
    customer: "Emma Davis",
  },
  {
    id: "9",
    avatar: "/avatars/daniel-anderson.jpg",
    name: "Daniel Anderson",
    position: "Finance Manager",
    company: "Wealth Solutions",
    date: "2025-05-22",
    medicine: "Atorvastatin",
    dosages: ["Tablet 10Mg", "Tablet 40Mg"],
    customer: "Lucas Wilson",
  },
  {
    id: "10",
    avatar: "/avatars/isabella-thomas.jpg",
    name: "Isabella Thomas",
    position: "Customer Support Lead",
    company: "Service Excellence",
    date: "2025-04-12",
    medicine: "Levothyroxine",
    dosages: ["Tablet 50Mcg", "Tablet 100Mcg"],
    customer: "Grace Taylor",
  },
];

export default function BookingTable() {
  return (
    <div className="w-full overflow-hidden">
      {bookingData.map((item) => (
        <div key={item.id} className="px-4 py-1 hover:bg-(--gray-0) transition-colors ">
          <div className="w-full bg-(--background) rounded-xl p-2 border border-(--gray-2) ">
            {/* Pure Flex with Equal Spacing */}
            <div className="flex items-center gap-6 w-full text-sm">
              {/* Avatar + Name + Position */}
              <div className="flex items-center gap-3 flex-shrink-0 w-[16%]">
                <Image
                  src={item.avatar}
                  alt={item.name}
                  width={52}
                  height={52}
                  className="rounded-full border-2 border-(--light) shadow-md object-cover"
                  onError={(e) => {
                    e.currentTarget.src = "/girlPic.svg";
                  }}
                />
                <div>
                  <div className="font-bold text-(--gray-9)">{item.name}</div>
                  <div className="text-xs text-(--gray-5)">{item.position}</div>
                </div>
              </div>

              {/* Company */}
              <div className="flex w-[10%] font-bold text-(--gray-8)">{item.company}</div>

              {/* Date */}
              <div className="w-[16%] text-(--gray-4) text-center">{item.date}</div>

              {/* Medicine */}
              <div className="w-[16%] font-semibold text-(--gray-9) text-center">
                {item.medicine}
              </div>

              {/* Dosages */}
              <div className=" w-[16%]  flex-1 flex-wrap gap-3 items-center justify-center">
                {item.dosages.map((dose, idx) => (
                  <span
                    key={idx}
                    className="px-4 py-2  text-(--gray-4) rounded-full text-xs font-medium whitespace-nowrap"
                  >
                    {dose}
                  </span>
                ))}
              </div>

              {/* Customer */}
              <div className="w-[16%] flex-1 text-(--gray-8) font-medium text-center">
                {item.customer}
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
