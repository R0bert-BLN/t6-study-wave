import { authService } from "@/servicies/auth/auth.ts";

export const useFileHandler = () => {
  const previewFile = async (path: string) => {
    const url = await authService.getSignedUrl(path);
    window.open(url, "_blank");
  };

  const downloadFile = async (path: string, fileName: string) => {
    const url = await authService.getSignedUrl(path);
    const link = document.createElement("a");

    link.href = url;
    link.setAttribute("download", fileName);

    document.body.appendChild(link);

    link.click();
    link.remove();
  };

  return { previewFile, downloadFile };
};
