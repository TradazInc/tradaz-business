export const serverUrl = process.env.NEXT_PUBLIC_SERVER_URL;
export const cloudinaryUrl = process.env.NEXT_PUBLIC_CLOUDINARY_URL;
export const cloudinaryCloudName =
  process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;
export const cloudinaryApiKey = process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY;
const clientUrl = process.env.NEXT_PUBLIC_CLIENT_URL;

const client = new URL(clientUrl || "http://localhost:3000");
export const protocol = client.protocol.replace(":", "");
export const rootDomain = client.host; // "localhost:3000" | "tradaz.com"
