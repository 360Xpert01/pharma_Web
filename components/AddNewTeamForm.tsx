"use client";

import React, { useState, useEffect, useCallback } from "react";
import { Plus, Trash2, Search, ChevronDown, ChevronRight, X } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useAppDispatch, useAppSelector } from "@/store";
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
import axios from "axios";
import { toast } from "sonner";

interface Product {
  id: string;
  code: string;
  name: string;
  skus?: string[];
}

// Selected Member type
interface SelectedMemberType {
  id: string;
  firstName: string;
  lastName: string;
  pulseCode: string;
  email: string;
  profilePicture?: string;
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
        className={`flex items-center gap-4 bg-[var(--light)] border border-[var(--gray-2)] rounded-2xl p-6 hover:shadow-md transition-all ${hasChildren ? "cursor-pointer" : ""} select-none`}
      >
        {hasChildren && (
          <button className="flex-shrink-0 w-8 h-8 flex items-center justify-center cursor-pointer">
            {isOpen ? (
              <ChevronDown className="w-5 h-5 text-[var(--gray-5)]" />
            ) : (
              <ChevronRight className="w-5 h-5 text-[var(--gray-5)]" />
            )}
          </button>
        )}

        <div className="w-12 h-12 rounded-full bg-[var(--gray-3)] overflow-hidden flex-shrink-0 flex items-center justify-center">
          <span className="text-[var(--gray-6)] font-bold text-lg">
            {node.fullName
              ?.split(" ")
              .map((n) => n[0])
              .join("")
              .toUpperCase()}
          </span>
        </div>

        <div className="flex-1">
          <p className="font-semibold text-[var(--gray-9)]">{node.fullName}</p>
          <p className="text-sm text-[var(--gray-5)]">{node.roleName}</p>
        </div>

