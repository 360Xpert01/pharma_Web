export const roleHierarchyData = [
  {
    id: "company-1",
    name: "Company 1 CEO",
    subtitle: "CEO",
    type: "company" as const,
    children: [
      {
        id: "dept-1",
        name: "Director Marketing & Sales",
        subtitle: "Marketing & Sales",
        type: "department" as const,
        children: [
          {
            id: "pos-1",
            name: "Head of Marketing & Sales",
            subtitle: "HOD Sales",
            type: "position" as const,
            children: [
              {
                id: "role-1",
                name: "Sales Manager",
                subtitle: "Sr Sales Manager",
                type: "position" as const,
                children: [
                  {
                    id: "role-2",
                    name: "Enter Tree Name",
                    subtitle: "Choose Your Responisibilities",
                    type: "role" as const,
                    responsibilities: "Choose Your Responisibilities",
                    children: [],
                  },
                ],
              },
            ],
          },
        ],
      },

      {
        id: "dept-2",
        name: "Head of R&D",
        subtitle: "HOD R&D",
        type: "department" as const,
        children: [],
      },
    ],
  },

  {
    id: "company-2",
    name: "Company 2 COO",
    subtitle: "COO",
    type: "company" as const,
    children: [],
  },
];
