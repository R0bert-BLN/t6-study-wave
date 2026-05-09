export const useFileHandler = () => {
  const API_URL = import.meta.env.VITE_API_URL;

  const previewFile = (path: string) => {
    window.open(`${API_URL}/files/${path}`, "_blank");
  };

  const downloadFile = (path: string, fileName: string) => {
    window.location.href = `${API_URL}/files/${path}?download=1&name=${encodeURIComponent(fileName)}`;
  };

  const getInlineImageUrl = (path: string) => {
    return `${API_URL}/files/${path}`;
  };

  return { previewFile, downloadFile, getInlineImageUrl };
};
