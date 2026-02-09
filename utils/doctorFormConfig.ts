// Channel-based form field configuration

export interface FieldConfig {
  channel: boolean;
  pmdcNumber: boolean;
  name: boolean;
  locations: boolean;
  contactNumber: boolean;
  qualification: boolean;
  specialty: boolean;
  segment: boolean;
  designation: boolean;
  email: boolean;
  dateOfBirth: boolean;
  parent: boolean;
  status: boolean;
  partyType: "DOCTOR" | "ORGANIZATION";
}

/**
 * Field configurations for each channel type
 * Based on the requirements table showing which fields are available per channel
 */
export const channelFieldConfigs: Record<string, FieldConfig> = {
  // Doctors & HCPs channel configuration
  "doctors-hcps": {
    channel: true,
    pmdcNumber: true,
    name: true,
    locations: true,
    contactNumber: true,
    qualification: true,
    specialty: true,
    segment: true,
    designation: true,
    email: true,
    dateOfBirth: true,
    parent: false,
    status: true,
    partyType: "DOCTOR",
  },

  // Pharmacies channel configuration
  pharmacies: {
    channel: true,
    pmdcNumber: false,
    name: true,
    locations: true,
    contactNumber: true,
    qualification: false,
    specialty: false,
    segment: true,
    designation: false,
    email: true,
    dateOfBirth: false,
    parent: false,
    status: true,
    partyType: "ORGANIZATION",
  },

  // Key Accounts channel configuration
  "key-accounts": {
    channel: true,
    pmdcNumber: false,
    name: true,
    locations: true,
    contactNumber: true,
    qualification: false,
    specialty: false,
    segment: true,
    designation: false,
    email: true,
    dateOfBirth: false,
    parent: true,
    status: true,
    partyType: "ORGANIZATION",
  },

  // General Trade channel configuration
  "general-trade": {
    channel: true,
    pmdcNumber: false,
    name: true,
    locations: true,
    contactNumber: true,
    qualification: false,
    specialty: false,
    segment: true,
    designation: false,
    email: true,
    dateOfBirth: false,
    parent: false,
    status: true,
    partyType: "ORGANIZATION",
  },
};

/**
 * Get field configuration based on channel name or ID
 * @param channelNameOrId - The channel name (e.g., "Key Accounts") or channel ID
 * @returns Field configuration object for that channel
 */
export function getFieldConfigByChannel(channelNameOrId?: string): FieldConfig {
  if (!channelNameOrId) {
    // Return a default configuration with all fields
    return channelFieldConfigs["pharmacies"];
  }

  // Normalize the channel name to match our keys (lowercase with hyphens)
  const normalizedName = channelNameOrId.toLowerCase().replace(/\s+/g, "-").replace(/&/g, "");

  // Check if we have a configuration for this channel
  if (channelFieldConfigs[normalizedName]) {
    return channelFieldConfigs[normalizedName];
  }

  // Return default configuration (Doctors & HCPs has all fields)
  return channelFieldConfigs["pharmacies"];
}
