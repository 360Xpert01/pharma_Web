import { z } from "zod";

// Employee Registration Schema (English only - no i18n)
export const employeeRegistrationSchema = z.object({
  // Required fields
  email: z
    .string()
    .min(1, { message: "Email is required" })
    .email({ message: "Please provide a valid email address" })
    .transform((val) => val.toLowerCase()),

  firstName: z
    .string()
    .min(2, { message: "First name must be at least 2 characters long" })
    .max(50, { message: "First name cannot exceed 50 characters" })
    .transform((val) => val.trim()),

  lastName: z
    .string()
    .min(2, { message: "Last name must be at least 2 characters long" })
    .max(50, { message: "Last name cannot exceed 50 characters" })
    .transform((val) => val.trim()),

  mobileNumber: z
    .string()
    .min(1, { message: "Mobile number is required" })
    .transform((val) => val.replace(/\D/g, "")) // Strip all non-digits
    .refine((val) => val.length >= 10 && val.length <= 15, {
      message: "Mobile number must be 10-15 digits",
    }),

  // Optional fields
  middleName: z
    .string()
    .min(2, { message: "Middle name must be at least 2 characters long" })
    .max(50, { message: "Middle name cannot exceed 50 characters" })
    .transform((val) => val.trim())
    .optional()
    .or(z.literal("")),

  fullAddress: z
    .string()
    .max(500, { message: "Full address cannot exceed 500 characters" })
    .transform((val) => val.trim())
    .optional()
    .or(z.literal("")),

  roleId: z.string().uuid({ message: "Invalid role selected" }).optional().or(z.literal("")),

  pulseCode: z
    .string()
    .max(100, { message: "Pulse code cannot exceed 100 characters" })
    .optional()
    .or(z.literal("")),

  empLegacyCode: z
    .string()
    .max(100, { message: "Legacy code cannot exceed 100 characters" })
    .transform((val) => val.trim())
    .optional()
    .or(z.literal("")),

  profilePicture: z
    .string()
    .url({ message: "Profile picture must be a valid URL" })
    .optional()
    .or(z.literal("")),

  dob: z
    .string()
    .regex(/^\d{4}-\d{2}-\d{2}$/, { message: "Date of birth must be in YYYY-MM-DD format" })
    .optional()
    .or(z.literal("")),

  supervisorId: z
    .string()
    .uuid({ message: "Invalid supervisor selected" })
    .optional()
    .or(z.literal("")),

  verifiedDevices: z.array(z.string()).optional(),
});

export type EmployeeRegistrationFormValues = z.infer<typeof employeeRegistrationSchema>;
