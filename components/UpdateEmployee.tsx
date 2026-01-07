import EmployeeForm from "./EmployeeForm";

interface UpdateEmployeeFormProps {
  employeeId?: string | null;
}

export default function UpdateEmployeeForm({ employeeId }: UpdateEmployeeFormProps) {
  return <EmployeeForm mode="update" userId={employeeId || undefined} />;
}
