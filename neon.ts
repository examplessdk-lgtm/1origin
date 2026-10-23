import { defineConfig } from "@neon/config/v1";

// Additional Neon backend; AWS Cognito and the AWS control plane remain unchanged.
export default defineConfig({
  buckets: { "origin-files": { access: "private" } },
  functions: {
    originfiles: {
      name: "Origin private user files",
      source: "./functions/origin-files.ts",
      env: {
        ORIGIN_BUCKET: "origin-files",
        WEB_ORIGIN: process.env.ORIGIN_WEB_ORIGIN!,
        COGNITO_ISSUER: process.env.ORIGIN_COGNITO_ISSUER!,
        COGNITO_CLIENT_ID: process.env.ORIGIN_COGNITO_CLIENT_ID!,
      },
    },
  },
});
