import { useState, useEffect, useMemo } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useAppDispatch, useAppSelector } from "@/store";
import { getAllSpecializations } from "@/store/slices/specialization/getAllSpecializationsSlice";
import { getAllQualifications } from "@/store/slices/qualification/getAllQualificationsSlice";
import { getAllSegments } from "@/store/slices/segment/getAllSegmentsSlice";
import { getAllChannels } from "@/store/slices/channel/getAllChannelsSlice";
import { getFieldConfigByChannel } from "@/utils/doctorFormConfig";
import { createParty, resetCreatePartyState } from "@/store/slices/party/partySlicePost";
import {
  getOrganizationParties,
  selectOrganizationParties,
  selectOrganizationPartiesLoading,
} from "@/store/slices/party/organizationPartiesSlice";
import { getBrickList } from "@/store/slices/brick/getBrickListSlice";
import { getBrickById, resetBrickByIdState } from "@/store/slices/brick/getBrickByIdSlice";
import {
  fetchPartyById as getPartyById,
  clearParty as resetPartyByIdState,
} from "@/store/slices/party/partygetId";
import { updateParty, resetUpdatePartyState } from "@/store/slices/party/updatePartySlice";
import { toast } from "react-hot-toast";
import { doctorSchema, organizationSchema } from "@/validations";

export interface Location {
  id: string;
  zone: string;
  region: string;
  bricks: string;
  clinicName: string;
  visitingDays: { from: string; to: string };
  visitingHours: { from: string; to: string };
  latitude: string;
  longitude: string;
}

