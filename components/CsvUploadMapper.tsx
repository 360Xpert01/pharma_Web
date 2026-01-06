// components/CsvUploadMapper.tsx
"use client";

import { useState, ChangeEvent } from "react";
import { CloudUpload, AlertTriangle, Check, ChevronDown, Info } from "lucide-react";
import { Button } from "./ui/button/button"; // Assuming you have this component

interface TableMapping {
  tableName: string;
  csvColumn: string;
}

const mockDatabaseTables = [
  "Employee_1",
  "Employee_2",
  "Employee_3",
  "Employee_4",
  "Employee_5",
  "Employee_6",
  "Employee_7",
  "Employee_8",
  "Employee_9",
];

export default function CsvUploadMapper() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [error, setError] = useState<string>("");
  const [mappings, setMappings] = useState<TableMapping[]>(
    mockDatabaseTables.map((table) => ({
      tableName: table,
      csvColumn: "",
    }))
  );

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.type !== "text/csv") {
      setError("Invalid File Type. Only CSV Files Are Allowed.");
      setSelectedFile(null);
      return;
    }

    setError("");
    setSelectedFile(file);
  };

  const handleCsvColumnChange = (index: number, value: string) => {
    const newMappings = [...mappings];
    newMappings[index].csvColumn = value;
    setMappings(newMappings);
  };

  const handlePrimaryKeyChange = (index: number) => {
    const newMappings = mappings.map((m, i) => ({
      ...m,
      isPrimaryKey: i === index ? !m.isPrimaryKey : false,
    }));
    setMappings(newMappings);
  };

  const handleUpload = () => {
    if (!selectedFile) {
      setError("Please select a CSV file first");
      return;
    }
    console.log("File:", selectedFile.name);
    console.log("Mappings:", mappings);
    alert("Upload simulation — check console");
  };

  return (
    <div className="flex justify-between w-full gap-6">
      <div className="space-y-6 w-[25%] h-[75vh] bg-gray-100 p-6 rounded-lg overflow-hidden">
        <h2 className="text-2xl font-semibold text-gray-800 mb-6">Upload CSV</h2>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Database Table</label>
          <div className="relative">
            <select className="w-full px-4 py-2.5 pr-10 border border-gray-300 rounded-lg appearance-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500">
              <option value="" disabled selected>
                --Select database table--
              </option>
              {mockDatabaseTables.map((table) => (
                <option key={table} value={table}>
                  {table}
                </option>
              ))}
            </select>
            <ChevronDown
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none"
              size={18}
            />
          </div>
        </div>

        {/* Dropzone */}
        <div className="relative border-2 border-dashed border-indigo-300 bg-blue-50 rounded-lg p-10 text-center transition-colors hover:border-indigo-500">
          <div className="flex flex-col items-center text-gray-500">
            <CloudUpload size={40} className="mb-3 text-blue-600" />
            <p className="text-lg text-blue-600 font-medium">Click to Upload CSV</p>
          </div>
          <input
            type="file"
            accept=".csv"
            onChange={handleFileChange}
            className="absolute inset-0 opacity-0 cursor-pointer"
          />
        </div>

        <Button
          variant="primary"
          size="lg"
          rounded="full"
          onClick={handleUpload}
          icon={CloudUpload}
        >
          Upload CSV
        </Button>

        {error && (
          <div className="mt-4 p-3 bg-red-50 text-red-700 rounded-lg flex items-center gap-2">
            <AlertTriangle size={18} />
            <span>{error}</span>
          </div>
        )}
      </div>

      <div className="w-[73%]">
        <div className="flex justify-between text-[14px] p-2 mt-2 font-medium text-gray-900 bg-white sticky top-0 z-10">
          <div className="ml-20 w-[40%]">Database_Table_Name</div>
          <div className="ml-20 w-[40%]">CSV Column</div>
          <div className="flex gap-2 w-[10%] items-center">
            Primary Key
            <span className="text-[8px] ">
              <Info size={17} />
            </span>
          </div>
        </div>

        <div
          className="mt-2 max-h-[63vh] overflow-y-auto 
                       scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-100
                       pr-2"
        >
          {mappings.map((mapping, index) => (
            <div
              key={index}
              className="flex justify-between w-full px-9 py-3 rounded-lg mt-3 bg-gray-50 hover:bg-gray-100 transition-colors"
            >
              <div className="flex items-center border w-[40%] border-gray-300 bg-gray-200 px-3 rounded-lg font-medium text-gray-800">
                {mapping.tableName}
              </div>

              <div className="relative w-[40%]">
                <select
                  value={mapping.csvColumn}
                  onChange={(e) => handleCsvColumnChange(index, e.target.value)}
                  className="w-full px-4 py-2.5 pr-10 border border-gray-300 rounded-lg appearance-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                >
                  <option value="">--Select CSV Column--</option>
                  <option value="id">id</option>
                  <option value="name">name</option>
                  <option value="email">email</option>
                  <option value="department">department</option>
                </select>
                <ChevronDown
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none"
                  size={18}
                />
              </div>

              <div className="flex items-center justify-center w-20">
                <label className="relative flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={mapping.isPrimaryKey}
                    onChange={() => handlePrimaryKeyChange(index)}
                    className="w-5 h-5 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500"
                  />
                  {mapping.isPrimaryKey && (
                    <Check className="absolute text-white pointer-events-none" size={18} />
                  )}
                </label>
              </div>
            </div>
          ))}
        </div>

        <div className="flex mt-6 mr-4 mb-2 justify-end gap-4">
          <Button variant="primary" size="lg" rounded="full">
            Import CSV
          </Button>
        </div>
      </div>
    </div>
  );
}
