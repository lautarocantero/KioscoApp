import { describe, it, expect, beforeEach } from "vitest";
import { renderHook, act } from "@testing-library/react";
import { useDownloadPdfOption } from "../useDownloadPdfOption";
import { DOWNLOAD_PDF_AFTER_SALE_STORAGE_KEY } from "../../../config/constants";

describe("useDownloadPdfOption", () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it("expone 'true' por defecto (sin nada guardado en localStorage)", () => {
    const { result } = renderHook(() => useDownloadPdfOption());

    expect(result.current.downloadPdfAfterSale).toBe(true);
  });

  it("cambia a 'false' y persiste la elección en localStorage", () => {
    const { result } = renderHook(() => useDownloadPdfOption());

    act(() => result.current.setDownloadPdfAfterSale(false));

    expect(result.current.downloadPdfAfterSale).toBe(false);
    expect(localStorage.getItem(DOWNLOAD_PDF_AFTER_SALE_STORAGE_KEY)).toBe("false");
  });

  it("respeta un 'false' ya guardado en localStorage", () => {
    localStorage.setItem(DOWNLOAD_PDF_AFTER_SALE_STORAGE_KEY, "false");

    const { result } = renderHook(() => useDownloadPdfOption());

    expect(result.current.downloadPdfAfterSale).toBe(false);
  });
});
