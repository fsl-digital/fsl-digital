export const getImagePath = (path: string) => {
  // Remove leading slash if present
  const cleanPath = path.startsWith('/') ? path.slice(1) : path;
  const base = import.meta.env.BASE_URL || "/";
  // Ensure exactly one slash between base and path
  return `${base.replace(/\/$/, '')}/${cleanPath}`;
};
