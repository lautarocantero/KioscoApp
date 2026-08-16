import { describe, it, expect } from "vitest";
import { screen } from "@testing-library/react";
import { renderWithTheme } from "../../shared/test/utils/setupTests";
import CategoriesListPage from "../pages/CategoriesListPage";

describe("CategoriesListPage", () => {
  it("renderiza el texto placeholder de la página en construcción", () => {
    renderWithTheme(<CategoriesListPage />);

    expect(screen.getByText("CategoriesListPage")).toBeInTheDocument();
  });
});
