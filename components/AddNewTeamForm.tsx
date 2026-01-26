"use client";

import React, { useState, useEffect, useCallback } from "react";
import { Plus, ChevronDown, ChevronRight, X, Search, Trash2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useAppDispatch, useAppSelector } from "@/store";
import { Button } from "@/components/ui/button/button";
import {
  generatePrefix,
  resetGeneratePrefixState,
} from "@/store/slices/preFix/generatePrefixSlice";
import { getAllChannels } from "@/store/slices/channel/getAllChannelsSlice";
import { getAllCallPoints } from "@/store/slices/callPoint/getAllCallPointsSlice";
import { getAllProducts } from "@/store/slices/product/getAllProductsSlice";
import { getAllRoles } from "@/store/slices/role/getAllRolesSlice";
import { getUsersByRole, resetUsersByRoleState } from "@/store/slices/employee/getUsersByRoleSlice";
import {
  getUserHierarchy,
  resetUserHierarchyState,
} from "@/store/slices/employee/getUserHierarchySlice";
import { getBrickList } from "@/store/slices/brick/getBrickListSlice";
import type { Brick } from "@/store/slices/brick/getBrickListSlice";
import { createTeam, resetCreateTeamState } from "@/store/slices/team/createTeamSlice";
import type { CreateTeamPayload } from "@/store/slices/team/createTeamSlice";
import { teamCreationSchema } from "@/validations";
import {
  FormInput,
  FormSelect,
  StatusToggle,
  ProductSearch,
  MemberSearch,
} from "@/components/form";
import type { SelectedMember } from "@/components/form/MemberSearch";

// Product type
interface Product {
  id: string;
  code: string;
  name: string;
  category?: string;
  skus?: string[];
}

// Hierarchy Node type (from API)
interface HierarchyNodeType {
  userId: string;
  email: string;
  fullName: string;
  roleId: string;
  roleName: string;
  supervisorId: string | null;
  hierarchyLevel: number;
  parentSalesRepId: string | null;
  isSalesRep: boolean;
  children: HierarchyNodeType[];
}

// Function to deep clone a hierarchy node
function cloneHierarchyNode(node: HierarchyNodeType): HierarchyNodeType {
  return {
    ...node,
    children: node.children.map(cloneHierarchyNode),
  };
}

// Function to merge multiple hierarchies intelligently
// If two sales reps share the same manager, they will be placed under the same manager node
function mergeHierarchies(hierarchies: HierarchyNodeType[]): HierarchyNodeType[] {
  if (hierarchies.length === 0) return [];
  if (hierarchies.length === 1) return hierarchies;

  const mergedMap = new Map<string, HierarchyNodeType>();

  for (const hierarchy of hierarchies) {
    const rootId = hierarchy.userId;

    if (mergedMap.has(rootId)) {
      // This root already exists, merge children
      const existingNode = mergedMap.get(rootId)!;
      existingNode.children = mergeHierarchyChildren(existingNode.children, hierarchy.children);
    } else {
      // Clone to avoid mutating original
      mergedMap.set(rootId, cloneHierarchyNode(hierarchy));
    }
  }

  return Array.from(mergedMap.values());
}

// Helper function to merge children arrays
function mergeHierarchyChildren(
  existingChildren: HierarchyNodeType[],
  newChildren: HierarchyNodeType[]
): HierarchyNodeType[] {
  const childMap = new Map<string, HierarchyNodeType>();

  // Add existing children to map
  for (const child of existingChildren) {
    childMap.set(child.userId, cloneHierarchyNode(child));
  }

  // Merge new children
  for (const child of newChildren) {
    if (childMap.has(child.userId)) {
      // Child exists, merge their children recursively
      const existingChild = childMap.get(child.userId)!;
      existingChild.children = mergeHierarchyChildren(existingChild.children, child.children);
    } else {
      // New child, add it
      childMap.set(child.userId, cloneHierarchyNode(child));
    }
  }

  return Array.from(childMap.values());
}

