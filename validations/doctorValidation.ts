import { z } from "zod";

const baseLocationSchema = z.object({
  zone: z.string().min(1, { message: "Zone is required" }),
  region: z.string().min(1, { message: "Region is required" }),
  bricks: z.string().min(1, { message: "Bricks is required" }),
  clinicName: z
    .string()
    .optional()
    .or(z.literal(""))
    .transform((val) => val?.trim() || ""),
  visitingDays: z.object({
    from: z.string().min(1, { message: "From day is required" }),
    to: z.string().min(1, { message: "To day is required" }),
  }),
  visitingHours: z.object({
    from: z.string().min(1, { message: "From time is required" }),
    to: z.string().min(1, { message: "To time is required" }),
  }),
  latitude: z
    .union([z.string(), z.number()])
    .optional()
    .transform((val) => (typeof val === "string" ? parseFloat(val) : val)),
  longitude: z
    .union([z.string(), z.number()])
    .optional()
    .transform((val) => (typeof val === "string" ? parseFloat(val) : val)),
});

export const doctorSchema = z.object({
  pmdcNumber: z
    .string()
    .optional()
    .or(z.literal(""))
    .transform((val) => val?.trim() || ""),
  userName: z
    .string()
    .min(2, { message: "Name must be at least 2 characters long" })
    .max(100, { message: "Name cannot exceed 100 characters" })
    .transform((val) => val.trim()),
  contactNumber: z
    .string()
    .optional()
    .or(z.literal(""))
    .transform((val) => (val ? val.replace(/\D/g, "") : ""))
    .refine((val) => !val || (val.length >= 10 && val.length <= 15), {
      message: "Contact number must be 10-15 digits",
    }),
  qualification: z.string().optional().or(z.literal("")),
  specialization: z.string().optional().or(z.literal("")),
  segment: z
    .string()
    .optional()
    .or(z.literal(""))
    .transform((val) => (val && val.trim() !== "" ? val : null)),
  designation: z
    .string()
    .optional()
    .or(z.literal(""))
    .transform((val) => val?.trim() || ""),
  email: z
    .string()
    .optional()
    .or(z.literal(""))
    .refine((val) => !val || /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val), {
      message: "Please provide a valid email address",
    })
    .transform((val) => (val && val.trim() !== "" ? val.toLowerCase() : null)),
  dateOfBirth: z.string().optional().or(z.literal("")),
  parent: z.string().optional().or(z.literal("")),
  locations: z
    .array(
      baseLocationSchema.extend({
        clinicName: z
          .string()
          .min(1, { message: "Clinic name is required" })
          .transform((val) => val.trim()),
      })
    )
    .min(1, { message: "At least one location is required" }),
});

export type DoctorFormValues = z.infer<typeof doctorSchema>;

export const organizationSchema = doctorSchema
  .omit({
    pmdcNumber: true,
    qualification: true,
    specialization: true,
    designation: true,
    dateOfBirth: true,
    locations: true,
  })
  .extend({
    pmdcNumber: z.string().optional(),
    qualification: z.string().optional(),
    specialization: z.string().optional(),
    designation: z.string().optional(),
    dateOfBirth: z.string().optional(),
    locations: z.array(baseLocationSchema).min(1, { message: "At least one location is required" }),
  });

export type OrganizationFormValues = z.infer<typeof organizationSchema>;
