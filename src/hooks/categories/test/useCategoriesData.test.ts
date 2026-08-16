import { describe, it, expect } from "vitest";
import { renderHook } from "@testing-library/react";
import {
  useCategoriesListLinkData,
  useCategoriesCreateLinkData,
  useCategoriesEditLinkData,
} from "../useCategoriesData";

describe("useCategoriesListLinkData", () => {
  it("devuelve el value y subtitle fijos del listado de categorías", () => {
    const { result } = renderHook(() => useCategoriesListLinkData());

    expect(result.current).toEqual({
      value: "12",
      subtitle: "12 categorías registradas",
    });
  });
});

describe("useCategoriesCreateLinkData", () => {
  it("devuelve el subtitle fijo de creación de categoría", () => {
    const { result } = renderHook(() => useCategoriesCreateLinkData());

    expect(result.current).toEqual({ subtitle: "Nueva categoría de productos" });
  });
});

describe("useCategoriesEditLinkData", () => {
  it("devuelve el subtitle fijo de edición de categoría", () => {
    const { result } = renderHook(() => useCategoriesEditLinkData());

    expect(result.current).toEqual({ subtitle: "Modificá una categoría existente" });
  });
});
