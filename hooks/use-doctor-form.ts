import { useState, useEffect, useMemo } from "react";
import { useRouter } from "next/navigation";
import { useAppDispatch, useAppSelector } from "@/store";
import { getAllSpecializations } from "@/store/slices/specialization/getAllSpecializationsSlice";
import { getAllQualifications } from "@/store/slices/qualification/getAllQualificationsSlice";
import { getAllSegments } from "@/store/slices/segment/getAllSegmentsSlice";
import { getAllChannels } from "@/store/slices/channel/getAllChannelsSlice";
import { getFieldConfigByChannel } from "@/utils/doctorFormConfig";
import { createParty, resetCreatePartyState } from "@/store/slices/party/partySlicePost";
import { getBrickList } from "@/store/slices/brick/getBrickListSlice";
import { getBrickById, resetBrickByIdState } from "@/store/slices/brick/getBrickByIdSlice";
import { toast } from "react-hot-toast";
import { doctorSchema } from "@/validations";

export interface Location {
  id: string;
  city: string;
  country: string;
  area: string;
  bricks: string;
  clinicName: string;
  visitingDays: { from: string; to: string };
  visitingHours: { from: string; to: string };
}

export const useDoctorForm = (idForm?: string) => {
  const dispatch = useAppDispatch();
  const router = useRouter();

  // Redux state
  const { specializations, loading: specializationsLoading } = useAppSelector(
    (state) => state.allSpecializations
  );
  const { qualifications, loading: qualificationsLoading } = useAppSelector(
    (state) => state.allQualifications
  );
  const { segments, loading: segmentsLoading } = useAppSelector((state) => state.allSegments);
  const { channels, loading: channelsLoading } = useAppSelector((state) => state.allChannels);
  const { createLoading, createSuccess, createError } = useAppSelector(
    (state) => state.createParty
  );
  const brickList = useAppSelector((state) => state.brickList);
  const { bricks, loading: bricksLoading } = brickList;
  const { brick: selectedBrickDetails } = useAppSelector((state) => state.brickById);

  // Track which location is currently being updated by brick selection
  const [updatingLocationId, setUpdatingLocationId] = useState<string | null>(null);

  // Find the channel associated with this ID
  const currentChannel = useMemo(() => {
    if (!channels || channels.length === 0 || !idForm) return null;
    return channels.find((ch) => ch.id === idForm);
  }, [channels, idForm]);

  // Get field configuration based on channel name
  const fieldConfig = useMemo(() => {
    return getFieldConfigByChannel(currentChannel?.name);
  }, [currentChannel]);

  // Form states
  const [channel, setChannel] = useState("");
  const [pmdcNumber, setPmdcNumber] = useState("");
  const [userName, setUserName] = useState("");
  const [specialization, setSpecialization] = useState("");
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"Active" | "Inactive">("Active");
  const [contactNumber, setContactNumber] = useState("");
  const [qualification, setQualification] = useState("");
  const [segment, setSegment] = useState("");
  const [designation, setDesignation] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState("");
  const [parent, setParent] = useState("");
  const [locations, setLocations] = useState<Location[]>([
    {
      id: "1",
      city: "",
      country: "",
      area: "",
      bricks: "",
      clinicName: "",
      visitingDays: { from: "", to: "" },
      visitingHours: { from: "", to: "" },
    },
  ]);

  // Validation errors state
  const [validationErrors, setValidationErrors] = useState<Record<string, string>>({});

  // Helper functions
  const getErrorMessage = (fieldName: string) => validationErrors[fieldName] || "";
  const clearFieldError = (fieldName: string) => {
    if (validationErrors[fieldName]) {
      setValidationErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[fieldName];
        return newErrors;
      });
    }
  };

  // Fetch data on mount
  useEffect(() => {
    dispatch(getAllSpecializations());
    dispatch(getAllQualifications());
    dispatch(getAllSegments());
    dispatch(getAllChannels());
    dispatch(getBrickList());
  }, [dispatch]);

  // Handle brick details population
  useEffect(() => {
    if (selectedBrickDetails && updatingLocationId) {
      const { areas, cities, provinces, regions, zones } = brickList;

      const findParent = (parentId: string) => {
        return (
          areas.find((a: any) => a.id === parentId) ||
          zones.find((z: any) => z.id === parentId) ||
          cities.find((c: any) => c.id === parentId) ||
          provinces.find((p: any) => p.id === parentId) ||
          regions.find((r: any) => r.id === parentId)
        );
      };

      let currentArea = "";
      let currentCity = "";
      let currentCountry = "";

      let parent = findParent(selectedBrickDetails.parentId);

      if (selectedBrickDetails.parentId === selectedBrickDetails.id) {
        const brickInList = bricks.find((b: any) => b.id === selectedBrickDetails.id);
        if (brickInList && brickInList.parentId !== brickInList.id) {
          parent = findParent(brickInList.parentId);
        }
      }

      let depth = 0;
      while (parent && depth < 5) {
        const parentName = parent.name;
        const parentId = parent.id;

        if (areas.some((a: any) => a.id === parentId)) currentArea = parentName;
        else if (cities.some((c: any) => c.id === parentId)) currentCity = parentName;
        else if (regions.some((r: any) => r.id === parentId)) currentCountry = parentName;
        else if (provinces.some((p: any) => p.id === parentId)) {
          if (!currentCity) currentCity = parentName;
        }

        if (parent.parentId && parent.parentId !== parent.id) {
          parent = findParent(parent.parentId);
        } else {
          parent = null;
        }
        depth++;
      }

      setLocations((prev) =>
        prev.map((loc) =>
          loc.id === updatingLocationId
            ? {
                ...loc,
                area: currentArea || "N/A",
                city: currentCity || "N/A",
                country: currentCountry || "N/A",
              }
            : loc
        )
      );
      setUpdatingLocationId(null);
      dispatch(resetBrickByIdState());
    }
  }, [selectedBrickDetails, updatingLocationId, dispatch, brickList, bricks]);

  // Auto-select the current channel
  useEffect(() => {
    if (currentChannel && !channel) {
      setChannel(currentChannel.id);
    }
  }, [currentChannel, channel]);

  // Handle success/error
  useEffect(() => {
    if (createSuccess) {
      toast.success("Doctor added successfully!");
      dispatch(resetCreatePartyState());
      router.push(`/dashboard/doctors-?id=${idForm || ""}`);
    }
    if (createError) {
      toast.error(createError);
      dispatch(resetCreatePartyState());
    }
  }, [createSuccess, createError, dispatch, router, idForm]);

  const addLocation = () => {
    setLocations([
      ...locations,
      {
        id: Date.now().toString(),
        city: "",
        country: "",
        area: "",
        bricks: "",
        clinicName: "",
        visitingDays: { from: "", to: "" },
        visitingHours: { from: "", to: "" },
      },
    ]);
  };

  const removeLocation = (id: string) => {
    if (locations.length > 1) {
      setLocations(locations.filter((loc) => loc.id !== id));
    }
  };

  const updateLocation = (id: string, field: keyof Location, value: any) => {
    setLocations(locations.map((loc) => (loc.id === id ? { ...loc, [field]: value } : loc)));

    if (field === "bricks" && value) {
      setUpdatingLocationId(id);
      dispatch(getBrickById(value));
    }
  };

  const handleSubmit = async () => {
    const formData = {
      pmdcNumber,
      userName,
      specialization,
      email,
      contactNumber,
      qualification,
      segment,
      designation,
      dateOfBirth,
      parent,
      locations,
    };

    const validation = doctorSchema.safeParse(formData);

    if (!validation.success) {
      const errors: Record<string, string> = {};
      validation.error.errors.forEach((err) => {
        const fieldName = err.path.join(".");
        if (!errors[fieldName]) {
          errors[fieldName] = err.message;
        }
      });
      setValidationErrors(errors);
      toast.error(validation.error.errors[0].message);
      return;
    }

    setValidationErrors({});
    const validatedData = validation.data;

    const payload = {
      channelTypeId: channel || idForm || "",
      basicInfo: {
        party_type: "DOCTOR",
        name: validatedData.userName,
        email: validatedData.email,
        phoneNumber: validatedData.contactNumber,
        image: "",
        description: validatedData.designation || validatedData.qualification || "",
        segmentId: validatedData.segment,
        status: status.toUpperCase(),
      },
      attributes: {
        specialization: validatedData.specialization,
        qualification: validatedData.qualification,
        segment: validatedData.segment,
        designation: validatedData.designation,
        date_of_birth: validatedData.dateOfBirth,
        pmdcNumber: validatedData.pmdcNumber,
      },
      locations: locations.map((loc) => {
        const days = [];
        if (loc.visitingDays.from) days.push(loc.visitingDays.from.toUpperCase());
        if (loc.visitingDays.to) days.push(loc.visitingDays.to.toUpperCase());

        const timeSlots = [];
        if (loc.visitingHours.from && loc.visitingHours.to) {
          timeSlots.push({ start: loc.visitingHours.from, end: loc.visitingHours.to });
        }

        return {
          locationType: "CLINIC",
          address: `${loc.clinicName}, ${loc.area}, ${loc.city}`,
          city: loc.city,
          state: loc.city,
          country: loc.country,
          schedules: [
            {
              scheduleType: "WEEKLY",
              validFrom: new Date().toISOString().split("T")[0],
              validUntil: null,
              scheduleData: [{ days, time_slots: timeSlots }],
            },
          ],
        };
      }),
    };

    dispatch(createParty(payload as any));
  };

  return {
    // State
    pmdcNumber,
    setPmdcNumber,
    userName,
    setUserName,
    specialization,
    setSpecialization,
    email,
    setEmail,
    status,
    setStatus,
    contactNumber,
    setContactNumber,
    qualification,
    setQualification,
    segment,
    setSegment,
    designation,
    setDesignation,
    dateOfBirth,
    setDateOfBirth,
    parent,
    setParent,
    locations,

    // Redux data
    specializations,
    specializationsLoading,
    qualifications,
    qualificationsLoading,
    segments,
    segmentsLoading,
    channels,
    channelsLoading,
    createLoading,
    bricks,
    bricksLoading,
    currentChannel,
    fieldConfig,

    // Handlers
    addLocation,
    removeLocation,
    updateLocation,
    handleSubmit,
    getErrorMessage,
    clearFieldError,
    router,
  };
};
