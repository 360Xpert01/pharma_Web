/**
 * Image Upload Utility
 */

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "https://api.ceturo.com/";

import { getToken } from "../lib/cookie/cookie";
import { getSubdomain } from "./tenant";

export interface UploadedFile {
  url: string;
  publicId: string;
  resourceType: string;
  format: string;
  size: number;
  filename: string;
  mimeType: string;
  storageProvider: string;
}

export interface UploadError {
  filename: string;
  error: string;
}

export interface UploadResponse {
  success: boolean;
  message: string;
  data: {
    files: UploadedFile[];
    totalUploaded: number;
    totalFailed: number;
    errors: UploadError[];
  };
}

/**
 * Upload a File object to the API
 * @param file - File object from input element
 * @returns Promise resolving to the API response
 */
export const uploadImageFile = async (file: File): Promise<UploadResponse> => {
  console.log("uploadImageFile: Starting upload for", file.name);
  const data = new FormData();
  data.append("files", file); // API expects "files" field

  const token = getToken() || localStorage.getItem("userSession");
  if (!token) {
    console.error("uploadImageFile: No session found");
    throw new Error("No session found. Please login again.");
  }

  const subdomain = getSubdomain();
  const headers: Record<string, string> = {
    Authorization: `Bearer ${token}`,
  };

  if (subdomain) {
    headers["subdomain"] = subdomain;
  }

  const res = await fetch(`${baseUrl}api/v1/upload`, {
    method: "POST",
    headers,
    body: data,
  });

  console.log("uploadImageFile: Response status", res.status);

  if (!res.ok) {
    const errorData = await res.json().catch(() => ({}));
    console.error("uploadImageFile: Upload failed", errorData);
    throw new Error(errorData.message || "Failed to upload image");
  }

  const result: UploadResponse = await res.json();
  console.log("uploadImageFile: Success", result);
  if (!result.success) {
    throw new Error(result.message || "Upload failed");
  }

  return result;
};

/**
 * Upload an image from a mobile-style object with uri
 * @param image - Object with uri, type, fileName properties
 * @returns Promise resolving to the API response
 */
export const uploadImage = async (image: {
  uri: string;
  type?: string;
  fileName?: string;
}): Promise<UploadResponse> => {
  console.log("uploadImage: Starting upload for", image.fileName);
  const data = new FormData();

  // For web, we might need to fetch the blob first if it's a data URI
  let fileToUpload: Blob;
  if (image.uri.startsWith("data:")) {
    const res = await fetch(image.uri);
    fileToUpload = await res.blob();
  } else {
    // Assuming it's already a blob or file-like object
    fileToUpload = image as unknown as Blob;
  }

  data.append("files", fileToUpload, image.fileName || "image.jpg");

  const token = getToken() || localStorage.getItem("userSession");
  if (!token) {
    console.error("uploadImage: No session found");
    throw new Error("No session found. Please login again.");
  }

  const subdomain = getSubdomain();
  const headers: Record<string, string> = {
    Authorization: `Bearer ${token}`,
  };

  if (subdomain) {
    headers["subdomain"] = subdomain;
  }

  const res = await fetch(`${baseUrl}api/v1/upload`, {
    method: "POST",
    headers,
    body: data,
  });

  console.log("uploadImage: Response status", res.status);

  if (!res.ok) {
    const errorData = await res.json().catch(() => ({}));
    console.error("uploadImage: Upload failed", errorData);
    throw new Error(errorData.message || "Failed to upload image");
  }

  const result: UploadResponse = await res.json();
  console.log("uploadImage: Success", result);
  if (!result.success) {
    throw new Error(result.message || "Upload failed");
  }

  return result;
};

export default uploadImageFile;
