import { describe, it, expect, vi } from "vitest";
import { renderWithTheme } from "../../../shared/test/utils/setupTests";
import { screen, fireEvent } from "@testing-library/react";
import ReceiptUploadArea from "../../pages/ReceiptPage/components/ReceiptUploadArea";

describe("ReceiptUploadArea", () => {
  it("muestra el área de carga y permite seleccionar archivo", () => {
    const onSelectFile = vi.fn();
    const onFileChange = vi.fn();
    const onFileDrop = vi.fn();
    const fileInputRef = { current: null } as unknown as React.RefObject<HTMLInputElement>;

    renderWithTheme(
      <ReceiptUploadArea
        acceptedFormats={[".xls", ".xlsx"]}
        maxSize="10 MB"
        onSelectFile={onSelectFile}
        onFileChange={onFileChange}
        onFileDrop={onFileDrop}
        fileInputRef={fileInputRef}
        disabled={false}
      />
    );

    expect(screen.getByText("Arrastrá y soltá tu archivo Excel aquí")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /Seleccionar archivo/i })).toBeInTheDocument();
    expect(screen.getByText("Formatos permitidos: .xls • .xlsx • Tamaño máximo: 10 MB")).toBeInTheDocument();

    fireEvent.click(screen.getByRole("button", { name: /Seleccionar archivo/i }));
    expect(onSelectFile).toHaveBeenCalledOnce();

    const input = document.querySelector("input[type='file']") as HTMLInputElement;
    expect(input).toBeTruthy();
    expect(input.accept).toBe(".xls,.xlsx");
  });

  it("deshabilita el botón cuando disabled es true", () => {
    const onSelectFile = vi.fn();
    const onFileChange = vi.fn();
    const onFileDrop = vi.fn();
    const fileInputRef = { current: null } as unknown as React.RefObject<HTMLInputElement>;

    renderWithTheme(
      <ReceiptUploadArea
        acceptedFormats={[".xls"]}
        maxSize="10 MB"
        onSelectFile={onSelectFile}
        onFileChange={onFileChange}
        onFileDrop={onFileDrop}
        fileInputRef={fileInputRef}
        disabled={true}
      />
    );

    expect(screen.getByRole("button", { name: /Seleccionar archivo/i })).toBeDisabled();
  });
});
