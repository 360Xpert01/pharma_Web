import { Manager } from "@/components/ManagerSection";

// Mock data for Set Target page
export const mockManagers: Manager[] = [
  {
    id: "manager1",
    name: "Imran Ahmed",
    salesReps: [
      {
        id: "rep3",
        name: "Danish Kumar",
        role: "Sales Representative",
        avatar: "/girlPic.png",
        productTags: ["L40", "L42", "L48"], // No conflicts within this manager's team
        products: [
          {
            id: "prod5",
            name: "Divalol 750mg",
            targetQuantity: "50 Packets",
            completionPercentage: 100,
            inputValue: "",
            hasConflict: false,
          },
          {
            id: "prod9",
            name: "Wellprox 500mg",
            targetQuantity: "50 Packets",
            completionPercentage: 50,
            inputValue: "",
            hasConflict: false, // NO conflict - only this rep has Wellprox in Asad Raza's team
          },
        ],
      },
      {
        id: "rep4",
        name: "Majid Hussain",
        role: "Sales Representative",
        avatar: "/girlPic.png",
        productTags: ["L43", "L52", "874"], // L43 conflicts with rep6
        products: [
          {
            id: "prod6",
            name: "Medooro 100mg",
            targetQuantity: "50 Packets",
            completionPercentage: 100,
            inputValue: "",
            hasConflict: false,
          },
          {
            id: "prod7",
            name: "Elt 250mg",
            targetQuantity: "50 Packets",
            completionPercentage: 100,
            inputValue: "",
            hasConflict: false,
          },
        ],
      },
      {
        id: "rep5",
        name: "Danish Kumar",
        role: "Sales Representative",
        avatar: "/girlPic.png",
        productTags: ["L57", "L60"], // No conflicts
        products: [
          {
            id: "prod8",
            name: "Divalol 750mg",
            targetQuantity: "50 Packets",
            completionPercentage: 100,
            inputValue: "",
            hasConflict: false,
          },
        ],
      },
    ],
  },
  {
    id: "manager2",
    name: "Zahid Rahimoon",
    salesReps: [
      {
        id: "rep1",
        name: "Danish Kumar",
        role: "Sales Representative",
        avatar: "/girlPic.png",
        productTags: ["L40", "L42", "L48", "L57"], // L40, L48 shared with Majid - potential conflict
        products: [
          {
            id: "prod1",
            name: "Dapakan 500mg", // Same as Majid's prod3 in same brick L40 = CONFLICT
            targetQuantity: "50 Packets",
            completionPercentage: 50, // 50% because shared with Majid in same brick
            inputValue: "",
            hasConflict: true, // Conflict with Majid's Dapakan 500mg in L40 brick
          },
          {
            id: "prod2",
            name: "Wellprox 500mg",
            targetQuantity: "50 Packets",
            completionPercentage: 50,
            inputValue: "",
            hasConflict: true, // Conflict with Majid in same brick
          },
        ],
      },
      {
        id: "rep2",
        name: "Majid Hussain",
        role: "Sales Representative",
        avatar: "/girlPic.png",
        productTags: ["L40", "L48", "L43", "L52", "874"], // L40, L48 shared with Danish - potential conflict
        products: [
          {
            id: "prod3",
            name: "Dapakan 500mg", // Same as Danish's prod1 in same brick L40 = CONFLICT
            targetQuantity: "50 Packets",
            completionPercentage: 50, // 50% because shared with Danish in same brick
            inputValue: "",
            hasConflict: true, // Conflict with Danish's Dapakan 500mg in L40 brick
          },
          {
            id: "prod4",
            name: "Atorvastatin 10gm",
            targetQuantity: "50 Packets",
            completionPercentage: 100,
            inputValue: "Atorvastatin 10gm",
            hasConflict: false,
          },
          {
            id: "prod5",
            name: "Wellprox 500mg",
            targetQuantity: "50 Packets",
            completionPercentage: 50,
            inputValue: "",
            hasConflict: true, // Conflict with Danish in same brick
          },
          {
            id: "prod6",
            name: "ER 250mg",
            targetQuantity: "50 Packets",
            completionPercentage: 100,
            inputValue: "ER 250mg",
            hasConflict: false,
          },
        ],
      },
    ],
  },
];

// Mock managers for selection
export const managersList = [
  { id: "manager1", name: "Imran Ahmed" },
  { id: "manager2", name: "Zahid Rahimoon" },
];
