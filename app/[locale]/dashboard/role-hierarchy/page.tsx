"use client";

import { DashboardContent } from "@/app/[locale]/dashboard/components/dashboard-content";

export default function RoleHierarchyPage() {
  return (
    <DashboardContent
      sample="Role Hierarchy"
      descrip="Unlock the potential of your candidates"
      btnAdd="Add New Role"
      hideHeader={false}
      hideMetrics={true}
      roleHierarchy={true}
      settingsRoute="role-hierarchy/settings"
      pulseAddBtn={true}
      onAddClick={() => {
        window.dispatchEvent(new CustomEvent("roles:add-root"));
      }}
    />
  );
}
