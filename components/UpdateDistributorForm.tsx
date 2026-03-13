import DistributorForm from "./DistributorForm";

interface UpdateDistributorFormProps {
  distributorId?: string | null;
}

export default function UpdateDistributorForm({ distributorId }: UpdateDistributorFormProps) {
  return <DistributorForm mode="update" distributorId={distributorId || undefined} />;
}
