export interface TeamMember {
  id: string;
  name: string;
  role: string;
  avatar?: string;
  orders: number;
  callCompletion: number; // percentage 0-100
  coverage: number; // percentage 0-100
  complianceScore: number; // percentage 0-100
  rank: number;
}

// Generate mock team members data
export const generateTeamMembers = (): TeamMember[] => {
  return [
    {
      id: "1",
      name: "Mohammad Amir",
      role: "Sales Manager",
      orders: 980,
      callCompletion: 80,
      coverage: 80,
      complianceScore: 80,
      rank: 1,
    },
    {
      id: "2",
      name: "Asif Khan",
      role: "Sales Manager",
      orders: 980,
      callCompletion: 80,
      coverage: 80,
      complianceScore: 80,
      rank: 2,
    },
    {
      id: "3",
      name: "Ruksana",
      role: "Sales Manager",
      orders: 980,
      callCompletion: 80,
      coverage: 80,
      complianceScore: 80,
      rank: 3,
    },
    {
      id: "4",
      name: "Shabana",
      role: "Sales Manager",
      orders: 980,
      callCompletion: 80,
      coverage: 80,
      complianceScore: 80,
      rank: 4,
    },
    {
      id: "5",
      name: "Ahmed Hassan",
      role: "Area Manager",
      orders: 875,
      callCompletion: 75,
      coverage: 78,
      complianceScore: 72,
      rank: 5,
    },
    {
      id: "6",
      name: "Fatima Ali",
      role: "Sales Manager",
      orders: 820,
      callCompletion: 72,
      coverage: 75,
      complianceScore: 70,
      rank: 6,
    },
    {
      id: "7",
      name: "Zain Malik",
      role: "Sales Representative",
      orders: 790,
      callCompletion: 70,
      coverage: 73,
      complianceScore: 68,
      rank: 7,
    },
    {
      id: "8",
      name: "Sarah Ahmed",
      role: "Sales Manager",
      orders: 765,
      callCompletion: 68,
      coverage: 70,
      complianceScore: 65,
      rank: 8,
    },
    {
      id: "9",
      name: "Bilal Khan",
      role: "Area Manager",
      orders: 745,
      callCompletion: 65,
      coverage: 68,
      complianceScore: 63,
      rank: 9,
    },
    {
      id: "10",
      name: "Ayesha Rahman",
      role: "Sales Representative",
      orders: 720,
      callCompletion: 63,
      coverage: 65,
      complianceScore: 60,
      rank: 10,
    },
  ];
};

// Badge configurations
export const leaderboardBadges = [
  { id: "orders", label: "ORDERS", color: "bg-[#0f72f4] text-white" },
  { id: "callCompletion", label: "CALL COMPLETION", color: "bg-[#1dc9b7] text-white" },
  { id: "coverage", label: "COVERAGE", color: "bg-[#4caf50] text-white" },
  { id: "complianceScore", label: "COMPLIANCE SCORE", color: "bg-[#ff5722] text-white" },
];
