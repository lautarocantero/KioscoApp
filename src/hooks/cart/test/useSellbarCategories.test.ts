import { describe, it, expect, vi, beforeEach } from "vitest";
import { renderHook, waitFor, act } from "@testing-library/react";
import { useDispatch, useSelector } from "react-redux";
import { useSellbarCategories } from "../useSellbarCategories";
import { getAvailableCategoriesRequest } from "../../../modules/presentations/api/presentationsApi";
import { setSelectedCategoryThunk } from "../../../store/cart/cartThunks";
import { PresentationCategory } from "@typings/presentation/presentationEnum";

vi.mock("react-redux");
vi.mock("../../../modules/presentations/api/presentationsApi");
vi.mock("../../../store/cart/cartThunks", async (importOriginal) => {
  const actual = await importOriginal<typeof import("../../../store/cart/cartThunks")>();
  return { ...actual, setSelectedCategoryThunk: vi.fn(actual.setSelectedCategoryThunk) };
});

const mockedUseDispatch = vi.mocked(useDispatch);
const mockedUseSelector = vi.mocked(useSelector);
const mockedGetAvailableCategories = vi.mocked(getAvailableCategoriesRequest);
const mockedSetSelectedCategoryThunk = vi.mocked(setSelectedCategoryThunk);

const dispatch = vi.fn();
const showSnackBar = vi.fn();

describe("useSellbarCategories", () => {
  beforeEach(() => {
    dispatch.mockClear();
    showSnackBar.mockClear();
    mockedSetSelectedCategoryThunk.mockClear();
    mockedUseDispatch.mockReturnValue(dispatch);
    mockedUseSelector.mockImplementation((selectorFn: (state: unknown) => unknown) =>
      selectorFn({ cart: { selectedCategory: null } })
    );
    mockedGetAvailableCategories.mockResolvedValue([PresentationCategory.Dairy]);
  });

  it("lee la categoría seleccionada directo de Redux (no de estado local)", async () => {
    mockedUseSelector.mockImplementation((selectorFn: (state: unknown) => unknown) =>
      selectorFn({ cart: { selectedCategory: PresentationCategory.Bakery } })
    );

    const { result } = renderHook(() => useSellbarCategories({ showSnackBar }));

    expect(result.current.selected).toBe(PresentationCategory.Bakery);
    await waitFor(() => expect(result.current.isLoading).toBe(false));
  });

  it("despacha setSelectedCategoryThunk al seleccionar, sin guardar estado local propio", async () => {
    const { result } = renderHook(() => useSellbarCategories({ showSnackBar }));

    act(() => result.current.onSelect(PresentationCategory.Dairy));

    expect(mockedSetSelectedCategoryThunk).toHaveBeenCalledWith(PresentationCategory.Dairy);
    expect(dispatch).toHaveBeenCalledWith(expect.any(Function));
    await waitFor(() => expect(result.current.isLoading).toBe(false));
  });

  it("carga la lista de categorías disponibles al montar", async () => {
    const { result } = renderHook(() => useSellbarCategories({ showSnackBar }));

    await waitFor(() => expect(result.current.isLoading).toBe(false));
    expect(result.current.list).toEqual([PresentationCategory.Dairy]);
  });

  it("ordena las categorías alfabéticamente por su label traducido, no por el valor crudo del enum", async () => {
    // Bakery -> "Panadería", Dairy -> "Lácteos": por enum ya vienen en ese
    // orden (bakery < dairy), pero por label debería invertirse (L < P).
    mockedGetAvailableCategories.mockResolvedValue([PresentationCategory.Bakery, PresentationCategory.Dairy]);

    const { result } = renderHook(() => useSellbarCategories({ showSnackBar }));

    await waitFor(() => expect(result.current.isLoading).toBe(false));
    expect(result.current.list).toEqual([PresentationCategory.Dairy, PresentationCategory.Bakery]);
  });

  it("muestra un snackbar de error si falla la carga de categorías", async () => {
    mockedGetAvailableCategories.mockRejectedValueOnce(new Error("network"));

    const { result } = renderHook(() => useSellbarCategories({ showSnackBar }));

    await waitFor(() => expect(result.current.isLoading).toBe(false));
    expect(showSnackBar).toHaveBeenCalled();
  });
});
