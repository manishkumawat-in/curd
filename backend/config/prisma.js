import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
console.log("Database client generated");

export default prisma;
