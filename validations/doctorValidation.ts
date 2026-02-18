import { z } from "zod";

export const doctorSchema = z.object({
  pmdcNumber: z
    .string()
    .min(1, { message: "PMDC Number is required" })
    .transform((val) => val.trim()),
  userName: z
    .string()
    .min(2, { message: "Name must be at least 2 characters long" })
    .max(100, { message: "Name cannot exceed 100 characters" })
    .transform((val) => val.trim()),
  contactNumber: z
    .string()
    .min(1, { message: "Contact number is required" })
    .transform((val) => val.replace(/\D/g, ""))
    .refine((val) => val.length >= 10 && val.length <= 15, {
      message: "Contact number must be 10-15 digits",
    }),
  qualification: z.string().min(1, { message: "Qualification is required" }),
  specialization: z.string().min(1, { message: "Speciality is required" }),
  segment: z.string().min(1, { message: "Segment is required" }),
  designation: z
    .string()
    .min(1, { message: "Designation is required" })
    .transform((val) => val.trim()),
  email: z
    .string()
    .min(1, { message: "Email is required" })
    .email({ message: "Please provide a valid email address" })
    .transform((val) => val.toLowerCase()),
  dateOfBirth: z.string().min(1, { message: "Date of birth is required" }),
  parent: z.string().optional().or(z.literal("")),
  locations: z
    .array(
      z.object({
        zone: z.string().min(1, { message: "Zone is required" }),
        region: z.string().min(1, { message: "Region is required" }),
        bricks: z.string().min(1, { message: "Bricks is required" }),
        clinicName: z
          .string()
          .min(1, { message: "Clinic name is required" })
          .transform((val) => val.trim()),
        visitingDays: z.object({
          from: z.string().min(1, { message: "From day is required" }),
          to: z.string().min(1, { message: "To day is required" }),
        }),
        visitingHours: z.object({
          from: z.string().min(1, { message: "From time is required" }),
          to: z.string().min(1, { message: "To time is required" }),
        }),
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
  })
  .extend({
    pmdcNumber: z.string().optional(),
    qualification: z.string().optional(),
    specialization: z.string().optional(),
    designation: z.string().optional(),
    dateOfBirth: z.string().optional(),
  });

export type OrganizationFormValues = z.infer<typeof organizationSchema>;
