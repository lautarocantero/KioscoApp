import { describe, it, expect } from "vitest";
import { screen } from "@testing-library/react";
import { renderWithTheme } from "../../shared/test/utils/setupTests";
import CategoriesEditPage from "../pages/CategoriesEditPage";

describe("CategoriesEditPage", () => {
  it("renderiza el texto placeholder de la página en construcción", () => {
    renderWithTheme(<CategoriesEditPage />);

    expect(screen.getByText("CategoriesEditPage")).toBeInTheDocument();
  });
});
