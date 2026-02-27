"use client";

import React, { useState, useEffect } from "react";
import { Plus, X, Loader2 } from "lucide-react";
import { useAppDispatch, useAppSelector } from "@/store";
import { getAllUsers } from "@/store/slices/employee/getAllUsersSlice";
import { getAllGiveaways } from "@/store/slices/giveaway/getAllGiveawaysSlice";
import { getAllProductSkus } from "@/store/slices/product/getAllProductSkusSlice";
import { allocateUser, resetAllocateUserState } from "@/store/slices/allocation/allocateUserSlice";
import toast from "react-hot-toast";
import { FormSelect } from "@/components/form";
import { Button } from "@/components/ui/button/button";

interface SelectedItem {
  id: string;
  name: string;
  quantity: number;
}

export default function AllocateUserForm() {
  const dispatch = useAppDispatch();

  // Redux state
  const { users, loading: usersLoading } = useAppSelector((state) => state.allUsers);
  const { giveaways, loading: giveawaysLoading } = useAppSelector((state) => state.allGiveaways);
  const { productSkus, loading: skusLoading } = useAppSelector((state) => state.allProductSkus);
  const {
    loading: allocateLoading,
    success: allocateSuccess,
    error: allocateError,
  } = useAppSelector((state) => state.allocateUser);

  // Form state
  const [selectedUserId, setSelectedUserId] = useState("");
  const [selectedGiveaways, setSelectedGiveaways] = useState<SelectedItem[]>([]);
  const [selectedSamples, setSelectedSamples] = useState<SelectedItem[]>([]);
  const [giveawaySearch, setGiveawaySearch] = useState("");
  const [sampleSearch, setSampleSearch] = useState("");

  // Fetch data on mount
  useEffect(() => {
    dispatch(getAllUsers({ page: 1, limit: 1000 }));
    dispatch(getAllGiveaways({ page: 1, limit: 1000 }));
    dispatch(getAllProductSkus());

    return () => {
      dispatch(resetAllocateUserState());
    };
  }, [dispatch]);

  // Handle success
  useEffect(() => {
    if (allocateSuccess) {
      toast.success("Items allocated successfully!");
      // Reset form
      setSelectedUserId("");
      setSelectedGiveaways([]);
      setSelectedSamples([]);
      dispatch(resetAllocateUserState());
    }
  }, [allocateSuccess, dispatch]);

  // Handle error
  useEffect(() => {
    if (allocateError) {
      toast.error(allocateError);
    }
  }, [allocateError]);

  // Add giveaway to selection
  const addGiveaway = (id: string, name: string) => {
    if (!selectedGiveaways.find((g) => g.id === id)) {
      setSelectedGiveaways([...selectedGiveaways, { id, name, quantity: 1 }]);
      setGiveawaySearch("");
    }
  };

  // Add sample to selection
  const addSample = (id: string, name: string) => {
    if (!selectedSamples.find((s) => s.id === id)) {
      setSelectedSamples([...selectedSamples, { id, name, quantity: 1 }]);
      setSampleSearch("");
    }
  };

  // Update quantity
  const updateGiveawayQuantity = (id: string, quantity: number) => {
    setSelectedGiveaways(
      selectedGiveaways.map((g) => (g.id === id ? { ...g, quantity: Math.max(1, quantity) } : g))
    );
  };

  const updateSampleQuantity = (id: string, quantity: number) => {
    setSelectedSamples(
      selectedSamples.map((s) => (s.id === id ? { ...s, quantity: Math.max(1, quantity) } : s))
    );
  };

  // Remove items
  const removeGiveaway = (id: string) => {
    setSelectedGiveaways(selectedGiveaways.filter((g) => g.id !== id));
  };

  const removeSample = (id: string) => {
    setSelectedSamples(selectedSamples.filter((s) => s.id !== id));
  };

  // Handle form submission
  const handleSubmit = () => {
    if (!selectedUserId) {
      toast.error("Please select a user");
      return;
    }

    if (selectedGiveaways.length === 0 && selectedSamples.length === 0) {
      toast.error("Please select at least one giveaway or sample");
      return;
    }

    const payload = {
      userId: selectedUserId,
      giveaway: selectedGiveaways.map((g) => ({ id: g.id, quantity: g.quantity })),
      sample: selectedSamples.map((s) => ({ id: s.id, quantity: s.quantity })),
    };

    dispatch(allocateUser(payload));
  };

  // Filter giveaways and samples based on search
  const filteredGiveaways = giveaways.filter(
    (g) =>
      g.name.toLowerCase().includes(giveawaySearch.toLowerCase()) &&
      !selectedGiveaways.find((sg) => sg.id === g.id)
  );

  const filteredSamples = productSkus.filter(
    (sku) =>
      (sku.productName.toLowerCase().includes(sampleSearch.toLowerCase()) ||
        sku.sku.toLowerCase().includes(sampleSearch.toLowerCase())) &&
      !selectedSamples.find((ss) => ss.id === sku.id)
  );

  return (
    <div className="p-10 space-y-8">
      <div className="space-y-6">
        {/* User Selection */}
        <FormSelect
          label="Select User"
          name="userId"
          value={selectedUserId}
          onChange={setSelectedUserId}
          options={users.map((user) => ({
            value: user.id,
            label: `${user.firstName} ${user.lastName} (${user.email})`,
          }))}
          placeholder="Select user"
          required
          loading={usersLoading}
        />

        {/* Giveaways Section */}
        <div className="space-y-4">
          <label className="block t-label">
            Giveaways <span className="text-(--gray-6)">(Optional)</span>
          </label>

          {/* Giveaway Search/Dropdown */}
          <div className="relative">
            <input
              type="text"
              value={giveawaySearch}
              onChange={(e) => setGiveawaySearch(e.target.value)}
              placeholder="Search giveaways..."
              className="w-full px-3 py-3 border border-(--gray-3) rounded-8 focus:ring-2 focus:ring-(--primary) outline-none text-sm"
            />
            {giveawaySearch && filteredGiveaways.length > 0 && (
              <div className="absolute z-10 w-full mt-1 bg-white border border-(--gray-3) rounded-8 shadow-lg max-h-60 overflow-y-auto">
                {giveawaysLoading ? (
                  <div className="p-4 text-center">
                    <Loader2 className="w-5 h-5 animate-spin mx-auto" />
                  </div>
                ) : (
                  filteredGiveaways.map((giveaway) => (
                    <div
                      key={giveaway.id}
                      onClick={() => addGiveaway(giveaway.id, giveaway.name)}
                      className="px-4 py-3 hover:bg-(--gray-2) cursor-pointer transition"
                    >
                      <p className="font-medium">{giveaway.name}</p>
                      <p className="text-sm text-(--gray-6)">{giveaway.description}</p>
                    </div>
                  ))
                )}
              </div>
            )}
          </div>

          {/* Selected Giveaways */}
          {selectedGiveaways.length > 0 && (
            <div className="space-y-2">
              {selectedGiveaways.map((giveaway) => (
                <div
                  key={giveaway.id}
                  className="flex items-center gap-3 p-3 bg-(--gray-1) border border-(--gray-3) rounded-8"
                >
                  <span className="flex-1 font-medium">{giveaway.name}</span>
                  <input
                    type="number"
                    min="1"
                    value={giveaway.quantity}
                    onChange={(e) =>
                      updateGiveawayQuantity(giveaway.id, parseInt(e.target.value) || 1)
                    }
                    className="w-20 px-2 py-1 border border-(--gray-3) rounded text-center"
                  />
                  <button
                    onClick={() => removeGiveaway(giveaway.id)}
                    className="p-1 hover:bg-(--destructive)/10 rounded transition"
                  >
                    <X className="w-4 h-4 text-(--destructive)" />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Samples Section */}
        <div className="space-y-4">
          <label className="block t-label">
            Samples (Product SKUs) <span className="text-(--gray-6)">(Optional)</span>
          </label>

          {/* Sample Search/Dropdown */}
          <div className="relative">
            <input
              type="text"
              value={sampleSearch}
              onChange={(e) => setSampleSearch(e.target.value)}
              placeholder="Search samples..."
              className="w-full px-3 py-3 border border-(--gray-3) rounded-8 focus:ring-2 focus:ring-(--primary) outline-none text-sm"
            />
            {sampleSearch && filteredSamples.length > 0 && (
              <div className="absolute z-10 w-full mt-1 bg-white border border-(--gray-3) rounded-8 shadow-lg max-h-60 overflow-y-auto">
                {skusLoading ? (
                  <div className="p-4 text-center">
                    <Loader2 className="w-5 h-5 animate-spin mx-auto" />
                  </div>
                ) : (
                  filteredSamples.map((sku) => (
                    <div
                      key={sku.id}
                      onClick={() => addSample(sku.id, `${sku.productName} - ${sku.sku}`)}
                      className="px-4 py-3 hover:bg-(--gray-2) cursor-pointer transition"
                    >
                      <p className="font-medium">{sku.productName}</p>
                      <p className="text-sm text-(--gray-6)">SKU: {sku.sku}</p>
                    </div>
                  ))
                )}
              </div>
            )}
          </div>

          {/* Selected Samples */}
          {selectedSamples.length > 0 && (
            <div className="space-y-2">
              {selectedSamples.map((sample) => (
                <div
                  key={sample.id}
                  className="flex items-center gap-3 p-3 bg-(--gray-1) border border-(--gray-3) rounded-8"
                >
                  <span className="flex-1 font-medium">{sample.name}</span>
                  <input
                    type="number"
                    min="1"
                    value={sample.quantity}
                    onChange={(e) => updateSampleQuantity(sample.id, parseInt(e.target.value) || 1)}
                    className="w-20 px-2 py-1 border border-(--gray-3) rounded text-center"
                  />
                  <button
                    onClick={() => removeSample(sample.id)}
                    className="p-1 hover:bg-(--destructive)/10 rounded transition"
                  >
                    <X className="w-4 h-4 text-(--destructive)" />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Submit Button */}
        <div className="flex justify-end gap-4 pt-6">
          <Button
            variant="outline"
            size="lg"
            rounded="full"
            onClick={() => {
              setSelectedUserId("");
              setSelectedGiveaways([]);
              setSelectedSamples([]);
            }}
          >
            Reset
          </Button>
          <Button
            onClick={handleSubmit}
            disabled={allocateLoading}
            loading={allocateLoading}
            variant="primary"
            size="lg"
            icon={Plus}
            rounded="full"
            className="shadow-lg"
          >
            Allocate Items
          </Button>
        </div>
      </div>
    </div>
  );
}
