"use client";
import React, { useState } from "react";
import TableLoadingState from "@/components/shared/table/TableLoadingState";
import TableErrorState from "@/components/shared/table/TableErrorState";
import TableEmptyState from "@/components/shared/table/TableEmptyState";
import TableColumnHeader from "@/components/TableColumnHeader";
import TablePagination from "@/components/TablePagination";

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
  // Simulate loading and error states (replace with actual API call state)
  const [loading] = useState(false);
  const [error] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);

  // Define columns for the table header
  const dcrColumns = [
    { label: "Sales Rep", className: "w-[17%]" },
    { label: "Line Manager", className: "w-[17%]" },
    { label: "Specialization", className: "w-[10%]" },
    { label: "Location", className: "w-[14%]" },
    { label: "Doctor", className: "w-[14%]" },
    { label: "Product", className: "w-[12%]" },
    { label: "SKU's", className: "w-[19%]" },
  ];

  const handleRetry = () => {
    // Add retry logic here when connected to API
    window.location.reload();
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handleItemsPerPageChange = (newItemsPerPage: number) => {
    setItemsPerPage(newItemsPerPage);
    setCurrentPage(1);
  };

  // Calculate paginated data
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedData = tableData.slice(startIndex, endIndex);

  return (
    <div className="w-full overflow-hidden">
      {loading ? (
        <div className="px-4">
          <TableLoadingState
            variant="skeleton"
            rows={5}
            columns={7}
            message="Loading DCR data..."
          />
        </div>
      ) : error ? (
        <TableErrorState error={error} onRetry={handleRetry} title="Failed to load DCR data" />
      ) : tableData.length === 0 ? (
        <TableEmptyState
          message="No DCR records found"
          description="There are currently no doctor call records to display."
        />
      ) : (
        <>
          <TableColumnHeader
            columns={dcrColumns}
            containerClassName="flex items-center gap-6 w-full"
          />

          <div className="space-y-3">
            {paginatedData.map((row) => (
              <div
                key={row.id}
                className="bg-[var(--background)] rounded-2xl border border-(--gray-2) shadow-soft hover:shadow-soft transition-shadow"
              >
                <div className="px-3 py-3">
                  {/* 12-column grid */}
                  <div className="w-[100%] flex justify-between items-center text-sm">
                    {/* Employee 1 – Left aligned */}
                    <div className="w-[17%] flex  items-center gap-3">
                      <img
                        src={DEFAULT_AVATAR}
                        alt={row.employee1.name}
                        className="w-12 h-12 rounded-full object-cover border-2 border-(--light) shadow-soft flex-shrink-0"
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
                        className="w-12 h-12 rounded-full object-cover border-2 border-(--light) shadow-soft flex-shrink-0"
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

            {/* Pagination */}
            {tableData.length > 0 && (
              <TablePagination
                currentPage={currentPage}
                totalItems={tableData.length}
                itemsPerPage={itemsPerPage}
                onPageChange={handlePageChange}
                onItemsPerPageChange={handleItemsPerPageChange}
                pageSizeOptions={[10, 20, 30, 50]}
                showPageInfo={true}
                showItemsPerPageSelector={true}
              />
            )}
          </div>
        </>
      )}
    </div>
  );
}
