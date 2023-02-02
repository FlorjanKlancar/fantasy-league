// @ts-check
/**
 * Run `build` or `dev` with `SKIP_ENV_VALIDATION` to skip env validation.
 * This is especially useful for Docker builds.
 */
!process.env.SKIP_ENV_VALIDATION && (await import("./src/env/server.mjs"));

/** @type {import("next").NextConfig} */
const config = {
  reactStrictMode: true,
  swcMinify: true,
  i18n: {
    locales: ["en"],
    defaultLocale: "en",
  },
  images: {
    dangerouslyAllowSVG: true,
    domains: [
      "upload.wikimedia.org",
      "cdn.sanity.io",
      "w.namu.la",
      "avatars.dicebear.com",
      "lh3.googleusercontent.com",
      "am-a.akamaihd.net",
      "cdn-icons-png.flaticon.com",
      "olecobyyqhwtozbupzvr.supabase.co",
      "countryflagsapi.com",
    ],
  },
};
export default config;
