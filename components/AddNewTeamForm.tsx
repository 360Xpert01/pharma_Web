"use client";

import React, { useState, useEffect } from "react";
import { Plus, Trash2, Search, ChevronDown, ChevronRight } from "lucide-react";
import Image from "next/image";
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

interface Product {
  id: string;
  code: string;
  name: string;
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

// Recursive Hierarchy Node Component
function HierarchyNode({ node, level }: { node: HierarchyNodeType; level: number }) {
  const [isOpen, setIsOpen] = useState(true);
  const hasChildren = node.children && node.children.length > 0;

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
          <button className="px-6 py-3 bg-[var(--primary)] text-[var(--primary-foreground)] rounded-full flex items-center gap-2 hover:opacity-90 shadow-sm cursor-pointer">
            <Plus className="w-5 h-5" />
            Assign Bricks
          </button>
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
              <HierarchyNode key={child.userId} node={child} level={level + 1} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default function CreateCampaignForm() {
  const dispatch = useAppDispatch();

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
  const { hierarchy, loading: hierarchyLoading } = useAppSelector((state) => state.userHierarchy);

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
  const [selectedMember, setSelectedMember] = useState<any>(null);

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

    return () => {
      dispatch(resetGeneratePrefixState());
      dispatch(resetUsersByRoleState());
      dispatch(resetUserHierarchyState());
    };
  }, [dispatch]);

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

  // Fetch hierarchy when member is selected
  useEffect(() => {
    if (selectedMember?.id) {
      dispatch(getUserHierarchy(selectedMember.id));
    }
  }, [dispatch, selectedMember]);

  // Filter sales rep users by search query
  const filteredMembers = salesRepUsers.filter(
    (user) =>
      `${user.firstName} ${user.lastName}`
        .toLowerCase()
        .includes(memberSearchQuery.toLowerCase()) ||
      user.pulseCode.toLowerCase().includes(memberSearchQuery.toLowerCase()) ||
      user.email.toLowerCase().includes(memberSearchQuery.toLowerCase())
  );

  // Handle member selection
  const handleSelectMember = (user: any) => {
    setSelectedMember(user);
    setMemberSearchQuery("");
    setShowMemberSearchResults(false);
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
            <div className="flex justify-end">
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

            {/* Selected Member Info */}
            {selectedMember && (
              <div className="mt-4 p-4 bg-[var(--gray-1)] rounded-xl flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-[var(--gray-3)] overflow-hidden flex-shrink-0">
                    {selectedMember.profilePicture ? (
                      <Image
                        src={selectedMember.profilePicture}
                        alt={`${selectedMember.firstName} ${selectedMember.lastName}`}
                        width={48}
                        height={48}
                        className="object-cover"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-[var(--gray-5)] font-bold">
                        {selectedMember.firstName?.charAt(0)}
                        {selectedMember.lastName?.charAt(0)}
                      </div>
                    )}
                  </div>
                  <div>
                    <p className="font-semibold text-[var(--gray-9)]">
                      {selectedMember.firstName} {selectedMember.lastName}
                    </p>
                    <p className="text-sm text-[var(--gray-5)]">{selectedMember.pulseCode}</p>
                  </div>
                </div>
                <button
                  onClick={() => setSelectedMember(null)}
                  className="w-8 h-8 flex items-center justify-center bg-red-50 text-[var(--destructive)] rounded-lg hover:bg-red-100 transition-colors cursor-pointer"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            )}
          </div>

          {/* Hierarchy Tree - Dynamic from API */}
          {hierarchy && (
            <div className="relative mt-6">
              <HierarchyNode node={hierarchy} level={0} />
            </div>
          )}

          {hierarchyLoading && (
            <div className="flex items-center justify-center py-8">
              <div className="text-[var(--gray-5)]">Loading hierarchy...</div>
            </div>
          )}

          {!hierarchy && !hierarchyLoading && selectedMember && (
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
          <button className="px-8 py-3 bg-[var(--primary)] text-[var(--primary-foreground)] rounded-full hover:opacity-90 transition flex items-center gap-2 shadow-lg cursor-pointer">
            <Plus className="w-5 h-5" />
            Add Campaign
          </button>
        </div>
      </div>
    </div>
  );
}
