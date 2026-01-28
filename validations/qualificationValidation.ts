import * as Yup from "yup";

// Qualification validation schema
export const qualificationValidationSchema = Yup.object().shape({
  name: Yup.string()
    .required("Qualification name is required")
    .min(2, "Name must be at least 2 characters")
    .max(100, "Name must not exceed 100 characters")
    .trim(),

  pulseCode: Yup.string()
    .required("Pulse code is required")
    .matches(
      /^[a-zA-Z0-9_-]+$/,
      "Pulse code can only contain letters, numbers, hyphens, and underscores"
    )
    .min(2, "Pulse code must be at least 2 characters")
    .max(50, "Pulse code must not exceed 50 characters")
    .trim(),

  status: Yup.string()
    .required("Status is required")
    .oneOf(["active", "inactive"], "Status must be either 'active' or 'inactive'"),
});

// Type for the qualification form data
export type QualificationFormData = Yup.InferType<typeof qualificationValidationSchema>;
