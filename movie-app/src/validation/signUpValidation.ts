import * as Yup from "yup";

export const signUpSchema = Yup.object({
  firstName: Yup.string()
    .required("First name is required")
    .min(2, "Minimum 2 characters"),
  lastName: Yup.string()
    .required("Last name is required")
    .min(2, "Minimum 2 characters"),
  email: Yup.string()
    .email("Enter a valid email address")
    .required("Email is required"),
  password: Yup.string()
    .required("Password is required")
    .min(8, "Minimum 8 characters")
    .matches(/[A-Z]/, "Add at least 1 uppercase letter")
    .matches(/[0-9]/, "Add at least 1 number")
    .matches(/[^A-Za-z0-9]/, "Add at least 1 special character"),
  confirmPassword: Yup.string()
    .required("Confirm your password")
    .oneOf([Yup.ref("password")], "Passwords do not match"),
});
