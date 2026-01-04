export interface ProductData {
  id: string;
  name: string;
  strength: string; // e.g., "50mg", "500mg"
  sampleDistributed: number; // percentage 0-100
  orderCaptured: number; // percentage 0-100
}

// Generate product performance data
export const generateProductData = (): ProductData[] => {
  return [
    {
      id: "1",
      name: "Panadol",
      strength: "50mg",
      sampleDistributed: 65,
      orderCaptured: 45,
    },
    {
      id: "2",
      name: "Dapakan",
      strength: "500mg",
      sampleDistributed: 84,
      orderCaptured: 55,
    },
    {
      id: "3",
      name: "Dapakan",
      strength: "500mg",
      sampleDistributed: 92,
      orderCaptured: 72,
    },
    {
      id: "4",
      name: "Dapakan",
      strength: "500mg",
      sampleDistributed: 78,
      orderCaptured: 58,
    },
    {
      id: "5",
      name: "Dapakan",
      strength: "500mg",
      sampleDistributed: 88,
      orderCaptured: 68,
    },
    {
      id: "6",
      name: "Dapakan",
      strength: "500mg",
      sampleDistributed: 45,
      orderCaptured: 35,
    },
    {
      id: "7",
      name: "Dapakan",
      strength: "500mg",
      sampleDistributed: 95,
      orderCaptured: 75,
    },
    {
      id: "8",
      name: "Dapakan",
      strength: "500mg",
      sampleDistributed: 82,
      orderCaptured: 62,
    },
    {
      id: "9",
      name: "Dapakan",
      strength: "500mg",
      sampleDistributed: 90,
      orderCaptured: 70,
    },
    {
      id: "10",
      name: "Dapakan",
      strength: "500mg",
      sampleDistributed: 86,
      orderCaptured: 66,
    },
  ];
};

// Badge configurations - Order Captured first, then Sample Distributed
export const productBadges = [
  { id: "orderCaptured", label: "ORDER CAPTURED", color: "bg-(--primary-0) text-(--primary)" },
  { id: "sampleDistributed", label: "SAMPLE DISTRIBUTED", color: "bg-(--primary) text-white" },
];
