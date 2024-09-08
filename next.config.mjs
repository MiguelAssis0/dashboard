/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    DATABASE_URL:
      "postgresql://neondb_owner:wiVXC08jLhrx@ep-dawn-mode-a5pv3ntx.us-east-2.aws.neon.tech/neondb?sslmode=require",
  },
};

export default nextConfig;
