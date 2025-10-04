import { z } from "zod";

export const doctorSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
  speciality: z.string().min(1, "Speciality is required"),
  degree: z.string().min(1, "Degree is required"),
  experience: z.string().min(1, "Experience is required"),
  about: z.string().min(1, "About is required"),
  fees: z.number({ invalid_type_error: "Fees must be a number" }),
  address: z.string().min(1, "Address is required"),
  date: z.number({ invalid_type_error: "Date must be a number" }),
});
