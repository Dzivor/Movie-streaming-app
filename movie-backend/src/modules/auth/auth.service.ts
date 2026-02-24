import crypto from "crypto";
import { AppDataSource } from "../../config/database";
import { Role } from "../../entities/Role";
import { User } from "../../entities/User";

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

export const registerUser = async (payload: RegisterInput): Promise<User> => {
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

  return userRepository.save(user);
};

export const loginUser = async (payload: LoginInput): Promise<User> => {
  const userRepository = AppDataSource.getRepository(User);
  const user = await userRepository.findOne({
    where: { email: payload.email },
    relations: ["role"],
  });

  if (!user || !verifyPassword(payload.password, user.password_hash)) {
    throw new AuthError("Invalid email or password", 401);
  }

  return user;
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
