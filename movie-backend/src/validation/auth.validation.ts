import * as yup from "yup";

export const registerSchema = yup.object({
  email: yup
    .string()
    .required("Email is required")
    .email("Invalid email format")
    .lowercase()
    .trim(),
  first_name: yup
    .string()
    .required("First name is required")
    .min(2, "First name must be at least 2 characters")
    .max(50, "First name must not exceed 50 characters")
    .trim(),
  last_name: yup
    .string()
    .required("Last name is required")
    .min(2, "Last name must be at least 2 characters")
    .max(50, "Last name must not exceed 50 characters")
    .trim(),
  password: yup
    .string()
    .required("Password is required")
    .min(8, "Password must be at least 8 characters")
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/,
      "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character",
    ),
});

export const loginSchema = yup.object({
  email: yup
    .string()
    .required("Email is required")
    .email("Invalid email format")
    .lowercase()
    .trim(),
  password: yup.string().required("Password is required"),
});

export const refreshTokenSchema = yup.object({
  refreshToken: yup.string().required("Refresh token is required"),
});
export type RegisterDTO =
 yup.InferType<typeof registerSchema>;

export type LoginDTO = yup.InferType<typeof loginSchema>;

export type RefreshTokenDTO = yup.InferType<typeof refreshTokenSchema>;