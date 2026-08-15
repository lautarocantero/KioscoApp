import { describe, it, expect } from "vitest";
import { screen } from "@testing-library/react";
import { renderWithTheme } from "../../shared/test/utils/setupTests";
import AccountEditPage from "../pages/AccountEditPage";

describe("AccountEditPage", () => {
  it("renderiza el texto placeholder de la página en construcción", () => {
    renderWithTheme(<AccountEditPage />);

    expect(screen.getByText("AccountEditPage")).toBeInTheDocument();
  });
});