export const useDoctorForm = (idForm?: string, partyIdOverride?: string) => {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const searchParams = useSearchParams();
  const partyId = partyIdOverride || searchParams.get("partyId");
  const isUpdateMode = !!partyId;

  // Redux state
  const { specializations, loading: specializationsLoading } = useAppSelector(
    (state) => state.allSpecializations
  );
  const { qualifications, loading: qualificationsLoading } = useAppSelector(
    (state) => state.allQualifications
  );
  const { organizationParties, loading: organizationPartiesLoading } = useAppSelector(
    (state) => state.organizationParties
  );
  const { segments, loading: segmentsLoading } = useAppSelector((state) => state.allSegments);
  const { channels, loading: channelsLoading } = useAppSelector((state) => state.allChannels);
  const { createLoading, createSuccess, createError } = useAppSelector(
    (state) => state.createParty
  );
  const { data: fetchedParty, loading: partyLoading } = useAppSelector((state) => state.partyById);

  const {
    loading: updateLoading,
    success: updateSuccess,
    error: updateError,
  } = useAppSelector((state) => state.updateParty);

  const brickList = useAppSelector((state) => state.brickList);
  const { bricks, regions, zones, loading: bricksLoading } = brickList;
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
      zone: "",
      region: "",
      bricks: "",
      clinicName: "",
      visitingDays: { from: "", to: "" },
      visitingHours: { from: "", to: "" },
      latitude: "0",
      longitude: "0",
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
    dispatch(getOrganizationParties());

    if (partyId) {
      dispatch(getPartyById(partyId));
    }

    return () => {
      dispatch(resetPartyByIdState());
      dispatch(resetCreatePartyState());
      dispatch(resetUpdatePartyState());
    };
  }, [dispatch, partyId, idForm]);

  // Populate form when party data is fetched
  useEffect(() => {
    if (fetchedParty && isUpdateMode) {
      setUserName(fetchedParty.name || fetchedParty.party_name || "");
      setEmail(fetchedParty.email || "");
      setContactNumber(fetchedParty.phone || fetchedParty.phone_number || "");
      setStatus(fetchedParty.status?.toLowerCase() === "active" ? "Active" : "Inactive");

      if (fetchedParty.attributes) {
        setPmdcNumber(fetchedParty.attributes.pmdcNumber || "");

        // Map Specialization Name to ID
        const specName = fetchedParty.attributes.specialization;
        if (specName) {
          const specObj = specializations.find((s) => s.name === specName || s.id === specName);
          setSpecialization(specObj ? specObj.id : specName);
        }

        // Map Qualification Name to ID
        const qualName = fetchedParty.attributes.qualification;
        if (qualName) {
          const qualObj = qualifications.find((q) => q.name === qualName || q.id === qualName);
          setQualification(qualObj ? qualObj.id : qualName);
        }

        setDesignation(fetchedParty.attributes.designation || "");
        setDateOfBirth(fetchedParty.attributes.date_of_birth || "");
        setDesignation(fetchedParty.attributes.designation || "");
        setDateOfBirth(fetchedParty.attributes.date_of_birth || "");
        setSegment(fetchedParty.attributes.segment || fetchedParty.segmentId || "");
      }

      const parentParties = fetchedParty.parent || (fetchedParty as any).organization;
      if (parentParties) {
        if (typeof parentParties === "string") {
          setParent(parentParties);
        } else if (typeof parentParties === "object") {
          const pId =
            parentParties.parentId ||
            parentParties.parent_id ||
            parentParties.id ||
            parentParties.organizationId;
          if (pId) setParent(pId);
        }
      }

      if (fetchedParty.locations && fetchedParty.locations.length > 0) {
        const mappedLocations = fetchedParty.locations.map((loc: any, index: number) => {
          // Attempt to parse clinic name and area from address
          const addressParts = loc.address ? loc.address.split(", ") : [];
          const clinicName = addressParts[0] || "";
          const area = addressParts[1] || "";

          // Extract schedule data
          const schedule = loc.schedules?.[0]?.scheduleData?.[0];
          const visitingDays = {
            from: schedule?.days?.[0] || "",
            to: schedule?.days?.[1] || schedule?.days?.[0] || "",
          };
          const visitingHours = {
            from: schedule?.time_slots?.[0]?.start || "",
            to: schedule?.time_slots?.[0]?.end || "",
          };

          const brickId = loc.geographic_unit_id || loc.brickId || "";
          let zoneId = "";
          let regionId = "";

          // Derive zone and region if brickId exists and lists are loaded
          if (brickId && bricks.length > 0) {
            const brick = bricks.find((b) => b.id === brickId);
            if (brick && brick.parentId) {
              const region = regions.find((r) => r.id === brick.parentId);
              if (region) {
                regionId = region.id;
                if (region.parentId) {
                  const zone = zones.find((z) => z.id === region.parentId);
                  if (zone) zoneId = zone.id;
                }
              }
            }
          }

          return {
            id: loc.id || (index + 1).toString(),
            zone: zoneId,
            region: regionId,
            bricks: brickId,
            clinicName: clinicName,
            visitingDays,
            visitingHours,
            latitude: loc.latitude?.toString() || "0",
            longitude: loc.longitude?.toString() || "0",
          };
        });
        setLocations(mappedLocations);
      }
    }
  }, [fetchedParty, isUpdateMode, specializations, qualifications, bricks, regions, zones]);

  // Brick details effect is no longer needed since we handle cascading in updateLocation
  useEffect(() => {
    if (selectedBrickDetails && updatingLocationId) {
      dispatch(resetBrickByIdState());
      setUpdatingLocationId(null);
    }
  }, [selectedBrickDetails, updatingLocationId, dispatch]);

  // Auto-select the current channel
  useEffect(() => {
    if (currentChannel && !channel) {
      setChannel(currentChannel.id);
    }
  }, [currentChannel, channel]);

  // Handle success/error
  useEffect(() => {
    if (createSuccess || updateSuccess) {
      toast.success(isUpdateMode ? "Doctor updated successfully!" : "Doctor added successfully!");
      dispatch(resetCreatePartyState());
      dispatch(resetPartyByIdState());

      // Generate the proper channel slug from the channel name
      const channelSlug = currentChannel?.name
        ? currentChannel.name
            .toLowerCase()
            .replace(/&/g, "")
            .replace(/\s+/g, "-")
            .replace(/-+/g, "-")
        : "doctors-hcps"; // Default fallback

      router.push(`/dashboard/${channelSlug}?id=${idForm || ""}`);
    }
    if (createError || updateError) {
      toast.error(createError || updateError);
      dispatch(resetCreatePartyState());
      dispatch(resetUpdatePartyState());
      dispatch(resetPartyByIdState());
    }
  }, [
    createSuccess,
    updateSuccess,
    createError,
    updateError,
    dispatch,
    router,
    idForm,
    isUpdateMode,
    currentChannel,
  ]);

  const addLocation = () => {
    setLocations([
      ...locations,
      {
        id: Date.now().toString(),
        zone: "",
        region: "",
        bricks: "",
        clinicName: "",
        visitingDays: { from: "", to: "" },
        visitingHours: { from: "", to: "" },
        latitude: "0",
        longitude: "0",
      },
    ]);
  };

  const removeLocation = (id: string) => {
    if (locations.length > 1) {
      setLocations(locations.filter((loc) => loc.id !== id));
    }
  };

  const updateLocation = (id: string, field: keyof Location, value: any) => {
    setLocations(
      locations.map((loc) => {
        if (loc.id === id) {
          const updatedLoc = { ...loc, [field]: value };

          // Brick-first logic: select region and zone based on brick
          if (field === "bricks" && value) {
            const brick = bricks.find((b) => b.id === value);
            if (brick && brick.parentId) {
              const region = brickList.regions.find((r) => r.id === brick.parentId);
              if (region) {
                updatedLoc.region = region.id;
                if (region.parentId) {
                  const zone = brickList.zones.find((z) => z.id === region.parentId);
                  if (zone) {
                    updatedLoc.zone = zone.id;
                  }
                }
              }
            }
          }

          return updatedLoc;
        }
        return loc;
      })
    );
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

    const isOrganization = fieldConfig.partyType === "ORGANIZATION";
    const schema = isOrganization ? organizationSchema : doctorSchema;

    const validation = schema.safeParse(formData);

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
        party_type: fieldConfig.partyType || "DOCTOR",
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
      organization: { parentId: parent || null },
      locations: locations.map((loc) => {
        const days = [];
        if (loc.visitingDays.from) days.push(loc.visitingDays.from.toUpperCase());
        if (loc.visitingDays.to) days.push(loc.visitingDays.to.toUpperCase());

        const timeSlots = [];
        if (loc.visitingHours.from && loc.visitingHours.to) {
          timeSlots.push({ start: loc.visitingHours.from, end: loc.visitingHours.to });
        }

        const selectedBrick = bricks.find((b) => b.id === loc.bricks);
        const selectedRegion = brickList.regions.find((r) => r.id === loc.region);
        const selectedZone = brickList.zones.find((z) => z.id === loc.zone);

        return {
          locationType: "CLINIC",
          address: `${loc.clinicName}, ${selectedBrick?.name || ""}, ${
            selectedRegion?.name || ""
          }, ${selectedZone?.name || ""}`,
          city: selectedRegion?.name || "",
          state: selectedZone?.name || "",
          country: "Pakistan",
          geographicUnitId: loc.bricks,
          geographicUnitName: selectedBrick ? selectedBrick.name : "",
          latitude: parseFloat(loc.latitude) || 0,
          longitude: parseFloat(loc.longitude) || 0,
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

    if (isUpdateMode && partyId) {
      dispatch(updateParty({ partyId, payload: payload as any }));
    } else {
      dispatch(createParty(payload as any));
    }
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
    isUpdateMode,

    // Redux data
    specializations,
    specializationsLoading,
    qualifications,
    qualificationsLoading,
    segments,
    segmentsLoading,
    channels,
    channelsLoading,
    createLoading: createLoading || updateLoading,
    partyLoading,
    bricks,
    bricksLoading,
    zones: brickList.zones,
    regions: brickList.regions,
    currentChannel,
    fieldConfig,
    organizationParties,
    organizationPartiesLoading,

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
