import { describe, it, expect } from "vitest";
import { screen } from "@testing-library/react";
import { renderWithTheme } from "../../shared/test/utils/setupTests";
import CategoriesCreatePage from "../pages/CategoriesCreatePage";

describe("CategoriesCreatePage", () => {
  it("renderiza el texto placeholder de la página en construcción", () => {
    renderWithTheme(<CategoriesCreatePage />);

    expect(screen.getByText("CategoriesCreatePage")).toBeInTheDocument();
  });
});
