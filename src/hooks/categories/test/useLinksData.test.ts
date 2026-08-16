import { describe, it, expect, vi } from "vitest";
import { renderHook } from "@testing-library/react";
import { useCategoriesLinks } from "../useLinksData";
import {
  useCategoriesListLinkData,
  useCategoriesCreateLinkData,
  useCategoriesEditLinkData,
} from "../useCategoriesData";

vi.mock("../useCategoriesData");
vi.mock("../../../config/Links", () => ({
  CategoriesNavLinks: [
    { description: "Ver Categorías", icon: null, url: "/categories-list", subtitle: "" },
    { description: "Crear Categoría", icon: null, url: "/categories-create", subtitle: "" },
    { description: "Editar Categoría", icon: null, url: "/categories-edit", subtitle: "" },
  ],
}));

const mockedUseCategoriesListLinkData = vi.mocked(useCategoriesListLinkData);
const mockedUseCategoriesCreateLinkData = vi.mocked(useCategoriesCreateLinkData);
const mockedUseCategoriesEditLinkData = vi.mocked(useCategoriesEditLinkData);

describe("useCategoriesLinks", () => {
  it("devuelve un link por cada entrada de CategoriesNavLinks", () => {
    const { result } = renderHook(() => useCategoriesLinks());

    expect(result.current.map((link) => link.url)).toEqual([
      "/categories-list",
      "/categories-create",
      "/categories-edit",
    ]);
  });

  it("asocia useCategoriesListLinkData al link de /categories-list", () => {
    const { result } = renderHook(() => useCategoriesLinks());

    const listLink = result.current.find((link) => link.url === "/categories-list");

    expect(listLink?.useData).toBe(mockedUseCategoriesListLinkData);
  });

  it("asocia useCategoriesCreateLinkData al link de /categories-create", () => {
    const { result } = renderHook(() => useCategoriesLinks());

    const createLink = result.current.find((link) => link.url === "/categories-create");

    expect(createLink?.useData).toBe(mockedUseCategoriesCreateLinkData);
  });

  it("asocia useCategoriesEditLinkData al link de /categories-edit", () => {
    const { result } = renderHook(() => useCategoriesLinks());

    const editLink = result.current.find((link) => link.url === "/categories-edit");

    expect(editLink?.useData).toBe(mockedUseCategoriesEditLinkData);
  });

  it("preserva el resto de los campos del link original", () => {
    const { result } = renderHook(() => useCategoriesLinks());

    expect(result.current[0]).toMatchObject({
      description: "Ver Categorías",
      url: "/categories-list",
      subtitle: "",
    });
  });
});
