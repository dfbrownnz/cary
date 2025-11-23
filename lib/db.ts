// import { PrismaClient } from '@prisma/client/edge';
// import { PrismaClient } from '@prisma/client';

// import { PrismaClient } from '@prisma/client';

// // Initialize the Prisma Client once and export it
// const prisma = new PrismaClient();

// export default prisma;

// lib/db.ts

// import { PrismaClient } from '@prisma/client';

// 1. Declare a global variable to store the PrismaClient instance
//    This prevents multiple instantiations in development.
//const globalForPrisma = global as unknown as { prisma: PrismaClient | undefined };

// 2. Initialize the client only if it hasn't been initialized yet.
//    In production, this just runs once.
//    In development, it uses the existing global instance on HMR.
export const prisma = []
  // globalForPrisma.prisma ?? new PrismaClient({
  //   log: ['query', 'info', 'warn', 'error'], // Recommended logging options
  // });

// 3. In development, save the instance to the global object.
// if (process.env.NODE_ENV !== 'production') {
//   globalForPrisma.prisma = prisma;
// }

export default prisma;