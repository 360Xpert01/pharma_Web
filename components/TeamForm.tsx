"use client";

import React from "react";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button/button";
import {
  FormInput,
  FormSelect,
  StatusToggle,
  ProductSearch,
  MemberSearch,
} from "@/components/form";
import { HierarchyNode } from "@/components/HierarchyNode";
import { useTeamForm } from "@/hooks/user-team-form";

import { useSearchParams } from "next/navigation";

export default function TeamForm() {
  const searchParams = useSearchParams();
  const teamId = searchParams.get("id");
  const mode = searchParams.get("mode") === "update" ? "update" : "add";

  const { state, actions } = useTeamForm(mode, teamId || undefined);

  const {
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
    availableBricks,
    status,
    teamName,
    pulseCode, // From hook state
    selectedChannelId,
    selectedCallPointId,
    products,
    selectedMembers,
    mergedHierarchy,
    hierarchyLoading,
    assignedBricks,
    brickSearchQuery,
    activeBrickSearchUserId,
    createTeamLoading,
    updateTeamLoading,
    teamLoading,
  } = state;

  const {
    setStatus,
    setTeamName,
    setSelectedChannelId,
    setSelectedCallPointId,
    setProducts,
    handleMembersChange,
    handleAssignBrick,
    handleRemoveBrick,
    handleBrickSearchChange,
    handleToggleBrickSearch,
    handleSubmit,
    clearFieldError,
    getErrorMessage,
  } = actions;

  const isUpdateMode = mode === "update";
  const loading = isUpdateMode ? updateTeamLoading : createTeamLoading;

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
              value={isUpdateMode ? pulseCode : generatedPrefix || ""}
              onChange={() => {}}
              placeholder={
                isUpdateMode ? pulseCode || "N/A" : prefixLoading ? "Generating..." : "TEM_xxxxxx"
              }
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
              onMembersChange={handleMembersChange}
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
                  availableBrickItems={availableBricks}
                  assignedBrickItems={assignedBricks}
                  onAssignBrickItem={handleAssignBrick}
                  onRemoveBrickItem={handleRemoveBrick}
                  brickSearchQuery={brickSearchQuery}
                  activeBrickItemSearchUserId={activeBrickSearchUserId}
                  onBrickItemSearchChange={handleBrickSearchChange}
                  onToggleBrickItemSearch={handleToggleBrickSearch}
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
            disabled={loading}
            loading={loading}
            variant="primary"
            size="lg"
            icon={Plus}
            rounded="default"
            className="shadow-soft"
          >
            {loading
              ? isUpdateMode
                ? "Updating..."
                : "Creating..."
              : isUpdateMode
                ? "Update Team"
                : "Add Team"}
          </Button>
        </div>
      </div>
    </div>
  );
}
