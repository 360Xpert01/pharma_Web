"use client";

import { BricksHierarchy } from "@/components/RoleHierarchy";
import { HeadingWithAction } from "@/components/shared/HeadingWithAction";
import { roleHierarchyData } from "@/app/data/roleData";
import { Plus } from "lucide-react";

export default function RoleHierarchyPage() {
  const handleAddRegion = () => {
    console.log("Add new branch clicked");
    // Implement your add branch logic here
  };

  const handleAddChild = (parentId: string) => {
    console.log("Add child to:", parentId);
    // Implement your add child logic here
  };

  const handleMoreOptions = (itemId: string) => {
    console.log("More options for:", itemId);
    // Implement your more options logic here
  };

  return (
    <div className="min-h-screen bg-gray-50 p-8 mt-10">
      <div className="w-full mt-10 ">
        {/* Heading Section */}
        <HeadingWithAction
          title="Role hierarchy"
          description="Unlock the potential of your candidates"
          buttonText="Add New Branch"
          buttonIcon={Plus}
          onButtonClick={handleAddRegion}
        />

        {/* Hierarchy Component */}
        <BricksHierarchy
          data={roleHierarchyData}
          onAddChild={handleAddChild}
          onMoreOptions={handleMoreOptions}
        />
      </div>
    </div>
  );
}
