"use client";

import { useEffect } from "react";
import { BricksHierarchy } from "@/components/BricksHierarchy";
import { HeadingWithAction } from "@/components/shared/HeadingWithAction";
import { Plus } from "lucide-react";
import { useAppDispatch, useAppSelector } from "@/store";
import { getBrickList } from "@/store/slices/brick/getBrickListSlice";

export default function BricksHierarchyPage() {
  const dispatch = useAppDispatch();

  // Select state from Redux store
  const { loading, error, regions, provinces, cities, areas, bricks } = useAppSelector(
    (state) => state.brickList
  );

  // Fetch brick list on mount
  useEffect(() => {
    dispatch(getBrickList());
  }, [dispatch]);

  const handleAddRegion = () => {
    console.log("Add new region clicked");
    // Implement your add region logic here
  };

  const handleAddChild = (parentId: string, childType: string) => {
    console.log("Add child to:", parentId, "Type:", childType);
    // Implement your add child logic here
  };

  const handleMoreOptions = (itemId: string, itemType: string) => {
    console.log("More options for:", itemId, "Type:", itemType);
    // Implement your more options logic here
  };

  return (
    <div className="min-h-screen bg-gray-50 p-8 mt-10">
      <div className="w-full mt-10 ">
        {/* Heading Section */}
        <HeadingWithAction
          title="Bricks hierarchy"
          description="Manage geographical hierarchy - Region, Province, City, Area, and Bricks"
          buttonText="Add New Region"
          buttonIcon={Plus}
          onButtonClick={handleAddRegion}
        />

        {/* Hierarchy Component */}
        <BricksHierarchy
          regions={regions}
          provinces={provinces}
          cities={cities}
          areas={areas}
          bricks={bricks}
          loading={loading}
          error={error}
          onAddChild={handleAddChild}
          onMoreOptions={handleMoreOptions}
        />
      </div>
    </div>
  );
}