// Props for HierarchyNode with brick assignment
interface HierarchyNodeProps {
  node: HierarchyNodeType;
  level: number;
  availableBricks: Brick[];
  assignedBricks: Map<string, Brick[]>;
  onAssignBrick: (userId: string, brick: Brick) => void;
  onRemoveBrick: (userId: string, brickId: string) => void;
  brickSearchQuery: string;
  activeBrickSearchUserId: string | null;
  onBrickSearchChange: (query: string) => void;
  onToggleBrickSearch: (userId: string | null) => void;
}

// Recursive Hierarchy Node Component with Brick Assignment
function HierarchyNode({
  node,
  level,
  availableBricks,
  assignedBricks,
  onAssignBrick,
  onRemoveBrick,
  brickSearchQuery,
  activeBrickSearchUserId,
  onBrickSearchChange,
  onToggleBrickSearch,
}: HierarchyNodeProps) {
  const [isOpen, setIsOpen] = useState(true);
  const hasChildren = node.children && node.children.length > 0;
  const isSearchActive = activeBrickSearchUserId === node.userId;
  const userBricks = assignedBricks.get(node.userId) || [];

  // Filter bricks by search query (exclude already assigned)
  const filteredBricks = availableBricks.filter(
    (brick) =>
      !userBricks.find((b) => b.id === brick.id) &&
      brick.name.toLowerCase().includes(brickSearchQuery.toLowerCase())
  );

  const handleAssignBricksClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    onToggleBrickSearch(isSearchActive ? null : node.userId);
    onBrickSearchChange("");
  };

  const handleBrickSelect = (brick: Brick) => {
    onAssignBrick(node.userId, brick);
    onBrickSearchChange("");
    // Close search after selecting a brick - button will reappear
    onToggleBrickSearch(null);
  };

  return (
    <div className="relative" style={{ marginLeft: level > 0 ? "64px" : "0" }}>
      {/* Connector line */}
      {level > 0 && (
        <div className="absolute left-[-24px] top-8 w-6 border-t-2 border-dotted border-[var(--gray-3)]" />
      )}

      {/* Node card */}
      <div
        onClick={() => hasChildren && setIsOpen(!isOpen)}
        className={`flex items-center gap-4 bg-[var(--light)] border border-[var(--gray-2)] rounded-8 p-6 hover:shadow-soft transition-all ${hasChildren ? "cursor-pointer" : ""} select-none`}
      >
        {hasChildren && (
          <Button size="icon" variant="ghost" className="flex-shrink-0 w-8 h-8">
            {isOpen ? (
              <ChevronDown className="w-5 h-5 text-[var(--gray-5)]" />
            ) : (
              <ChevronRight className="w-5 h-5 text-[var(--gray-5)]" />
            )}
          </Button>
        )}

        <div className="w-12 h-12 rounded-8 bg-[var(--gray-3)] overflow-hidden flex-shrink-0 flex items-center justify-center">
          <span className="text-[var(--gray-6)] font-bold text-lg">
            {node.fullName
              ?.split(" ")
              .map((n) => n[0])
              .join("")
              .toUpperCase()}
          </span>
        </div>

        <div className="flex-1">
          <p className="t-td-b">{node.fullName}</p>
          <p className="t-md">{node.roleName}</p>
        </div>

        {node.isSalesRep && (
          <div className="flex items-center gap-2">
            {/* Assigned Bricks Pills */}
            {userBricks.slice(0, 4).map((brick) => (
              <span
                key={brick.id}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-[var(--primary)] text-[var(--primary-foreground)] text-sm font-medium rounded-8 whitespace-nowrap"
              >
                {brick.name}
                <Button
                  size="icon-sm"
                  variant="ghost"
                  onClick={(e) => {
                    e.stopPropagation();
                    onRemoveBrick(node.userId, brick.id);
                  }}
                  className="w-4 h-4 hover:bg-[var(--primary-2)]"
                >
                  <X className="w-3 h-3" />
                </Button>
              </span>
            ))}
            {userBricks.length > 4 && (
              <span className="inline-flex items-center px-3 py-1.5 bg-[var(--primary)] text-[var(--primary-foreground)] text-sm font-medium rounded-8 whitespace-nowrap">
                +{userBricks.length - 4}
              </span>
            )}

            {/* Assign Bricks Button OR Search Input */}
            {isSearchActive ? (
              <div className="relative" onClick={(e) => e.stopPropagation()}>
                <div className="relative">
                  <input
                    type="text"
                    value={brickSearchQuery}
                    onChange={(e) => onBrickSearchChange(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        e.preventDefault();
                        onToggleBrickSearch(null);
                      }
                    }}
                    placeholder="e.g: KL123, KL456, KL789"
                    className="w-64 px-4 py-3 pl-12 border border-[var(--gray-3)] rounded-8 focus:ring-2 focus:ring-[var(--primary)] outline-none"
                    autoFocus
                  />
                  <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[var(--gray-4)]" />
                  <Button
                    size="icon-sm"
                    variant="ghost"
                    onClick={() => onToggleBrickSearch(null)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-[var(--gray-4)] hover:text-[var(--gray-6)]"
                  >
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <circle cx="12" cy="5" r="1.5" />
                      <circle cx="12" cy="12" r="1.5" />
                      <circle cx="12" cy="19" r="1.5" />
                    </svg>
                  </Button>
                </div>{" "}
                {/* Brick Dropdown */}
                {brickSearchQuery && (
                  <div className="absolute z-20 w-64 mt-2 bg-[var(--light)] border border-[var(--gray-2)] rounded-8 shadow-soft max-h-48 overflow-y-auto">
                    {filteredBricks.length > 0 ? (
                      filteredBricks.map((brick) => (
                        <div
                          key={brick.id}
                          onClick={() => handleBrickSelect(brick)}
                          className="p-3 hover:bg-[var(--muted)] cursor-pointer border-b border-[var(--gray-1)] last:border-0 transition-colors"
                        >
                          <p className="font-medium text-[var(--gray-9)]">{brick.name}</p>
                        </div>
                      ))
                    ) : (
                      <div className="p-3 text-center text-[var(--gray-5)]">No bricks found</div>
                    )}
                  </div>
                )}
              </div>
            ) : (
              <Button
                onClick={handleAssignBricksClick}
                variant="primary"
                size="lg"
                icon={Plus}
                rounded="default"
                className="shadow-soft"
              >
                Assign Bricks
              </Button>
            )}
          </div>
        )}

        <Button
          size="icon"
          variant="ghost"
          className="text-[var(--gray-4)] hover:text-[var(--gray-5)]"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z"
            />
          </svg>
        </Button>
      </div>

      {/* Children */}
      {hasChildren && isOpen && (
        <div className="relative mt-4">
          {/* Vertical line for children */}
          {node.children.length > 1 && (
            <div
              className="absolute left-10 top-0 border-l-2 border-dotted border-[var(--gray-3)]"
              style={{ height: `calc(100% - 40px)` }}
            />
          )}
          <div className="space-y-4">
            {node.children.map((child) => (
              <HierarchyNode
                key={child.userId}
                node={child}
                level={level + 1}
                availableBricks={availableBricks}
                assignedBricks={assignedBricks}
                onAssignBrick={onAssignBrick}
                onRemoveBrick={onRemoveBrick}
                brickSearchQuery={brickSearchQuery}
                activeBrickSearchUserId={activeBrickSearchUserId}
                onBrickSearchChange={onBrickSearchChange}
                onToggleBrickSearch={onToggleBrickSearch}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default function CreateCampaignForm() {
  const dispatch = useAppDispatch();
  const router = useRouter();

  // Redux selectors
  const {
    generatedPrefix,
    loading: prefixLoading,
    error: prefixError,
  } = useAppSelector((state) => state.generatePrefix);
  const { channels, loading: channelsLoading } = useAppSelector((state) => state.allChannels);
  const { callPoints, loading: callPointsLoading } = useAppSelector((state) => state.allCallPoints);
  const { products: allProducts, loading: productsLoading } = useAppSelector(
    (state) => state.allProducts
  );
  const { roles } = useAppSelector((state) => state.allRoles);
  const { users: salesRepUsers, loading: usersLoading } = useAppSelector(
    (state) => state.usersByRole
  );
  // Bricks selector
  const { bricks: availableBricks, loading: bricksLoading } = useAppSelector(
    (state) => state.brickList
  );

  // Create team selector
  const {
    loading: createTeamLoading,
    success: createTeamSuccess,
    error: createTeamError,
  } = useAppSelector((state) => state.createTeam);

  // Form States
  const [status, setStatus] = useState<"Active" | "Inactive">("Active");
  const [teamName, setTeamName] = useState("");
  const [selectedChannelId, setSelectedChannelId] = useState("");
  const [selectedCallPointId, setSelectedCallPointId] = useState("");
  const [products, setProducts] = useState<Product[]>([]);

  // Member search states
  const [selectedMembers, setSelectedMembers] = useState<SelectedMember[]>([]);
  const [memberHierarchies, setMemberHierarchies] = useState<Map<string, HierarchyNodeType>>(
    new Map()
  );
  const [mergedHierarchy, setMergedHierarchy] = useState<HierarchyNodeType[]>([]);
  const [hierarchyLoading, setHierarchyLoading] = useState(false);

  // Brick assignment states
  const [assignedBricks, setAssignedBricks] = useState<Map<string, Brick[]>>(new Map());
  const [brickSearchQuery, setBrickSearchQuery] = useState("");
  const [activeBrickSearchUserId, setActiveBrickSearchUserId] = useState<string | null>(null);

  // Validation errors state
  const [validationErrors, setValidationErrors] = useState<Record<string, string>>({});
  // Helper function to get error message for a field
  const getErrorMessage = (fieldName: string) => validationErrors[fieldName] || "";

  // Helper function to clear error for a specific field when user types
  const clearFieldError = (fieldName: string) => {
    if (validationErrors[fieldName]) {
      setValidationErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[fieldName];
        return newErrors;
      });
    }
  };

  useEffect(() => {
    // Generate pulse code for "Team" entity
    dispatch(generatePrefix({ entity: "Team" }));

    // Fetch all channels for dropdown
    dispatch(getAllChannels());

    // Fetch all call points for dropdown
    dispatch(getAllCallPoints());

    // Fetch all products for search
    dispatch(getAllProducts());

    // Fetch all roles to find Sales Representative roleId
    dispatch(getAllRoles());

    // Fetch all bricks for assignment
    dispatch(getBrickList());

    return () => {
      dispatch(resetGeneratePrefixState());
      dispatch(resetUsersByRoleState());
      dispatch(resetUserHierarchyState());
      dispatch(resetCreateTeamState());
    };
  }, [dispatch]);

  // Handle create team success/error
  useEffect(() => {
    if (createTeamSuccess) {
      // Reset state and navigate to campaign-management
      dispatch(resetCreateTeamState());
      router.push("/en/dashboard/campaign-Management");
    }
    if (createTeamError) {
      dispatch(resetCreateTeamState());
    }
  }, [createTeamSuccess, createTeamError, dispatch, router]);

  // Find Sales Representative role and fetch users with that role
  useEffect(() => {
    if (roles.length > 0) {
      const salesRepRole = roles.find(
        (role) => role.roleName.toLowerCase() === "sales representative"
      );
      if (salesRepRole) {
        dispatch(getUsersByRole(salesRepRole.id));
      }
    }
  }, [dispatch, roles]);

  // Fetch hierarchy when a new member is added using Redux
  const handleAddMemberHierarchy = useCallback(
    async (memberId: string) => {
      setHierarchyLoading(true);
      const result = await dispatch(getUserHierarchy(memberId));

      if (getUserHierarchy.fulfilled.match(result) && result.payload.data) {
        setMemberHierarchies((prev) => {
          const newMap = new Map(prev);
          newMap.set(memberId, result.payload.data);
          return newMap;
        });
      } else if (getUserHierarchy.rejected.match(result)) {
        console.error("Failed to fetch hierarchy for member:", memberId, result.payload);
      }
      setHierarchyLoading(false);
    },
    [dispatch]
  );

  // Merge hierarchies whenever memberHierarchies changes
  useEffect(() => {
    if (memberHierarchies.size === 0) {
      setMergedHierarchy([]);
      return;
    }

    const hierarchiesArray = Array.from(memberHierarchies.values());
    const merged = mergeHierarchies(hierarchiesArray);
    setMergedHierarchy(merged);
  }, [memberHierarchies]);

  // Handle assigning a brick to a user
  const handleAssignBrick = (userId: string, brick: Brick) => {
    setAssignedBricks((prev) => {
      const newMap = new Map(prev);
      const userBricks = newMap.get(userId) || [];
      if (!userBricks.find((b) => b.id === brick.id)) {
        newMap.set(userId, [...userBricks, brick]);
      }
      return newMap;
    });
  };

  // Handle removing a brick from a user
  const handleRemoveBrick = (userId: string, brickId: string) => {
    setAssignedBricks((prev) => {
      const newMap = new Map(prev);
      const userBricks = newMap.get(userId) || [];
      newMap.set(
        userId,
        userBricks.filter((b) => b.id !== brickId)
      );
      return newMap;
    });
  };

  // Handle brick search query change
  const handleBrickSearchChange = (query: string) => {
    setBrickSearchQuery(query);
  };

  // Handle toggling brick search for a user
  const handleToggleBrickSearch = (userId: string | null) => {
    setActiveBrickSearchUserId(userId);
    if (userId === null) {
      setBrickSearchQuery("");
    }
  };

  // Handle form submission (with Zod validation)
  const handleSubmit = async () => {
    // Build saleRepIds with their assigned bricks
    const saleRepIds = selectedMembers.map((member) => ({
      id: member.id,
      brickIds: (assignedBricks.get(member.id) || []).map((brick) => brick.id),
    }));

    // Prepare form data for validation
    const formData = {
      pulseCode: generatedPrefix || "",
      legacyCode: generatedPrefix || "",
      name: teamName.trim(),
      status: status.toLowerCase() as "active" | "inactive",
      callPointId: selectedCallPointId,
      channelId: selectedChannelId,
      productIds: products.map((p) => p.id),
      saleRepIds,
    };

    // Validate using Zod schema
    const validation = teamCreationSchema.safeParse(formData);

    if (!validation.success) {
      // Create an errors object mapping field names to error messages
      const errors: Record<string, string> = {};
      validation.error.errors.forEach((err: any) => {
        const fieldName = err.path[0] as string;
        if (!errors[fieldName]) {
          errors[fieldName] = err.message;
        }
      });

      // Set validation errors to display inline
      setValidationErrors(errors);

      return;
    }

    // Clear any previous validation errors
    setValidationErrors({});

    // Use validated and transformed data
    const validatedData = validation.data;

    // Build payload
    const payload: CreateTeamPayload = {
      ...validatedData,
    };

    dispatch(createTeam(payload));
  };

  return (
    <div className=" ">
      <div className="bg-[var(--light)] rounded-8 shadow-soft p-8 space-y-10">
        {/* Team Name Section */}
        <div className="space-y-6">
          <h2 className="t-h2">Team Name</h2>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <FormInput
              label="Pulse Code"
              name="pulseCode"
              type="text"
              value={generatedPrefix || ""}
              onChange={() => {}}
              placeholder={prefixLoading ? "Generating..." : "TEM_072384"}
              required
              readOnly
              className="cursor-not-allowed"
              error={getErrorMessage("pulseCode")}
            />

            <FormInput
              label="Team Name"
              name="teamName"
              type="text"
              value={teamName}
              onChange={(value) => {
                setTeamName(value);
                clearFieldError("name");
              }}
              placeholder="e.g. High Blood Pressure"
              required
              error={getErrorMessage("name")}
            />

            <FormSelect
              label="Channel Name"
              name="channelId"
              value={selectedChannelId}
              onChange={(value) => {
                setSelectedChannelId(value);
                clearFieldError("channelId");
              }}
              options={channels.map((channel) => ({
                value: channel.id,
                label: channel.name,
              }))}
              placeholder="Select Channel"
              required
              loading={channelsLoading}
              error={getErrorMessage("channelId")}
            />

            <div className="flex justify-center items-center">
              <StatusToggle status={status} onChange={(newStatus) => setStatus(newStatus)} />
            </div>
          </div>

          <div className="max-w-md">
            <FormSelect
              label="Call Point"
              name="callPointId"
              value={selectedCallPointId}
              onChange={(value) => {
                setSelectedCallPointId(value);
                clearFieldError("callPointId");
              }}
              options={callPoints.map((callPoint) => ({
                value: callPoint.id,
                label: callPoint.name,
              }))}
              placeholder="Select Call Point"
              required
              loading={callPointsLoading}
              error={getErrorMessage("callPointId")}
            />
          </div>
        </div>

        {/* Select Products */}
        {/* <div className="space-y-6"> */}
        <div className="max-w-full">
          <ProductSearch
            allProducts={
              allProducts?.map((p) => ({
                id: p.id || "",
                code: p.productCode || "",
                name: p.name || "",
                category: p.productCategory || "",
                skus: p.productSkus || [],
              })) || []
            }
            selectedProducts={products}
            onProductsChange={(prods) => {
              setProducts(prods);
              clearFieldError("productIds");
            }}
            loading={productsLoading}
            error={getErrorMessage("productIds")}
            onSearchChange={() => clearFieldError("productIds")}
          />
        </div>
        {/* </div> */}

        {/* Assign Members */}
        <div className="space-y-6 py-8">
          <div>
            <h2 className="t-h2 mb-4">Assign Members</h2>

            <MemberSearch
              allMembers={
                salesRepUsers?.map((user) => ({
                  id: user.id || "",
                  firstName: user.firstName || "",
                  lastName: user.lastName || "",
                  pulseCode: user.pulseCode || "",
                  email: user.email || "",
                  profilePicture: user.profilePicture || "",
                })) || []
              }
              selectedMembers={selectedMembers}
              onMembersChange={(members) => {
                // Find newly added members and fetch their hierarchies
                const newMembers = members.filter(
                  (m) => !selectedMembers.find((sm) => sm.id === m.id)
                );
                newMembers.forEach((member) => handleAddMemberHierarchy(member.id));

                // Find removed members and clean up their hierarchies
                const removedMembers = selectedMembers.filter(
                  (sm) => !members.find((m) => m.id === sm.id)
                );
                removedMembers.forEach((member) => {
                  setMemberHierarchies((prev) => {
                    const newMap = new Map(prev);
                    newMap.delete(member.id);
                    return newMap;
                  });
                  setAssignedBricks((prev) => {
                    const newMap = new Map(prev);
                    newMap.delete(member.id);
                    return newMap;
                  });
                });

                setSelectedMembers(members);
                clearFieldError("saleRepIds");
              }}
              loading={usersLoading}
              placeholder="Search sales representative"
              label=""
              error={getErrorMessage("saleRepIds")}
              onSearchChange={() => clearFieldError("saleRepIds")}
            />
          </div>

          {/* Hierarchy Tree - Dynamic from API (Merged Hierarchies) */}
          {mergedHierarchy.length > 0 && (
            <div className="relative mt-6 space-y-4">
              {mergedHierarchy.map((hierarchyRoot) => (
                <HierarchyNode
                  key={hierarchyRoot.userId}
                  node={hierarchyRoot}
                  level={0}
                  availableBricks={availableBricks}
                  assignedBricks={assignedBricks}
                  onAssignBrick={handleAssignBrick}
                  onRemoveBrick={handleRemoveBrick}
                  brickSearchQuery={brickSearchQuery}
                  activeBrickSearchUserId={activeBrickSearchUserId}
                  onBrickSearchChange={handleBrickSearchChange}
                  onToggleBrickSearch={handleToggleBrickSearch}
                />
              ))}
            </div>
          )}

          {hierarchyLoading && (
            <div className="flex items-center justify-center py-8">
              <div className="t-mute">Loading hierarchy...</div>
            </div>
          )}

          {mergedHierarchy.length === 0 && !hierarchyLoading && selectedMembers.length > 0 && (
            <div className="flex items-center justify-center py-8">
              <div className="t-mute">No hierarchy data found</div>
            </div>
          )}
        </div>

        {/* Buttons */}
        <div className="flex justify-end gap-4 pt-6">
          <Button variant="outline" size="lg" rounded="default">
            Discard
          </Button>
          <Button
            onClick={handleSubmit}
            disabled={createTeamLoading}
            loading={createTeamLoading}
            variant="primary"
            size="lg"
            icon={Plus}
            rounded="default"
            className="shadow-soft"
          >
            {createTeamLoading ? "Creating..." : "Add Team"}
          </Button>
        </div>
      </div>
    </div>
  );
}