        {node.isSalesRep && (
          <div className="flex items-center gap-2">
            {/* Assigned Bricks Pills */}
            {userBricks.slice(0, 4).map((brick) => (
              <span
                key={brick.id}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-[var(--primary)] text-[var(--primary-foreground)] text-sm font-medium rounded-full whitespace-nowrap"
              >
                {brick.name}
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onRemoveBrick(node.userId, brick.id);
                  }}
                  className="w-4 h-4 flex items-center justify-center hover:bg-[var(--primary-2)] rounded-full cursor-pointer"
                >
                  <X className="w-3 h-3" />
                </button>
              </span>
            ))}
            {userBricks.length > 4 && (
              <span className="inline-flex items-center px-3 py-1.5 bg-[var(--primary)] text-[var(--primary-foreground)] text-sm font-medium rounded-full whitespace-nowrap">
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
                    className="w-64 px-4 py-3 pl-12 border border-[var(--gray-3)] rounded-full focus:ring-2 focus:ring-[var(--primary)] outline-none"
                    autoFocus
                  />
                  <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[var(--gray-4)]" />
                  <button
                    onClick={() => onToggleBrickSearch(null)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-[var(--gray-4)] hover:text-[var(--gray-6)] cursor-pointer"
                  >
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <circle cx="12" cy="5" r="1.5" />
                      <circle cx="12" cy="12" r="1.5" />
                      <circle cx="12" cy="19" r="1.5" />
                    </svg>
                  </button>
                </div>

                {/* Brick Dropdown */}
                {brickSearchQuery && (
                  <div className="absolute z-20 w-64 mt-2 bg-[var(--light)] border border-[var(--gray-2)] rounded-xl shadow-xl max-h-48 overflow-y-auto">
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
              <button
                onClick={handleAssignBricksClick}
                className="px-6 py-3 bg-[var(--primary)] text-[var(--primary-foreground)] rounded-full flex items-center gap-2 hover:opacity-90 shadow-sm cursor-pointer"
              >
                <Plus className="w-5 h-5" />
                Assign Bricks
              </button>
            )}
          </div>
        )}

        <button className="text-[var(--gray-4)] hover:text-[var(--gray-5)] cursor-pointer">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z"
            />
          </svg>
        </button>
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
  const [searchQuery, setSearchQuery] = useState("");
  const [showSearchResults, setShowSearchResults] = useState(false);

  // Member search states
  const [memberSearchQuery, setMemberSearchQuery] = useState("");
  const [showMemberSearchResults, setShowMemberSearchResults] = useState(false);
  const [selectedMembers, setSelectedMembers] = useState<SelectedMemberType[]>([]);
  const [memberHierarchies, setMemberHierarchies] = useState<Map<string, HierarchyNodeType>>(
    new Map()
  );
  const [mergedHierarchy, setMergedHierarchy] = useState<HierarchyNodeType[]>([]);
  const [hierarchyLoading, setHierarchyLoading] = useState(false);

  // Brick assignment states
  const [assignedBricks, setAssignedBricks] = useState<Map<string, Brick[]>>(new Map());
  const [brickSearchQuery, setBrickSearchQuery] = useState("");
  const [activeBrickSearchUserId, setActiveBrickSearchUserId] = useState<string | null>(null);

  // Get base URL for API calls
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

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
      toast.error(createTeamError);
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

  // Fetch hierarchy for a specific member
  const fetchMemberHierarchy = useCallback(
    async (memberId: string): Promise<HierarchyNodeType | null> => {
      try {
        const sessionStr = localStorage.getItem("userSession");
        if (!sessionStr) return null;

        const response = await axios.get(
          `${baseUrl}api/v1/users/hierarchy/sales-reps/${memberId}`,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${sessionStr}`,
            },
          }
        );

        if (response.data?.success && response.data?.data) {
          return response.data.data;
        }
        return null;
      } catch (error) {
        console.error("Failed to fetch hierarchy for member:", memberId, error);
        return null;
      }
    },
    [baseUrl]
  );

  // Fetch hierarchy when a new member is added
  const handleAddMemberHierarchy = useCallback(
    async (memberId: string) => {
      setHierarchyLoading(true);
      const hierarchy = await fetchMemberHierarchy(memberId);

      if (hierarchy) {
        setMemberHierarchies((prev) => {
          const newMap = new Map(prev);
          newMap.set(memberId, hierarchy);
          return newMap;
        });
      }
      setHierarchyLoading(false);
    },
    [fetchMemberHierarchy]
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

  // Filter sales rep users by search query (exclude already selected members)
  const filteredMembers = salesRepUsers.filter(
    (user) =>
      !selectedMembers.find((m) => m.id === user.id) &&
      (`${user.firstName} ${user.lastName}`
        .toLowerCase()
        .includes(memberSearchQuery.toLowerCase()) ||
        user.pulseCode.toLowerCase().includes(memberSearchQuery.toLowerCase()) ||
        user.email.toLowerCase().includes(memberSearchQuery.toLowerCase()))
  );

  // Handle member selection (add to array)
  const handleSelectMember = (user: any) => {
    const newMember: SelectedMemberType = {
      id: user.id,
      firstName: user.firstName,
      lastName: user.lastName,
      pulseCode: user.pulseCode,
      email: user.email,
      profilePicture: user.profilePicture,
    };

    // Check if already selected
    if (!selectedMembers.find((m) => m.id === user.id)) {
      setSelectedMembers([...selectedMembers, newMember]);
      // Fetch hierarchy for this new member
      handleAddMemberHierarchy(user.id);
    }

    setMemberSearchQuery("");
    setShowMemberSearchResults(false);
  };

  // Handle removing a member
  const handleRemoveMember = (memberId: string) => {
    setSelectedMembers(selectedMembers.filter((m) => m.id !== memberId));
    // Also remove hierarchy for this member
    setMemberHierarchies((prev) => {
      const newMap = new Map(prev);
      newMap.delete(memberId);
      return newMap;
    });
    // Also remove assigned bricks for this member
    setAssignedBricks((prev) => {
      const newMap = new Map(prev);
      newMap.delete(memberId);
      return newMap;
    });
  };

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

  const removeProduct = (id: string) => {
    setProducts(products.filter((p) => p.id !== id));
  };

  const addProduct = (product: any) => {
    if (!products.find((p) => p.id === product.id)) {
      setProducts([
        ...products,
        {
          id: product.id,
          code: product.productCode,
          name: product.name,
          skus: product.productSkus,
        },
      ]);
    }
    setSearchQuery("");
    setShowSearchResults(false);
  };

  // Handle form submission
  const handleSubmit = async () => {
    // Validation
    if (!generatedPrefix) {
      toast.error("Pulse code is required");
      return;
    }
    if (!teamName.trim()) {
      toast.error("Team name is required");
      return;
    }
    if (!selectedChannelId) {
      toast.error("Channel is required");
      return;
    }
    if (!selectedCallPointId) {
      toast.error("Call point is required");
      return;
    }
    if (products.length === 0) {
      toast.error("At least one product is required");
      return;
    }
    if (selectedMembers.length === 0) {
      toast.error("At least one member is required");
      return;
    }

    // Build saleRepIds with their assigned bricks
    const saleRepIds = selectedMembers.map((member) => ({
      id: member.id,
      brickIds: (assignedBricks.get(member.id) || []).map((brick) => brick.id),
    }));

    // Build payload
    const payload: CreateTeamPayload = {
      pulseCode: generatedPrefix,
      legacyCode: generatedPrefix, // Use pulseCode as legacyCode or modify as needed
      name: teamName.trim(),
      status: status.toLowerCase() as "active" | "inactive",
      callPointId: selectedCallPointId,
      channelId: selectedChannelId,
      productIds: products.map((p) => p.id),
      saleRepIds,
    };

    console.log("Submitting team:", payload);
    dispatch(createTeam(payload));
  };

  const filteredProducts = allProducts.filter(
    (p) =>
      p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.productCode.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className=" ">
      <div className="bg-[var(--light)] rounded-2xl shadow-lg p-8 space-y-10">
        {/* Team Name Section */}
        <div className="space-y-6">
          <h2 className="text-2xl font-bold text-[var(--gray-9)]">Team Name</h2>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 items-end">
            <div>
              <label className="block text-sm font-medium text-[var(--gray-6)]">
                Pulse Code<span className="text-[var(--destructive)]">*</span>
              </label>
              <input
                type="text"
                value={generatedPrefix || ""}
                placeholder={prefixLoading ? "Generating..." : "PLS_TEM_072384"}
                readOnly
                className="mt-1 w-full px-4 py-3 border border-[var(--gray-3)] rounded-xl bg-[var(--gray-1)] text-[var(--gray-6)] cursor-not-allowed outline-none"
                title={prefixError || "Auto-generated pulse code (read-only)"}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-[var(--gray-6)]">
                Team Name<span className="text-[var(--destructive)]">*</span>
              </label>
              <input
                type="text"
                value={teamName}
                onChange={(e) => setTeamName(e.target.value)}
                placeholder="e.g. High Blood Pressure"
                className="mt-1 w-full px-4 py-3 border border-[var(--gray-3)] rounded-xl focus:ring-2 focus:ring-[var(--primary)] outline-none"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-[var(--gray-6)]">
                Channel Name<span className="text-[var(--destructive)]">*</span>
              </label>
              <select
                value={selectedChannelId}
                onChange={(e) => setSelectedChannelId(e.target.value)}
                className="mt-1 w-full px-4 py-3 border border-[var(--gray-3)] rounded-xl focus:ring-2 focus:ring-[var(--primary)] outline-none bg-[var(--light)]"
              >
                <option value="">Select Channel</option>
                {channelsLoading ? (
                  <option disabled>Loading channels...</option>
                ) : (
                  channels.map((channel) => (
                    <option key={channel.id} value={channel.id}>
                      {channel.name}
                    </option>
                  ))
                )}
              </select>
            </div>
            <div className="flex justify-center">
              <div className="inline-flex border border-[var(--gray-3)] rounded-full p-1 bg-[var(--gray-1)]">
                <button
                  onClick={() => setStatus("Active")}
                  className={`px-6 py-2 rounded-full text-sm font-medium cursor-pointer ${status === "Active" ? "bg-[var(--primary)] text-[var(--primary-foreground)]" : "text-[var(--gray-5)]"}`}
                >
                  Active
                </button>
                <button
                  onClick={() => setStatus("Inactive")}
                  className={`px-6 py-2 rounded-full text-sm font-medium cursor-pointer ${status === "Inactive" ? "bg-[var(--primary)] text-[var(--primary-foreground)]" : "text-[var(--gray-5)]"}`}
                >
                  Inactive
                </button>
              </div>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-[var(--gray-6)]">
              Call Point<span className="text-[var(--destructive)]">*</span>
            </label>
            <select
              value={selectedCallPointId}
              onChange={(e) => setSelectedCallPointId(e.target.value)}
              className="mt-1 w-full max-w-md px-4 py-3 border border-[var(--gray-3)] rounded-xl focus:ring-2 focus:ring-[var(--primary)] outline-none bg-[var(--light)]"
            >
              <option value="">Select Call Point</option>
              {callPointsLoading ? (
                <option disabled>Loading call points...</option>
              ) : (
                callPoints.map((callPoint) => (
                  <option key={callPoint.id} value={callPoint.id}>
                    {callPoint.name}
                  </option>
                ))
              )}
            </select>
          </div>
        </div>

        {/* Select Products */}
        <div className="space-y-6">
          <h2 className="text-2xl font-bold text-[var(--gray-9)]">Select Products</h2>

          <div className="relative">
            <div className="flex items-center gap-4">
              <div className="relative flex-1">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => {
                    setSearchQuery(e.target.value);
                    setShowSearchResults(true);
                  }}
                  onFocus={() => setShowSearchResults(true)}
                  placeholder="Search Product Name"
                  className="w-full px-4 py-3 pl-12 border border-[var(--gray-3)] rounded-xl focus:ring-2 focus:ring-[var(--primary)] outline-none"
                />
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[var(--gray-4)]" />
              </div>
              <button className="px-6 py-3 bg-[var(--primary)] text-[var(--primary-foreground)] rounded-full flex items-center gap-2 hover:opacity-90 transition cursor-pointer">
                <Plus className="w-5 h-5" />
                Add Products
              </button>
            </div>

            {/* Search Results Dropdown */}
            {showSearchResults && searchQuery && (
              <div className="absolute z-10 w-full mt-2 bg-[var(--light)] border border-[var(--gray-2)] rounded-xl shadow-xl max-h-96 overflow-y-auto">
                {filteredProducts.length > 0 ? (
                  filteredProducts.map((product) => (
                    <div
                      key={product.id}
                      onClick={() => addProduct(product)}
                      className="p-4 hover:bg-[var(--muted)] cursor-pointer border-b border-[var(--gray-1)] last:border-0 transition-colors"
                    >
                      <div className="flex justify-between items-center">
                        <div>
                          <p className="font-semibold text-[var(--gray-9)]">{product.name}</p>
                          <p className="text-sm text-[var(--gray-5)]">{product.productCode}</p>
                        </div>
                        <span className="px-2 py-1 bg-[var(--muted)] text-[var(--primary)] text-xs font-medium rounded-full">
                          {product.productCategory}
                        </span>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="p-4 text-center text-[var(--gray-5)]">No products found</div>
                )}
              </div>
            )}
          </div>

          {products.length > 0 && (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 bg-[var(--gray-1)] p-4 rounded-xl">
              {products.map((product) => (
                <div
                  key={product.id}
                  className="bg-[var(--light)] border border-[var(--gray-1)] rounded-xl p-4 flex items-center justify-between shadow-sm hover:shadow-md transition group"
                >
                  <div className="flex items-center gap-6">
                    <p className="text-sm text-[var(--gray-4)] font-medium">{product.code}</p>
                    <p className="text-sm font-bold text-[var(--gray-9)]">{product.name}</p>
                  </div>
                  <button
                    onClick={() => removeProduct(product.id)}
                    className="w-8 h-8 flex items-center justify-center bg-red-50 text-[var(--destructive)] rounded-lg hover:bg-red-100 transition-colors cursor-pointer"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Assign Members */}
        <div className="space-y-6 py-8">
          {/* Section Title + Search */}
          <div>
            <h2 className="text-2xl font-bold text-[var(--gray-9)] mb-4">Assign Members</h2>
            <div className="relative max-w-md">
              <input
                type="text"
                value={memberSearchQuery}
                onChange={(e) => {
                  setMemberSearchQuery(e.target.value);
                  setShowMemberSearchResults(true);
                }}
                onFocus={() => setShowMemberSearchResults(true)}
                placeholder={
                  usersLoading
                    ? "Loading sales reps..."
                    : "Search sales representative by name or pulse code..."
                }
                className="w-full px-4 py-3 pl-12 border border-[var(--gray-3)] rounded-xl focus:ring-2 focus:ring-[var(--primary)] focus:border-[var(--primary)] outline-none text-[var(--gray-5)]"
              />
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[var(--gray-4)]" />

              {/* Member Search Results Dropdown */}
              {showMemberSearchResults && memberSearchQuery && (
                <div className="absolute z-10 w-full mt-2 bg-[var(--light)] border border-[var(--gray-2)] rounded-xl shadow-xl max-h-64 overflow-y-auto">
                  {usersLoading ? (
                    <div className="p-4 text-center text-[var(--gray-5)]">
                      Loading sales reps...
                    </div>
                  ) : filteredMembers.length > 0 ? (
                    filteredMembers.map((user) => (
                      <div
                        key={user.id}
                        onClick={() => handleSelectMember(user)}
                        className="p-4 hover:bg-[var(--muted)] cursor-pointer border-b border-[var(--gray-1)] last:border-0 transition-colors"
                      >
                        <div className="flex justify-between items-center">
                          <div>
                            <p className="font-semibold text-[var(--gray-9)]">
                              {user.firstName} {user.lastName}
                            </p>
                            <p className="text-sm text-[var(--gray-5)]">{user.pulseCode}</p>
                          </div>
                          <span className="px-2 py-1 bg-[var(--muted)] text-[var(--primary)] text-xs font-medium rounded-full">
                            {user.email}
                          </span>
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="p-4 text-center text-[var(--gray-5)]">No sales reps found</div>
                  )}
                </div>
              )}
            </div>

            {/* Selected Members Display */}
            {selectedMembers.length > 0 && (
              <div className="mt-4 flex flex-wrap gap-3">
                {selectedMembers.map((member) => (
                  <div
                    key={member.id}
                    className="p-3 bg-[var(--gray-1)] rounded-xl flex items-center gap-3"
                  >
                    <div className="w-10 h-10 rounded-full bg-[var(--gray-3)] overflow-hidden flex-shrink-0">
                      {member.profilePicture ? (
                        <Image
                          src={member.profilePicture}
                          alt={`${member.firstName} ${member.lastName}`}
                          width={40}
                          height={40}
                          className="object-cover"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-[var(--gray-5)] font-bold text-sm">
                          {member.firstName?.charAt(0)}
                          {member.lastName?.charAt(0)}
                        </div>
                      )}
                    </div>
                    <div>
                      <p className="font-semibold text-[var(--gray-9)] text-sm">
                        {member.firstName} {member.lastName}
                      </p>
                      <p className="text-xs text-[var(--gray-5)]">{member.pulseCode}</p>
                    </div>
                    <button
                      onClick={() => handleRemoveMember(member.id)}
                      className="w-7 h-7 flex items-center justify-center bg-red-50 text-[var(--destructive)] rounded-lg hover:bg-red-100 transition-colors cursor-pointer ml-2"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                ))}
              </div>
            )}
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
              <div className="text-[var(--gray-5)]">Loading hierarchy...</div>
            </div>
          )}

          {mergedHierarchy.length === 0 && !hierarchyLoading && selectedMembers.length > 0 && (
            <div className="flex items-center justify-center py-8">
              <div className="text-[var(--gray-5)]">No hierarchy data found</div>
            </div>
          )}
        </div>

        {/* Buttons */}
        <div className="flex justify-end gap-4 pt-6">
          <button className="px-6 py-3 border border-[var(--gray-3)] text-[var(--gray-6)] rounded-full hover:bg-[var(--gray-1)] transition cursor-pointer">
            Discard
          </button>
          <button
            onClick={handleSubmit}
            disabled={createTeamLoading}
            className="px-8 py-3 bg-[var(--primary)] text-[var(--primary-foreground)] rounded-full hover:opacity-90 transition flex items-center gap-2 shadow-lg cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {createTeamLoading ? (
              <>
                <svg className="animate-spin w-5 h-5" viewBox="0 0 24 24" fill="none">
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  />
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                  />
                </svg>
                Creating...
              </>
            ) : (
              <>
                <Plus className="w-5 h-5" />
                Add Team
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
