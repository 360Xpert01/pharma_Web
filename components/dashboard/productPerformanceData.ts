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
      sampleDistributed: 95,
      orderCaptured: 85,
    },
    {
      id: "2",
      name: "Dapakan",
      strength: "500mg",
      sampleDistributed: 75,
      orderCaptured: 60,
    },
    {
      id: "3",
      name: "Dapakan",
      strength: "500mg",
      sampleDistributed: 88,
      orderCaptured: 70,
    },
    {
      id: "4",
      name: "Dapakan",
      strength: "500mg",
      sampleDistributed: 65,
      orderCaptured: 50,
    },
    {
      id: "5",
      name: "Dapakan",
      strength: "500mg",
      sampleDistributed: 92,
      orderCaptured: 78,
    },
    {
      id: "6",
      name: "Dapakan",
      strength: "500mg",
      sampleDistributed: 40,
      orderCaptured: 30,
    },
    {
      id: "7",
      name: "Dapakan",
      strength: "500mg",
      sampleDistributed: 85,
      orderCaptured: 72,
    },
    {
      id: "8",
      name: "Dapakan",
      strength: "500mg",
      sampleDistributed: 70,
      orderCaptured: 55,
    },
    {
      id: "9",
      name: "Dapakan",
      strength: "500mg",
      sampleDistributed: 80,
      orderCaptured: 65,
    },
    {
      id: "10",
      name: "Dapakan",
      strength: "500mg",
      sampleDistributed: 58,
      orderCaptured: 42,
    },
  ];
};

// Badge configurations - Order Captured first, then Sample Distributed
export const productBadges = [
  { id: "orderCaptured", label: "ORDER CAPTURED", color: "bg-(--primary-0) text-(--primary)" },
  { id: "sampleDistributed", label: "SAMPLE DISTRIBUTED", color: "bg-(--primary) text-white" },
];
