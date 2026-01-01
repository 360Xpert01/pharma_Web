import { ChevronRight } from "lucide-react";

export default function Header() {
  return (
    <div className="bg-(--background) w-full rounded-xl shadow-soft p-4 mb-4 flex flex-wrap items-center justify-between gap-4">
      <div className="flex gap-3 items-center">
        <div className="w-16 h-16 rounded-full bg-(--gray-2) border-2 border-dashed" />
        <div>
          <h1 className="text-xl font-semibold">Mohammad Amir</h1>
          <p className="text-sm text-(--gray-6)">Sales Representative</p>
        </div>
      </div>

      <p className="text-(--gray-5)">m.amir2002@gmail.com</p>
      <p className="text-xl font-bold">
        358 <span className="text-(--gray-4) text-sm">Calls/Month</span>
      </p>
      <p className="text-xl font-bold">Diabatics</p>
      <p className="text-xl font-bold">Doctor</p>
      <p className="text-xl font-bold text-(--success)">75.08k</p>
      <p className="text-xl font-bold text-(--destructive)">445.k</p>

      <button className="flex items-center gap-1 text-(--primary) font-medium">
        View Details <ChevronRight className="w-4 h-4" />
      </button>
    </div>
  );
}
