import { describe, it, expect } from "vitest";
import { screen } from "@testing-library/react";
import { renderWithTheme } from "../../../shared/test/utils/setupTests";
import CartCountBadge from "../../components/CartHeader/CartCountBadgeComponent";

describe("CartCountBadge", () => {
  it("muestra 'vacío' cuando itemsCount es 0", () => {
    renderWithTheme(<CartCountBadge itemsCount={0} />);
    expect(screen.getByText("vacío")).toBeInTheDocument();
  });

  it("muestra la cantidad de ítems cuando hay al menos uno", () => {
    renderWithTheme(<CartCountBadge itemsCount={4} />);
    expect(screen.getByText("4 ítems")).toBeInTheDocument();
  });
});
