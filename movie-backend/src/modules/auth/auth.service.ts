import crypto from "crypto";
import jwt from "jsonwebtoken";
import { AppDataSource } from "../../config/database";
import { Role } from "../../entities/Role";
import { User } from "../../entities/User";
import { jwtConfig } from "../../config/jwt.config";

export type RegisterInput = {
  email: string;
  first_name: string;
  last_name: string;
  password: string;
};

export type LoginInput = {
  email: string;
  password: string;
};

export type TokenPayload = {
  userId: string;
  email: string;
  role: string;
};

export type AuthTokens = {
  accessToken: string;
  refreshToken: string;
};

class AuthError extends Error {
  statusCode: number;

  constructor(message: string, statusCode: number) {
    super(message);
    this.statusCode = statusCode;
  }
}

const HASH_KEY_LENGTH = 64;
const SALT_LENGTH = 16;

const hashPassword = (password: string): string => {
  const salt = crypto.randomBytes(SALT_LENGTH).toString("hex");
  const hash = crypto
    .scryptSync(password, salt, HASH_KEY_LENGTH)
    .toString("hex");

  return `${salt}:${hash}`;
};

const verifyPassword = (password: string, stored: string): boolean => {
  const [salt, storedHash] = stored.split(":");
  if (!salt || !storedHash) {
    return false;
  }

  const hash = crypto
    .scryptSync(password, salt, HASH_KEY_LENGTH)
    .toString("hex");

  return crypto.timingSafeEqual(
    Buffer.from(hash, "hex"),
    Buffer.from(storedHash, "hex"),
  );
};

const generateAccessToken = (payload: TokenPayload): string => {
  const token = jwt.sign(payload, jwtConfig.accessTokenSecret, {
    expiresIn: jwtConfig.accessTokenExpiry,
  } as any);
  return token;
};

const generateRefreshToken = (payload: TokenPayload): string => {
  const token = jwt.sign(payload, jwtConfig.refreshTokenSecret, {
    expiresIn: jwtConfig.refreshTokenExpiry,
  } as any);
  return token;
};

const generateTokens = (user: User): AuthTokens => {
  const payload: TokenPayload = {
    userId: user.id,
    email: user.email,
    role: user.role?.name ?? "user",
  };

  return {
    accessToken: generateAccessToken(payload),
    refreshToken: generateRefreshToken(payload),
  };
};

export const verifyAccessToken = (token: string): TokenPayload => {
  try {
    return jwt.verify(token, jwtConfig.accessTokenSecret) as TokenPayload;
  } catch (error) {
    throw new AuthError("Invalid or expired access token", 401);
  }
};

export const verifyRefreshToken = (token: string): TokenPayload => {
  try {
    return jwt.verify(token, jwtConfig.refreshTokenSecret) as TokenPayload;
  } catch (error) {
    throw new AuthError("Invalid or expired refresh token", 401);
  }
};

const ensureDefaultRole = async (): Promise<Role> => {
  const roleRepository = AppDataSource.getRepository(Role);
  const existingRole = await roleRepository.findOne({
    where: { name: "user" },
  });

  if (existingRole) {
    return existingRole;
  }

  const role = roleRepository.create({
    name: "user",
    description: "Default user role",
  });

  return roleRepository.save(role);
};

export const registerUser = async (
  payload: RegisterInput,
): Promise<{ user: User; tokens: AuthTokens }> => {
  const userRepository = AppDataSource.getRepository(User);

  const existingUser = await userRepository.findOne({
    where: { email: payload.email },
    relations: ["role"],
  });

  if (existingUser) {
    throw new AuthError("Email already in use", 409);
  }

  const role = await ensureDefaultRole();

  const user = userRepository.create({
    email: payload.email,
    first_name: payload.first_name,
    last_name: payload.last_name,
    password_hash: hashPassword(payload.password),
    role,
  });

  const savedUser = await userRepository.save(user);
  const tokens = generateTokens(savedUser);

  return { user: savedUser, tokens };
};

export const loginUser = async (
  payload: LoginInput,
): Promise<{ user: User; tokens: AuthTokens }> => {
  const userRepository = AppDataSource.getRepository(User);
  const user = await userRepository.findOne({
    where: { email: payload.email },
    relations: ["role"],
  });

  if (!user || !verifyPassword(payload.password, user.password_hash)) {
    throw new AuthError("Invalid email or password", 401);
  }

  const tokens = generateTokens(user);

  return { user, tokens };
};

export const toPublicUser = (user: User) => ({
  id: user.id,
  email: user.email,
  first_name: user.first_name,
  last_name: user.last_name,
  role: user.role?.name ?? null,
  is_active: user.is_active,
  created_at: user.created_at,
  updated_at: user.updated_at,
});

export const toAuthError = (error: unknown) => {
  if (error instanceof AuthError) {
    return error;
  }

  return new AuthError("Unexpected error", 500);
};

export const refreshAccessToken = async (
  refreshToken: string,
): Promise<AuthTokens> => {
  const payload = verifyRefreshToken(refreshToken);

  const userRepository = AppDataSource.getRepository(User);
  const user = await userRepository.findOne({
    where: { id: payload.userId },
    relations: ["role"],
  });

  if (!user || !user.is_active) {
    throw new AuthError("User not found or inactive", 401);
  }

  return generateTokens(user);
};
