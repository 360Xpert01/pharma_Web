"use client";
import React from "react";

const tableData = [
  {
    id: 1,
    employee1: { name: "Mohammad Amir", role: "Sales Representative" },
    employee2: { name: "Mohammad Amir", role: "Team Lead" },
    specialty: "Cardiologist",
    area: "Gulshan-e-iqbal",
    doctor: "Dr. Rashid Ahmed",
    medicine: "Amoxicillin",
    strengths: ["Tablet 10Mg", "Tablet 40Mg"],
  },
  {
    id: 2,
    employee1: { name: "Sara Khan", role: "Marketing Manager" },
    employee2: { name: "Sara Khan", role: "Senior Manager" },
    specialty: "Pediatrician",
    area: "Clifton",
    doctor: "Dr. Ayesha Farooq",
    medicine: "Ibuprofen",
    strengths: ["Tablet 200Mg", "Tablet 400Mg"],
  },
  {
    id: 3,
    employee1: { name: "Ali Raza", role: "Product Owner" },
    employee2: { name: "Ali Raza", role: "Project Manager" },
    specialty: "Dermatologist",
    area: "Korangi",
    doctor: "Dr. Bilal Shah",
    medicine: "Cetirizine",
    strengths: ["Tablet 10Mg", "Tablet 20Mg"],
  },
  {
    id: 4,
    employee1: { name: "Fatima Bano", role: "UX Designer" },
    employee2: { name: "Fatima Bano", role: "Lead Designer" },
    specialty: "Orthopedist",
    area: "DHA",
    doctor: "Dr. Nida Malik",
    medicine: "Paracetamol",
    strengths: ["Tablet 500Mg", "Tablet 1G"],
  },
  {
    id: 5,
    employee1: { name: "Owais Tariq", role: "Data Analyst" },
    employee2: { name: "Owais Tariq", role: "Senior Analyst" },
    specialty: "Neurologist",
    area: "Nazimabad",
    doctor: "Dr. Fariha Khan",
    medicine: "Metformin",
    strengths: ["Tablet 500Mg", "Tablet 1000Mg"],
  },
  {
    id: 6,
    employee1: { name: "Nida Hussain", role: "Web Developer" },
    employee2: { name: "Nida Hussain", role: "Technical Lead" },
    specialty: "Gynecologist",
    area: "Malir",
    doctor: "Dr. Samina Iftikhar",
    medicine: "Aspirin",
    strengths: ["Tablet 100Mg", "Tablet 300Mg"],
  },
  {
    id: 7,
    employee1: { name: "Hassan Ali", role: "System Administrator" },
    employee2: { name: "Hassan Ali", role: "IT Manager" },
    specialty: "Oncologist",
    area: "Kech",
    doctor: "Dr. Asif Malik",
    medicine: "Simvastatin",
    strengths: ["Tablet 10Mg", "Tablet 20Mg"],
  },
  {
    id: 8,
    employee1: { name: "Zara Malik", role: "Content Writer" },
    employee2: { name: "Zara Malik", role: "Content Lead" },
    specialty: "Ophthalmologist",
    area: "Gulistan-e-Jauhar",
    doctor: "Dr. Hina Shah",
    medicine: "Lisinopril",
    strengths: ["Tablet 5Mg", "Tablet 10Mg"],
  },
  {
    id: 9,
    employee1: { name: "Bilal Ahmed", role: "Graphic Designer" },
    employee2: { name: "Bilal Ahmed", role: "Creative Head" },
    specialty: "Urologist",
    area: "FB Area",
    doctor: "Dr. Talha Qureshi",
    medicine: "Atorvastatin",
    strengths: ["Tablet 20Mg", "Tablet 40Mg"],
  },
];

const DEFAULT_AVATAR = "/girlPic.svg";

export default function DcrTable() {
  return (
    <div className="w-full bg-(--gray-0) p-4">
      <div className="space-y-3">
        {tableData.map((row) => (
          <div
            key={row.id}
            className="bg-[var(--background)] rounded-2xl border border-(--gray-2) shadow-sm hover:shadow-md transition-shadow"
          >
            <div className="px-6 py-5">
              {/* 12-column grid */}
              <div className="w-[100%] flex justify-between items-center text-sm">
                {/* Employee 1 – Left aligned */}
                <div className="w-[17%] flex  items-center gap-3">
                  <img
                    src={DEFAULT_AVATAR}
                    alt={row.employee1.name}
                    className="w-12 h-12 rounded-full object-cover border-2 border-(--light) shadow-md flex-shrink-0"
                  />
                  <div>
                    <p className="font-bold text-(--gray-9)">{row.employee1.name}</p>
                    <p className="text-xs text-(--gray-5)">{row.employee1.role}</p>
                  </div>
                </div>

                {/* Employee 2 – Left aligned */}
                <div className="w-[17%] flex items-center gap-3">
                  <img
                    src={DEFAULT_AVATAR}
                    alt={row.employee2.name}
                    className="w-12 h-12 rounded-full object-cover border-2 border-(--light) shadow-md flex-shrink-0"
                  />
                  <div>
                    <p className="font-bold text-(--gray-9)">{row.employee2.name}</p>
                    <p className="text-xs text-(--gray-5)">{row.employee2.role}</p>
                  </div>
                </div>

                {/* Specialty – Left aligned */}
                <div className="w-[10%]">
                  <p className="font-semibold text-(--gray-8)">{row.specialty}</p>
                </div>

                {/* Area – Left aligned */}
                <div className="w-[13%]">
                  <p className="font-semibold text-(--gray-7)">{row.area}</p>
                </div>

                {/* Doctor – Left aligned */}
                <div className="w-[15%]">
                  <p className="font-bold text-(--gray-9)">{row.doctor}</p>
                </div>

                {/* Medicine – Left aligned */}
                <div className="w-[10%]">
                  <p className="font-bold text-(--gray-9)">{row.medicine}</p>
                </div>

                {/* Strengths – Chips start from left */}
                <div className="w-[20%] flex flex-wrap gap-2">
                  {row.strengths.map((s, i) => (
                    <span
                      key={i}
                      className="px-3 py-1 bg-(--gray-1) text-(--gray-7) rounded-full text-xs font-medium whitespace-nowrap"
                    >
                      {s}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
