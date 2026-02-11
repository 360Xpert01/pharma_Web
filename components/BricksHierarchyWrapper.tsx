"use client";

import { useEffect } from "react";
import { BricksHierarchy } from "@/components/BricksHierarchy";
import { useAppDispatch, useAppSelector } from "@/store";
import { getBrickList } from "@/store/slices/brick/getBrickListSlice";

export default function BricksHierarchyWrapper() {
  const dispatch = useAppDispatch();

  // Select state from Redux store
  const { loading, error, zones, regions, bricks } = useAppSelector((state) => state.brickList);

  // Fetch brick list on mount
  useEffect(() => {
    dispatch(getBrickList());
  }, [dispatch]);

  const handleAddChild = (parentId: string, childType: string) => {
    console.log("Add child to:", parentId, "Type:", childType);
    // TODO: Implement add child logic here
    // dispatch(addBrickChild({ parentId, childType }));
  };

  const handleMoreOptions = (itemId: string, itemType: string) => {
    console.log("More options for:", itemId, "Type:", itemType);
    // TODO: Implement more options logic here
    // This could open a modal or dropdown with edit/delete options
  };

  return (
    <BricksHierarchy
      zones={zones}
      regions={regions}
      bricks={bricks}
      loading={loading}
      error={error}
      onAddChild={handleAddChild}
      onMoreOptions={handleMoreOptions}
    />
  );
}
