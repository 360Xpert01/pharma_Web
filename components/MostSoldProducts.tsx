import { mostSold } from "../data/mockData";

interface MostSoldProductsProps {
  weight?: string | number;
}

export default function MostSoldProducts({ weight }: MostSoldProductsProps) {
  const maxValue = Math.max(...mostSold.map((i) => i.value));

  return (
    <div className={`bg-(--background) ${weight || "w-[33%]"}   rounded-8 shadow-soft p-3`}>
      <h2 className="text-lg font-semibold mb-4">Most Sold Products</h2>
      <div className="space-y-5">
        {mostSold.map((p) => {
          const percentage = (p.value / maxValue) * 100;
          const capped = Math.min(percentage, 90);

          return (
            <div key={p.name} className="flex flex-col gap-1">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-(--primary)">{p.name}</span>
                <span className="font-medium text-sm text-(--gray-9)">{p.value.toFixed(1)}K</span>
              </div>
              <div className="w-full bg-(--gray-2) rounded-8 h-2 overflow-hidden">
                <div
                  className="h-full transition-all duration-500"
                  style={{ width: `${capped}%`, backgroundColor: p.color }}
                />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
