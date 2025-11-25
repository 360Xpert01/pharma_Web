"use client";
import React, { useState } from "react";

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
  const [openId, setOpenId] = useState(null);

  return (
    <div className="w-full bg-gray-50">
      <div className="space-y-1 p-4">
        {tableData.map((row, idx) => (
          <div
            key={row.id}
            className={`
              bg-white 
              rounded-xl 
              border 
              border-gray-200  
              duration-200
              
            `}
          >
            <div className="p-2">
              <div className="flex items-center justify-between text-sm">
                {/* Employee 1 */}
                <div className="flex items-center gap-3 flex-1">
                  <img
                    src={DEFAULT_AVATAR}
                    alt={row.employee1.name}
                    className="w-11 h-11 rounded-full object-cover border-2 border-white shadow"
                  />
                  <div>
                    <div className="font-bold text-gray-900">{row.employee1.name}</div>
                    <div className="text-xs text-gray-500">{row.employee1.role}</div>
                  </div>
                </div>

                {/* Employee 2 */}
                <div className="flex items-center gap-3 flex-1">
                  <img
                    src={DEFAULT_AVATAR}
                    alt={row.employee2.name}
                    className="w-11 h-11 rounded-full object-cover border-2 border-white "
                  />
                  <div>
                    <div className="font-bold text-gray-900">{row.employee2.name}</div>
                    <div className="text-xs text-gray-500">{row.employee2.role}</div>
                  </div>
                </div>

                {/* Specialty */}
                <div className="flex-1 text-center font-semibold text-gray-800">
                  {row.specialty}
                </div>

                {/* Area */}
                <div className="flex-1 font-semibold text-center text-gray-700">{row.area}</div>

                {/* Doctor */}
                <div className="flex-1 text-center font-semibold text-gray-900">{row.doctor}</div>

                {/* Medicine */}
                <div className="flex-1 text-center font-semibold text-gray-900">{row.medicine}</div>

                {/* Strengths */}
                <div className="flex gap-3 justify-center">
                  {row.strengths.map((strength, i) => (
                    <span key={i} className=" text-gray-400 rounded-full text-xs font-medium">
                      {strength}
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
