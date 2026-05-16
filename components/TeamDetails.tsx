"use client";

import { useSearchParams } from "next/navigation";
import { useAppSelector } from "@/store";
import {
  FormInput,
  FormSelect,
  FormMultiSelect,
  StatusToggle,
  ProductSearch,
  MemberSearch,
} from "@/components/form";
import { HierarchyNode } from "@/components/HierarchyNode";
import { useTeamForm } from "@/hooks/user-team-form";

/**
 * TeamDetails renders a read-only replica of the team update form.
 * It reuses the same form state/layout as TeamForm but disables every
 * input. Editing happens via the "Edit Team" button in the page header,
 * which navigates to the Update Team form.
 */
export default function TeamDetails() {
  const searchParams = useSearchParams();
  const teamId = searchParams.get("id");

  // Use "update" mode so the hook loads the existing team data.
  const { state } = useTeamForm("update", teamId || undefined);

  // Loading / error / empty gating comes straight from the fetch slice.
  const { team, loading: teamLoading, error: teamError } = useAppSelector((s) => s.getTeamById);

  const {
    channels,
    channelsLoading,
    callPoints,
    callPointsLoading,
    allProducts,
    productsLoading,
    salesRepUsers,
    usersLoading,
    availableTerritories,
    status,
    teamName,
    pulseCode,
    selectedChannelId,
    selectedCallPoints,
    products,
    selectedMembers,
    mergedHierarchy,
    hierarchyLoading,
    assignedTerritories,
    territorySearchQuery,
    activeTerritorySearchUserId,
  } = state;

  if (teamLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-(--primary)"></div>
      </div>
    );
  }

  if (teamError) {
    return (
      <div className="flex items-center justify-center min-h-[400px] text-(--destructive)">
        Error: {teamError}
      </div>
    );
  }

  if (!team || !team.result) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">No team details found.</div>
    );
  }

  // No-op: every control below is read-only, handlers are never invoked.
  const noop = () => {};

  return (
    <div>
      <div className="bg-[var(--light)] rounded-8 shadow-soft p-8 space-y-10">
        {/* Team Name Section */}
        <div className="space-y-6">
          <h2 className="t-h2">Team Name</h2>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <FormInput
              label="Pulse Code"
              name="pulseCode"
              value={pulseCode || "N/A"}
              onChange={noop}
              placeholder="N/A"
              required
              readOnly
              className="cursor-not-allowed"
            />

            <FormInput
              label="Team Name"
              name="teamName"
              type="text"
              value={teamName}
              onChange={noop}
              placeholder="N/A"
              required
              readOnly
              className="cursor-not-allowed"
            />

            <FormSelect
              label="Channel Name"
              name="channelId"
              value={selectedChannelId}
              onChange={noop}
              options={(Array.isArray(channels) ? channels : []).map((channel) => ({
                value: channel.id,
                label: channel.name,
              }))}
              placeholder="N/A"
              required
              loading={channelsLoading}
              disabled
            />

            <div className="flex justify-center items-center">
              <StatusToggle status={status} onChange={noop} readOnly />
            </div>
          </div>

          <div className="max-w-md">
            <FormMultiSelect
              label="Call Points"
              name="callPoints"
              value={selectedCallPoints}
              onChange={noop}
              options={(Array.isArray(callPoints) ? callPoints : []).map((callPoint) => ({
                value: callPoint.id,
                label: callPoint.name,
              }))}
              placeholder="N/A"
              required
              loading={callPointsLoading}
              disabled
            />
          </div>
        </div>

        {/* Selected Products */}
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
            onProductsChange={noop}
            loading={productsLoading}
            required
            readOnly
          />
        </div>

        {/* Assigned Members */}
        <div className="space-y-6 py-8">
          <div>
            <h2 className="t-h2 mb-4">Assigned Members</h2>

            <MemberSearch
              allMembers={
                salesRepUsers?.map((user) => ({
                  id: user.id || "",
                  firstName: user.firstName || "",
                  lastName: user.lastName || "",
                  pulseCode: user.pulseCode || "",
                  email: user.email || "",
                  roleName: user.roleName || "",
                  profilePicture: user.profilePicture || "",
                })) || []
              }
              selectedMembers={selectedMembers}
              onMembersChange={noop}
              loading={usersLoading}
              label=""
              readOnly
            />
          </div>

          {/* Hierarchy Tree (read-only) */}
          {Array.isArray(mergedHierarchy) && mergedHierarchy.length > 0 && (
            <div className="relative mt-6 space-y-4">
              {mergedHierarchy.map((hierarchyRoot) => (
                <HierarchyNode
                  key={hierarchyRoot.userId}
                  node={hierarchyRoot}
                  level={0}
                  availableTerritories={availableTerritories}
                  assignedTerritories={assignedTerritories}
                  onAssignTerritory={noop}
                  onRemoveTerritory={noop}
                  territorySearchQuery={territorySearchQuery}
                  activeTerritorySearchUserId={activeTerritorySearchUserId}
                  onTerritorySearchChange={noop}
                  onToggleTerritorySearch={noop}
                  readOnly
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
      </div>
    </div>
  );
}
