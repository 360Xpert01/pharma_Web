// Mock data for Bricks Hierarchy (matches UI screenshot exactly)
export const bricksHierarchyData = [
  {
    id: "pak-1",
    name: "Pakistan",
    type: "country" as const,
    children: [
      {
        id: "sindh-1",
        name: "Sindh",
        type: "province" as const,
        children: [
          {
            id: "karachi-1",
            name: "Karachi",
            type: "city" as const,
            children: [],
          },
          {
            id: "karachi-2",
            name: "Karachi",
            type: "city" as const,
            children: [],
          },
        ],
      },
    ],
  },

  {
    id: "pak-2",
    name: "Pakistan",
    type: "country" as const,
    children: [
      {
        id: "sindh-2",
        name: "Sindh",
        type: "province" as const,
        children: [
          {
            id: "karachi-3",
            name: "Karachi",
            type: "city" as const,
            children: [],
          },
          {
            id: "karachi-4",
            name: "Karachi",
            type: "city" as const,
            children: [],
          },
        ],
      },
    ],
  },
];
