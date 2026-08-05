import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { createRef } from "react";
import type { BarcodeButtonComponentProps } from "@typings/seller/sellerComponentTypes";
import BarcodeButtonComponent from "../../components/CatalogHeader/BarcodeButtonComponent";

const buildBarcode = (
  overrides: Partial<BarcodeButtonComponentProps["barcode"]> = {}
): BarcodeButtonComponentProps["barcode"] => ({
  showBarcodeInput: false,
  value: "",
  inputRef: createRef<HTMLInputElement>(),
  toggleShowInput: vi.fn(),
  onChange: vi.fn(),
  onKeyDown: vi.fn(),
  ...overrides,
});

describe("BarcodeButtonComponent", () => {
  it("muestra el label 'Escanear' cuando el input está oculto", () => {
    render(<BarcodeButtonComponent barcode={buildBarcode()} />);
    expect(screen.getByText("Escanear")).toBeInTheDocument();
    expect(screen.queryByPlaceholderText("Escanee aquí")).not.toBeInTheDocument();
  });

  it("llama a toggleShowInput al hacer click en el contenedor", async () => {
    const barcode = buildBarcode();
    render(<BarcodeButtonComponent barcode={barcode} />);
    await userEvent.click(screen.getByText("Escanear"));
    expect(barcode.toggleShowInput).toHaveBeenCalledTimes(1);
  });

  it("muestra el input y oculta el label cuando showBarcodeInput es true", () => {
    render(<BarcodeButtonComponent barcode={buildBarcode({ showBarcodeInput: true, value: "123" })} />);
    expect(screen.queryByText("Escanear")).not.toBeInTheDocument();
    expect(screen.getByPlaceholderText("Escanee aquí")).toHaveValue("123");
  });

  it("dispara onChange con el nuevo valor al escribir", () => {
    const barcode = buildBarcode({ showBarcodeInput: true });
    render(<BarcodeButtonComponent barcode={barcode} />);
    fireEvent.change(screen.getByPlaceholderText("Escanee aquí"), { target: { value: "7501234" } });
    expect(barcode.onChange).toHaveBeenCalledWith("7501234");
  });

  it("dispara onKeyDown al presionar una tecla en el input", () => {
    const barcode = buildBarcode({ showBarcodeInput: true });
    render(<BarcodeButtonComponent barcode={barcode} />);
    fireEvent.keyDown(screen.getByPlaceholderText("Escanee aquí"), { key: "Enter", code: "Enter" });
    expect(barcode.onKeyDown).toHaveBeenCalledTimes(1);
  });

  it("no propaga el click del input hacia el contenedor (stopPropagation)", () => {
    const barcode = buildBarcode({ showBarcodeInput: true });
    render(<BarcodeButtonComponent barcode={barcode} />);
    fireEvent.click(screen.getByPlaceholderText("Escanee aquí"));
    expect(barcode.toggleShowInput).not.toHaveBeenCalled();
  });
});