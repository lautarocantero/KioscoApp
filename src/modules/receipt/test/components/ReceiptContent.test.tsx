import { describe, it, expect, vi } from "vitest";
import { renderWithTheme } from "../../../shared/test/utils/setupTests";
import { screen } from "@testing-library/react";
import ReceiptContent from "../../pages/ReceiptPage/components/ReceiptContent";

describe("ReceiptContent", () => {
  it("renderiza el área de carga y los paneles laterales", () => {
    const fileInputRef = { current: null } as unknown as React.RefObject<HTMLInputElement>;

    renderWithTheme(
      <ReceiptContent
        handleSelectFile={vi.fn()}
        handleFileChange={vi.fn()}
        handleFileDrop={vi.fn()}
        fileInputRef={fileInputRef}
        isUploading={false}
        isConfirming={false}
        isModalOpen={false}
        summaryCardProps={{
          status: "Carga completada",
          description: "Resumen de prueba",
          stats: {
            productsTotal: 1,
            productsInserted: 1,
            productsSkipped: 0,
            productsFailed: 0,
            presentationsCreated: 0,
            presentationsUpdated: 0,
            presentationsUnchanged: 0,
            presentationsFailed: 0,
            pendingReviewCount: 0,
            totalRows: 1,
          },
        }}
      />
    );

    expect(screen.getByText(/Arrastrá y soltá tu archivo Excel aquí/i)).toBeInTheDocument();
    expect(screen.getByText(/Consejos/i)).toBeInTheDocument();
  });

  it("deshabilita la carga cuando isUploading o isConfirming o isModalOpen es true", () => {
    const fileInputRef = { current: null } as unknown as React.RefObject<HTMLInputElement>;

    renderWithTheme(
      <ReceiptContent
        handleSelectFile={vi.fn()}
        handleFileChange={vi.fn()}
        handleFileDrop={vi.fn()}
        fileInputRef={fileInputRef}
        isUploading={true}
        isConfirming={false}
        isModalOpen={false}
        summaryCardProps={{
          status: "Carga en curso",
          description: "Resumen de prueba",
          stats: {
            productsTotal: 1,
            productsInserted: 1,
            productsSkipped: 0,
            productsFailed: 0,
            presentationsCreated: 0,
            presentationsUpdated: 0,
            presentationsUnchanged: 0,
            presentationsFailed: 0,
            pendingReviewCount: 0,
            totalRows: 1,
          },
        }}
      />
    );

    expect(screen.getByRole("button", { name: /Seleccionar archivo/i })).toBeDisabled();
  });
});
