import * as Yup from "yup";

export const signInSchema = Yup.object({
  email: Yup.string()
    .email("Enter a valid email address")
    .required("Email is required"),
  password: Yup.string()
    .required("Password is required")
    .min(8, "Minimum 8 characters")
    .matches(/[A-Z]/, "Add at least 1 uppercase letter")
    .matches(/[0-9]/, "Add at least 1 number")
    .matches(/[^A-Za-z0-9]/, "Add at least 1 special character"),
});
