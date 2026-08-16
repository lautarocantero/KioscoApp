import { describe, it, expect, vi } from "vitest";
import { screen } from "@testing-library/react";
import { MemoryRouter, Routes } from "react-router-dom";
import { renderWithTheme } from "../../shared/test/utils/setupTests";
import CategoriesRoutes from "../CategoriesRoutes";

vi.mock("../pages/CategoriesPage", () => ({
  default: () => <div data-testid="categories-page" />,
}));
vi.mock("../pages/CategoriesListPage", () => ({
  default: () => <div data-testid="categories-list-page" />,
}));
vi.mock("../pages/CategoriesCreatePage", () => ({
  default: () => <div data-testid="categories-create-page" />,
}));
vi.mock("../pages/CategoriesEditPage", () => ({
  default: () => <div data-testid="categories-edit-page" />,
}));

const renderAt = (path: string) =>
  renderWithTheme(
    <MemoryRouter initialEntries={[path]}>
      <Routes>{CategoriesRoutes()}</Routes>
    </MemoryRouter>
  );

describe("CategoriesRoutes", () => {
  it("renderiza CategoriesPage en /categories", () => {
    renderAt("/categories");

    expect(screen.getByTestId("categories-page")).toBeInTheDocument();
  });

  it("renderiza CategoriesListPage en /categories-list", () => {
    renderAt("/categories-list");

    expect(screen.getByTestId("categories-list-page")).toBeInTheDocument();
  });

  it("renderiza CategoriesCreatePage en /categories-create", () => {
    renderAt("/categories-create");

    expect(screen.getByTestId("categories-create-page")).toBeInTheDocument();
  });

  it("renderiza CategoriesEditPage en /categories-edit", () => {
    renderAt("/categories-edit");

    expect(screen.getByTestId("categories-edit-page")).toBeInTheDocument();
  });
});
