import { PrismaClient } from "@prisma/client";

const prismaClientSingleton = () => {
  return new PrismaClient();
};

declare const globalThis: {
  prisma: ReturnType<typeof prismaClientSingleton>;
};

const globalPrisma = globalThis.prisma || prismaClientSingleton();

if (process.env.NODE_ENV !== "production") globalThis.prisma = globalPrisma;

export default globalPrisma;
