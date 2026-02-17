import { useState, useEffect, useCallback } from "react";
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
import {
  getAllTerritories,
  resetTerritoriesState,
} from "@/store/slices/territory/getAllTerritoriesSlice";
import type { TerritoryItem } from "@/store/slices/territory/types";
import { createTeam, resetCreateTeamState } from "@/store/slices/team/createTeamSlice";
import type { CreateTeamPayload } from "@/store/slices/team/createTeamSlice";
import { teamCreationSchema } from "@/validations";
import type { SelectedMember } from "@/components/form/MemberSearch";
import { mergeHierarchies } from "@/components/HierarchyNode";
import type { HierarchyNodeType } from "@/components/HierarchyNode";
import { getTeamById, resetGetTeamByIdState } from "@/store/slices/team/getTeamByIdSlice";
import { updateTeam, resetUpdateTeamState } from "@/store/slices/team/updateTeamSlice";
import type { UpdateTeamPayload } from "@/store/slices/team/updateTeamSlice";

// Product type
export interface Product {
  id: string;
  code: string;
  name: string;
  category?: string;
  skus?: string[];
}

export function useTeamForm(mode: "add" | "update" = "add", teamId?: string) {
  const dispatch = useAppDispatch();
  const router = useRouter();

  // Redux selectors
  const {
    generatedPrefix,
    loading: prefixLoading,
    error: prefixError,
  } = useAppSelector((state) => state.generatePrefix);
  const { channels, loading: channelsLoading } = useAppSelector((state) => state.allChannels);
  const { callPoints = [], loading: callPointsLoading } = useAppSelector(
    (state) => state.allCallPoints
  );
  const { products: allProducts, loading: productsLoading } = useAppSelector(
    (state) => state.allProducts
  );
  const { roles } = useAppSelector((state) => state.allRoles);
  const { users: salesRepUsers, loading: usersLoading } = useAppSelector(
    (state) => state.usersByRole
  );
  // Territories selector
  const { territories: availableTerritories, loading: territoriesLoading } = useAppSelector(
    (state) => state.allTerritories
  );

  // Create team selector
  const {
    loading: createTeamLoading,
    success: createTeamSuccess,
    error: createTeamError,
  } = useAppSelector((state) => state.createTeam);

  // Update team selector
  const {
    loading: updateTeamLoading,
    success: updateTeamSuccess,
    error: updateTeamError,
  } = useAppSelector((state) => state.updateTeam);

  // Get team by id selector
  const {
    team: teamData,
    loading: teamLoading,
    error: teamError,
  } = useAppSelector((state) => state.getTeamById);

  // Form States
  const [status, setStatus] = useState<"Active" | "Inactive">("Active");
  const [teamName, setTeamName] = useState("");
  const [pulseCode, setPulseCode] = useState(""); // Add local state for pulseCode to support update mode
  const [legacyCode, setLegacyCode] = useState("");
  const [selectedChannelId, setSelectedChannelId] = useState("");
  const [selectedCallPoints, setSelectedCallPoints] = useState<string[]>([]);
  const [products, setProducts] = useState<Product[]>([]);

  // Member search states
  const [selectedMembers, setSelectedMembers] = useState<SelectedMember[]>([]);
  const [memberHierarchies, setMemberHierarchies] = useState<Map<string, HierarchyNodeType>>(
    new Map()
  );
  const [mergedHierarchy, setMergedHierarchy] = useState<HierarchyNodeType[]>([]);
  const [hierarchyLoading, setHierarchyLoading] = useState(false);

  // Territory assignment states (single territory per user)
  const [assignedTerritories, setAssignedTerritories] = useState<Map<string, TerritoryItem>>(
    new Map()
  );
  const [territorySearchQuery, setTerritorySearchQuery] = useState("");
  const [activeTerritorySearchUserId, setActiveTerritorySearchUserId] = useState<string | null>(
    null
  );

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

    // Fetch all territories for assignment
    dispatch(getAllTerritories({ notassigned: true }));

    return () => {
      dispatch(resetGeneratePrefixState());
      dispatch(resetUsersByRoleState());
      dispatch(resetUserHierarchyState());
      dispatch(resetCreateTeamState());
      dispatch(resetTerritoriesState());
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

  // Handle update team success/error
  useEffect(() => {
    if (updateTeamSuccess) {
      dispatch(resetUpdateTeamState());
      dispatch(resetGetTeamByIdState());
      router.push("/en/dashboard/campaign-Management");
    }
    if (updateTeamError) {
      // dispatch(resetUpdateTeamState()); // Keep error visible or handle it
    }
  }, [updateTeamSuccess, updateTeamError, dispatch, router]);

  // Fetch team data if in update mode
  useEffect(() => {
    if (mode === "update" && teamId) {
      dispatch(getTeamById(teamId));
    }
    return () => {
      dispatch(resetGetTeamByIdState());
      dispatch(resetUpdateTeamState());
    };
  }, [mode, teamId, dispatch]);

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

  // Populate form with fetched team data
  useEffect(() => {
    if (mode === "update" && teamData?.result) {
      const { result, teamProducts, teamUsers } = teamData;

      setTeamName(result.name);
      setStatus(result.isActive ? "Active" : "Inactive");
      setPulseCode(result.pulseCode);
      setLegacyCode(result.legacyCode || "");
      setSelectedChannelId(result.channelId);

      // Handle call point pre-selection - map objects/IDs to string array
      const teamResult = result as any;
      if (teamResult.callPointId && typeof teamResult.callPointId === "string") {
        setSelectedCallPoints([teamResult.callPointId]);
      } else if (teamResult.callPointIds && Array.isArray(teamResult.callPointIds)) {
        // Map objects or strings to IDs
        setSelectedCallPoints(
          teamResult.callPointIds.map((cp: any) => (typeof cp === "string" ? cp : cp.id))
        );
      } else if (teamResult.callPoints && Array.isArray(teamResult.callPoints)) {
        // Handle array of objects or strings (as renamed back by user)
        setSelectedCallPoints(
          teamResult.callPoints.map((cp: any) => (typeof cp === "string" ? cp : cp.id))
        );
      }

      // Populate products
      if (teamProducts && teamProducts.length > 0) {
        // Flatten nested structure: teamProducts -> product array -> products
        // Assuming the response structure aligns with Product interface
        const loadedProducts: Product[] = [];
        teamProducts.forEach((tp) => {
          if (tp.product) {
            tp.product.forEach((p) => {
              loadedProducts.push({
                id: p.id,
                name: p.name,
                code: "", // API doesn't seem to return code in getById, handling gracefully
                skus: p.productsku?.map((s) => s.name) || [], // Map sku names
              });
            });
          }
        });
        setProducts(loadedProducts);
      }

      // Populate members
      if (teamUsers && teamUsers.length > 0) {
        const loadedMembers: SelectedMember[] = [];
        const loadedTerritories = new Map<string, TerritoryItem>();

        teamUsers.forEach((teamUser) => {
          const user = teamUser.user;
          if (user && user.id) {
            // Split name into first and last name
            const nameParts = (user.name || "").split(" ");
            const firstName = nameParts[0] || "";
            const lastName = nameParts.slice(1).join(" ") || "";

            loadedMembers.push({
              id: user.id,
              firstName,
              lastName,
              email: "", // Not available in this specific part of response
              pulseCode: "",
              profilePicture: "",
              // roleId not in SelectedMember interface
            });

            // Map territory (single territory, take first one if exists)
            if (teamUser.territory && teamUser.territory.id) {
              loadedTerritories.set(user.id, {
                id: teamUser.territory.id,
                name: teamUser.territory.name,
                pulseCode: teamUser.territory.pulseCode || "",
                description: teamUser.territory.description || "",
              });
            }
          }
        });

        setSelectedMembers(loadedMembers);
        setAssignedTerritories(loadedTerritories);

        // Fetch hierarchy for existing members
        loadedMembers.forEach((m) => {
          if (m.id) handleAddMemberHierarchy(m.id);
        });
      }
    }
  }, [teamData, mode, handleAddMemberHierarchy]);

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

  // Handle assigning a territory to a user (single territory)
  const handleAssignTerritory = (userId: string, territory: TerritoryItem) => {
    setAssignedTerritories((prev) => {
      const newMap = new Map(prev);
      newMap.set(userId, territory); // Replace existing territory
      return newMap;
    });
  };

  // Handle removing a territory from a user
  const handleRemoveTerritory = (userId: string) => {
    setAssignedTerritories((prev) => {
      const newMap = new Map(prev);
      newMap.delete(userId);
      return newMap;
    });
  };

  // Handle territory search query change
  const handleTerritorySearchChange = (query: string) => {
    setTerritorySearchQuery(query);
  };

  // Handle toggling territory search for a user
  const handleToggleTerritorySearch = (userId: string | null) => {
    setActiveTerritorySearchUserId(userId);
    if (userId === null) {
      setTerritorySearchQuery("");
    }
  };

  const handleMembersChange = (members: SelectedMember[]) => {
    // Find newly added members and fetch their hierarchies
    const newMembers = members.filter((m) => !selectedMembers.find((sm) => sm.id === m.id));
    newMembers.forEach((member) => handleAddMemberHierarchy(member.id));

    // Find removed members and clean up their hierarchies
    const removedMembers = selectedMembers.filter((sm) => !members.find((m) => m.id === sm.id));
    removedMembers.forEach((member) => {
      setMemberHierarchies((prev) => {
        const newMap = new Map(prev);
        newMap.delete(member.id);
        return newMap;
      });
      setAssignedTerritories((prev) => {
        const newMap = new Map(prev);
        newMap.delete(member.id);
        return newMap;
      });
    });

    setSelectedMembers(members);
    clearFieldError("saleRepIds");
  };

  // Handle form submission (with Zod validation)
  const handleSubmit = async () => {
    if (mode === "add") {
      await handleCreateSubmit();
    } else {
      await handleUpdateSubmit();
    }
  };

  const handleCreateSubmit = async () => {
    // Build saleRepIds with their assigned territory
    const saleRepIds = selectedMembers.map((member) => ({
      id: member.id,
      territoryId: assignedTerritories.get(member.id)?.id || null,
    }));

    // Prepare form data for validation
    const formData = {
      pulseCode: generatedPrefix || "",
      legacyCode: generatedPrefix || "",
      name: teamName.trim(),
      status: status.toLowerCase() as "active" | "inactive",
      callPointIds: selectedCallPoints, // Send as array of IDs
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

  const handleUpdateSubmit = async () => {
    if (!teamId) return;

    // Use similar validation logic (reuse or create separate schema if needed)
    // For now assuming same requirements for update

    const saleRepIds = selectedMembers.map((member) => ({
      id: member.id,
      territoryId: assignedTerritories.get(member.id)?.id || null,
    }));

    const formData = {
      pulseCode: pulseCode || generatedPrefix || "", // Use existing for update
      name: teamName.trim(),
      status: status.toLowerCase() as "active" | "inactive",
      callPointIds: selectedCallPoints, // Send as array of IDs
      channelId: selectedChannelId,
      productIds: products.map((p) => p.id),
      saleRepIds,
    };

    // Validate
    const validation = teamCreationSchema.safeParse(formData);

    if (!validation.success) {
      const errors: Record<string, string> = {};
      validation.error.errors.forEach((err: any) => {
        const fieldName = err.path[0] as string;
        if (!errors[fieldName]) {
          errors[fieldName] = err.message;
        }
      });
      setValidationErrors(errors);
      return;
    }

    setValidationErrors({});
    const validatedData = validation.data;

    // Build payload for update
    const payload: UpdateTeamPayload = {
      id: teamId,
      ...validatedData,
      isActive: validatedData.status === "active",
      // Map other fields as required by the update API
      productIds: products.map((p) => p.id), // Ensure productIds is sent
      // userIds: selectedMembers.map(m => m.id), // Removing simple userIds in favor of full structure
      saleRepIds, // Send the full structure with territories
      callPointIds: selectedCallPoints, // Send as array of IDs
    };

    dispatch(updateTeam(payload));
  };

  return {
    state: {
      generatedPrefix,
      prefixLoading,
      channels,
      channelsLoading,
      callPoints,
      callPointsLoading,
      allProducts,
      productsLoading,
      salesRepUsers,
      usersLoading,
      availableTerritories,
      territoriesLoading,
      status,
      teamName,
      pulseCode,
      legacyCode,
      selectedChannelId,
      selectedCallPoints,
      products,
      selectedMembers,
      mergedHierarchy,
      hierarchyLoading,
      assignedTerritories,
      territorySearchQuery,
      activeTerritorySearchUserId,
      createTeamLoading,
      updateTeamLoading,
      teamLoading,
    },
    actions: {
      setStatus,
      setTeamName,
      setSelectedChannelId,
      setSelectedCallPoints,
      setProducts,
      handleMembersChange,
      handleAssignTerritory,
      handleRemoveTerritory,
      handleTerritorySearchChange,
      handleToggleTerritorySearch,
      handleSubmit,
      clearFieldError,
      getErrorMessage,
    },
  };
}
