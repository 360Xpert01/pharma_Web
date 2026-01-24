/**
 * Cloudinary Image Upload Utility
 */

// Cloudinary configuration from environment variables
const CLOUDINARY_CONFIG = {
  cloudName: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME || "dm6hah42c",
  uploadPreset: process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET || "ml_default",
};

interface CloudinaryResponse {
  secure_url: string;
  public_id: string;
  [key: string]: unknown;
}

/**
 * Upload a File object to Cloudinary
 * @param file - File object from input element
 * @returns Promise resolving to the secure URL of the uploaded image
 */
export const uploadImageFile = async (file: File): Promise<string> => {
  const data = new FormData();

  data.append("file", file);
  data.append("upload_preset", CLOUDINARY_CONFIG.uploadPreset);
  data.append("cloud_name", CLOUDINARY_CONFIG.cloudName);

  const res = await fetch(
    `https://api.cloudinary.com/v1_1/${CLOUDINARY_CONFIG.cloudName}/image/upload`,
    {
      method: "POST",
      body: data,
    }
  );

  if (!res.ok) {
    throw new Error("Failed to upload image to Cloudinary");
  }

  const result: CloudinaryResponse = await res.json();
  return result.secure_url;
};

/**
 * Upload an image from a mobile-style object with uri
 * @param image - Object with uri, type, fileName properties
 * @returns Promise resolving to the secure URL
 */
export const uploadImage = async (image: {
  uri: string;
  type?: string;
  fileName?: string;
}): Promise<string> => {
  const data = new FormData();

  data.append("file", {
    uri: image.uri,
    type: image.type || "image/jpeg",
    name: image.fileName || "image.jpg",
  } as unknown as Blob);

  data.append("upload_preset", CLOUDINARY_CONFIG.uploadPreset);
  data.append("cloud_name", CLOUDINARY_CONFIG.cloudName);

  const res = await fetch(
    `https://api.cloudinary.com/v1_1/${CLOUDINARY_CONFIG.cloudName}/image/upload`,
    {
      method: "POST",
      body: data,
    }
  );

  if (!res.ok) {
    throw new Error("Failed to upload image to Cloudinary");
  }

  const result: CloudinaryResponse = await res.json();
  return result.secure_url;
};

export default uploadImageFile;
