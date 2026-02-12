import { useState } from "react";
import { useAppDispatch } from "@/store";
import { getBrickList } from "@/store/slices/brick/getBrickListSlice";
import { createBrick, resetCreateBrickState } from "@/store/slices/brick/createBrickSlice";
import { toast } from "react-hot-toast";

const HIERARCHY_PAYLOAD = {
  zones: [
    {
      name: "Punjab",
      regions: [
        {
          name: "Lahore Region",
          bricks: [
            { name: "Gulberg", brickCode: "B1" },
            { name: "Model Town", brickCode: "B2" },
            { name: "DHA Phase 5", brickCode: "B3" },
            { name: "Raiwind City", brickCode: "B4" },
          ],
        },
        {
          name: "Rawalpindi Region",
          bricks: [
            { name: "Saddar", brickCode: "B5" },
            { name: "Bahria Town", brickCode: "B6" },
            { name: "Mall Road", brickCode: "B7" },
          ],
        },
      ],
    },
    {
      name: "Sindh",
      regions: [
        {
          name: "Karachi Region",
          bricks: [
            { name: "Clifton", brickCode: "B8" },
            { name: "Defence Phase 6", brickCode: "B9" },
            { name: "Gulshan-e-Iqbal", brickCode: "B10" },
            { name: "PECHS", brickCode: "B11" },
          ],
        },
        {
          name: "Hyderabad Region",
          bricks: [
            { name: "Latifabad", brickCode: "B12" },
            { name: "Qasimabad", brickCode: "B13" },
          ],
        },
      ],
    },
    {
      name: "Khyber Pakhtunkhwa",
      regions: [
        {
          name: "Peshawar Region",
          bricks: [
            { name: "University Town", brickCode: "B14" },
            { name: "Hayatabad", brickCode: "B15" },
          ],
        },
        {
          name: "Mardan Region",
          bricks: [{ name: "Bagh Iram", brickCode: "B16" }],
        },
      ],
    },
  ],
};

export const useBricksImport = () => {
  const dispatch = useAppDispatch();
  const [isImporting, setIsImporting] = useState(false);

  const handleImport = async () => {
    if (isImporting) {
      console.log("Import already in progress...");
      return;
    }
    setIsImporting(true);
    // @ts-ignore
    window._lastBricksImport = new Date().toISOString();
    console.log("Starting hierarchy import with payload:", HIERARCHY_PAYLOAD);
    toast.loading("Starting import...", { id: "import-hierarchy" });

    try {
      for (const zone of HIERARCHY_PAYLOAD.zones) {
        console.log(`Creating Zone: ${zone.name}`);
        toast.loading(`Creating Zone: ${zone.name}...`, { id: "import-hierarchy" });

        const zoneRes = await dispatch(createBrick({ name: zone.name, type: "zone" })).unwrap();
        const createdZone = zoneRes.data;
        console.log(`Zone created with ID: ${createdZone.id}`);

        if (zone.regions) {
          for (const region of zone.regions) {
            console.log(`Creating Region: ${region.name} in Zone: ${zone.name}`);
            toast.loading(`Creating Region: ${region.name}...`, { id: "import-hierarchy" });

            const regionRes = await dispatch(
              createBrick({
                name: region.name,
                type: "region",
                parentId: createdZone.id,
              })
            ).unwrap();
            const createdRegion = regionRes.data;
            console.log(`Region created with ID: ${createdRegion.id}`);

            if (region.bricks) {
              for (const brick of region.bricks) {
                console.log(`Creating Brick: ${brick.name} in Region: ${region.name}`);
                toast.loading(`Creating Brick: ${brick.name}...`, { id: "import-hierarchy" });

                await dispatch(
                  createBrick({
                    name: brick.name,
                    type: "brick",
                    parentId: createdRegion.id,
                    brickCode: brick.brickCode,
                  })
                ).unwrap();
              }
            }
          }
        }
      }
      toast.success("Hierarchy imported successfully!", { id: "import-hierarchy" });
      console.log("Hierarchy import completed successfully.");
      dispatch(getBrickList()); // Refresh list
    } catch (err: any) {
      console.error("Hierarchy import failed:", err);
      const errorMessage = typeof err === "string" ? err : err.message || JSON.stringify(err);
      toast.error(`Import failed: ${errorMessage}`, { id: "import-hierarchy" });
    } finally {
      setIsImporting(false);
      dispatch(resetCreateBrickState());
    }
  };

  return { handleImport, isImporting };
};
