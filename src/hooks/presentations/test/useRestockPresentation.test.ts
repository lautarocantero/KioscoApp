import { describe, it, expect, vi, beforeEach } from "vitest";
import { renderHook, act } from "@testing-library/react";
import { useDispatch } from "react-redux";
import { useRestockPresentation } from "../useRestockPresentation";
import type { Presentation } from "@typings/presentation/presentationTypes";

vi.mock("react-redux", async () => {
  const actual = await vi.importActual("react-redux");
  return { ...actual, useDispatch: vi.fn() };
});

const mockedUseDispatch = vi.mocked(useDispatch);

const buildPresentation = (overrides: Partial<Presentation> = {}): Presentation => ({
  _id: "pres-1",
  brand: "",
  category: [],
  created_at: "",
  description: "",
  expiration_date: "",
  image_url: "",
  min_stock: 5,
  model_size: 0,
  model_type: "",
  model_unit: "unit" as Presentation["model_unit"],
  name: "Coca Cola 500ml",
  price: 0,
  product_id: "p1",
  barcode: "",
  sku: "",
  stock: 10,
  updated_at: "",
  is_perishable: false,
  sale_type: "unit" as Presentation["sale_type"],
  ...overrides,
});

describe("useRestockPresentation", () => {
  const mockDispatch = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
    mockedUseDispatch.mockReturnValue(mockDispatch as unknown as ReturnType<typeof useDispatch>);
  });

  it("abre el diálogo con el stock actual y el stock mínimo de la presentación", () => {
    const { result } = renderHook(() => useRestockPresentation());
    const presentation = buildPresentation({ _id: "pres-2", name: "Sprite 500ml", stock: 8, min_stock: 3 });

    act(() => result.current.handleRestockRequest(presentation));

    expect(result.current.restockDialog).toEqual({
      open: true,
      id: "pres-2",
      name: "Sprite 500ml",
      stock: 8,
      minStock: 3,
    });
    expect(result.current.stockValue).toBe(8);
  });

  it("despacha el nuevo stock y cierra el diálogo cuando la actualización es exitosa", async () => {
    mockDispatch.mockResolvedValueOnce(true);

    const { result } = renderHook(() => useRestockPresentation());
    act(() => result.current.handleRestockRequest(buildPresentation()));
    act(() => result.current.handleStockChange(25));

    await act(async () => {
      await result.current.handleRestockConfirm();
    });

    expect(mockDispatch).toHaveBeenCalledTimes(1);
    expect(result.current.restockDialog.open).toBe(false);
    expect(result.current.errorMessage).toBeNull();
    expect(result.current.isSubmitting).toBe(false);
  });

  it("mantiene el diálogo abierto y expone un error si el stock ingresado es negativo", async () => {
    const { result } = renderHook(() => useRestockPresentation());
    act(() => result.current.handleRestockRequest(buildPresentation()));
    act(() => result.current.handleStockChange(-1));

    await act(async () => {
      await result.current.handleRestockConfirm();
    });

    expect(mockDispatch).not.toHaveBeenCalled();
    expect(result.current.restockDialog.open).toBe(true);
    expect(result.current.errorMessage).not.toBeNull();
  });

  it("expone un error y mantiene el diálogo abierto si el thunk falla", async () => {
    mockDispatch.mockResolvedValueOnce(false);

    const { result } = renderHook(() => useRestockPresentation());
    act(() => result.current.handleRestockRequest(buildPresentation()));

    await act(async () => {
      await result.current.handleRestockConfirm();
    });

    expect(result.current.restockDialog.open).toBe(true);
    expect(result.current.errorMessage).not.toBeNull();
    expect(result.current.isSubmitting).toBe(false);
  });

  it("handleRestockCancel cierra el diálogo y limpia el error", () => {
    const { result } = renderHook(() => useRestockPresentation());
    act(() => result.current.handleRestockRequest(buildPresentation()));

    act(() => result.current.handleRestockCancel());

    expect(result.current.restockDialog.open).toBe(false);
    expect(result.current.errorMessage).toBeNull();
  });
});
