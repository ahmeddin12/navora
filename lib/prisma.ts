import { PrismaClient } from "@prisma/client";
import { Pool } from "pg";
import { PrismaPg } from "@prisma/adapter-pg";

// Allow prisma to be undefined initially
const globalForPrisma = globalThis as unknown as { prisma?: PrismaClient };

const pool = new Pool({ connectionString: process.env.DATABASE_URL });
const adapter = new PrismaPg(pool);

// Create a new PrismaClient if none exists
export const prisma =
  globalForPrisma.prisma ??
  new PrismaClient({
    adapter,
    log: ["query"], // optional
  });

// Prevent multiple instances during dev hot reload
if (process.env.NODE_ENV !== "production") {
  globalForPrisma.prisma = prisma;
}
