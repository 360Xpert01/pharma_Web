"use client";

import { useEffect, useState } from "react";
import { BricksHierarchy } from "@/components/BricksHierarchy";
import { useAppDispatch, useAppSelector } from "@/store";
import { getBrickList } from "@/store/slices/brick/getBrickListSlice";
import { createBrick } from "@/store/slices/brick/createBrickSlice";
import { updateBrick } from "@/store/slices/brick/updateBrickSlice";
import { useBricksImport } from "@/hooks/useBricksImport";
import { toast } from "react-hot-toast";

export default function BricksHierarchyWrapper() {
  const dispatch = useAppDispatch();
  const { isImporting } = useBricksImport();
  const [addingId, setAddingId] = useState<string | null>(null);
  const [editingId, setEditingId] = useState<string | null>(null);

  // Select state from Redux store
  const { loading, error, zones, regions, bricks } = useAppSelector((state) => state.brickList);

  // Fetch brick list on mount
  useEffect(() => {
    dispatch(getBrickList());
  }, [dispatch]);

  useEffect(() => {
    const handleAddRoot = () => setAddingId("root");
    window.addEventListener("bricks:add-root", handleAddRoot);
    return () => window.removeEventListener("bricks:add-root", handleAddRoot);
  }, []);

  const handleCreateChild = async (
    parentId: string,
    type: string,
    name: string,
    description: string
  ) => {
    try {
      const payload: any = { name, type, description };
      if (parentId !== "root") {
        payload.parentId = parentId;
      }

      await dispatch(createBrick(payload)).unwrap();
      toast.success(`${type} created successfully!`);
      setAddingId(null);
      dispatch(getBrickList());
    } catch (err: any) {
      toast.error(`Failed to create ${type}: ${err}`);
    }
  };

  const handleAddChild = (parentId: string, childType: string) => {
    setAddingId(parentId);
  };

  const handleCancelAdd = () => {
    setAddingId(null);
  };

  const handleMoreOptions = (itemId: string, itemType: string) => {
    console.log("More options for:", itemId, "Type:", itemType);
  };

  const handleEdit = (itemId: string) => {
    setEditingId(itemId);
  };

  const handleCancelEdit = () => {
    setEditingId(null);
  };

  const handleUpdate = async (id: string, type: string, name: string, description: string) => {
    try {
      await dispatch(updateBrick({ id, name, type: type as any, description })).unwrap();
      toast.success(`${type} updated successfully!`);
      setEditingId(null);
      dispatch(getBrickList());
    } catch (err: any) {
      toast.error(`Failed to update ${type}: ${err}`);
    }
  };

  return (
    <BricksHierarchy
      zones={zones}
      regions={regions}
      bricks={bricks}
      loading={loading || isImporting}
      error={error}
      onAddChild={handleAddChild}
      onCancelAdd={handleCancelAdd}
      onCreateChild={handleCreateChild}
      onMoreOptions={handleMoreOptions}
      addingId={addingId}
      editingId={editingId}
      onEdit={handleEdit}
      onCancelEdit={handleCancelEdit}
      onUpdate={handleUpdate}
    />
  );
}
