export const getImagePath = (path: string) => {
  // Remove leading slash if present
  const cleanPath = path.startsWith('/') ? path.slice(1) : path;
  return `/fsl-digital/${cleanPath}`;
}; 