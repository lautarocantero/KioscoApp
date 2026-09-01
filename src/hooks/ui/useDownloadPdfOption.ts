import { useCallback, useState } from "react";
import type { UseDownloadPdfOptionReturn } from "@typings/settings/settingsTypes";
import { DEFAULT_DOWNLOAD_PDF_AFTER_SALE, DOWNLOAD_PDF_AFTER_SALE_STORAGE_KEY } from "../../config/constants";

export const useDownloadPdfOption = (): UseDownloadPdfOptionReturn => {
  const [downloadPdfAfterSale, setDownloadPdfAfterSaleState] = useState<boolean>(() => {
    const stored = localStorage.getItem(DOWNLOAD_PDF_AFTER_SALE_STORAGE_KEY);
    if (stored === null) return DEFAULT_DOWNLOAD_PDF_AFTER_SALE;
    return stored === "true";
  });

  const setDownloadPdfAfterSale = useCallback((next: boolean) => {
    localStorage.setItem(DOWNLOAD_PDF_AFTER_SALE_STORAGE_KEY, String(next));
    setDownloadPdfAfterSaleState(next);
  }, []);

  return { downloadPdfAfterSale, setDownloadPdfAfterSale };
};
