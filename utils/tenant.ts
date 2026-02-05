/**
 * Extracts the subdomain from the current window location hostname.
 * Example: if the hostname is 'web.ceturo.com', it returns 'web'.
 * If the hostname is 'client1.dev.ceturo.com', it returns 'client1'.
 * If no subdomain is found or if it's localhost, it returns a default or null.
 */
export const getSubdomain = (): string | null => {
  if (typeof window === "undefined") return null;

  const hostname = window.location.hostname;

  // Handle localhost or IP addresses
  if (hostname === "localhost" || /^(?:[0-9]{1,3}\.){3}[0-9]{1,3}$/.test(hostname)) {
    return null;
  }

  const parts = hostname.split(".");

  // Assuming the format is [subdomain].ceturo.com
  // If there are at least 3 parts (e.g., web.ceturo.com), the first part is the subdomain
  if (parts.length >= 1) {
    return parts[0];
  }

  return null;
};
