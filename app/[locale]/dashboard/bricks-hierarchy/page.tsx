"use client";

import { BricksHierarchy } from "@/components/BricksHierarchy";
import { HeadingWithAction } from "@/components/shared/HeadingWithAction";
import { bricksHierarchyData } from "@/app/data/bricksData";
import { Plus } from "lucide-react";

export default function BricksHierarchyPage() {
  const handleAddRegion = () => {
    console.log("Add new region clicked");
    // Implement your add region logic here
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
          title="Bricks hierarchy"
          description="Manage geographical hierarchy - Country, Province, City, and Bricks"
          buttonText="Add New Region"
          buttonIcon={Plus}
          onButtonClick={handleAddRegion}
        />

        {/* Hierarchy Component */}
        <BricksHierarchy
          data={bricksHierarchyData}
          onAddChild={handleAddChild}
          onMoreOptions={handleMoreOptions}
        />
      </div>
    </div>
  );
}
