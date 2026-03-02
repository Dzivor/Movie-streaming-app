import dotenv from "dotenv";

dotenv.config();

export const jwtConfig = {
  accessTokenSecret:
    (process.env.JWT_ACCESS_SECRET as string) ||
    "your-access-token-secret-change-this",
  refreshTokenSecret:
    (process.env.JWT_REFRESH_SECRET as string) ||
    "your-refresh-token-secret-change-this",
  accessTokenExpiry: (process.env.JWT_ACCESS_EXPIRY as string) || "15m",
  refreshTokenExpiry: (process.env.JWT_REFRESH_EXPIRY as string) || "7d",
};
