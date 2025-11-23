// Example (Not official Prisma standard, but common for adapters)

// D:\dev\js\td\fe\cary>npx prisma generate
// Prisma schema loaded from prisma\schema.prisma

export default {
  database: {
    url: process.env.DATABASE_URL,
    // If using an adapter, you might need to specify it:
    // adapter: 'postgres',
  },
};