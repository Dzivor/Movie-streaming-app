import { Request, Response } from "express";
import {
  loginUser,
  registerUser,
  toAuthError,
  toPublicUser,
} from "./auth.service";

export const register = async (req: Request, res: Response) => {
  const { email, first_name, last_name, password } = req.body ?? {};

  if (!email || !first_name || !last_name || !password) {
    return res.status(400).json({
      message: "email, first_name, last_name, and password are required",
    });
  }

  try {
    const user = await registerUser({ email, first_name, last_name, password });

    return res.status(201).json({
      message: "Registration successful",
      user: toPublicUser(user),
    });
  } catch (error) {
    const authError = toAuthError(error);

    return res.status(authError.statusCode).json({
      message: authError.message,
    });
  }
};

export const login = async (req: Request, res: Response) => {
  const { email, password } = req.body ?? {};

  if (!email || !password) {
    return res.status(400).json({
      message: "email and password are required",
    });
  }

  try {
    const user = await loginUser({ email, password });

    return res.status(200).json({
      message: "Login successful",
      user: toPublicUser(user),
    });
  } catch (error) {
    const authError = toAuthError(error);

    return res.status(authError.statusCode).json({
      message: authError.message,
    });
  }
};
