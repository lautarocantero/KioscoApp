import { describe, it, expect, beforeEach } from "vitest";
import { screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { renderWithTheme } from "../../../shared/test/utils/setupTests";
import MyShopDownloadPdfSection from "../../components/SettingsModal/sections/MyShopDownloadPdfSection";
import { DOWNLOAD_PDF_AFTER_SALE_STORAGE_KEY } from "../../../../config/constants";

describe("MyShopDownloadPdfSection", () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it("tiene 'Descargar automáticamente' seleccionado por defecto", () => {
    renderWithTheme(<MyShopDownloadPdfSection />);

    expect(screen.getByRole("radio", { name: "Descargar automáticamente" })).toBeChecked();
    expect(screen.getByRole("radio", { name: "No descargar automáticamente" })).not.toBeChecked();
  });

  it("cambia a 'No descargar automáticamente' y lo persiste", async () => {
    renderWithTheme(<MyShopDownloadPdfSection />);

    await userEvent.click(screen.getByRole("radio", { name: "No descargar automáticamente" }));

    expect(screen.getByRole("radio", { name: "No descargar automáticamente" })).toBeChecked();
    expect(localStorage.getItem(DOWNLOAD_PDF_AFTER_SALE_STORAGE_KEY)).toBe("false");
  });
});
