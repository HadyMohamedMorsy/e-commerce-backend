import { registerAs } from "@nestjs/config";

export default registerAs("email", () => ({
  transport: {
    host: process.env.EMAIL_HOST,
    port: parseInt(process.env.EMAIL_PORT) || 587,
    secure: process.env.EMAIL_SECURE === "true",
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASSWORD,
    },
  },
  defaults: {
    from: process.env.EMAIL_FROM || "Azalove <noreply@azalove.com>",
  },
}));
