import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { ViewMode } from "@typings/cart/cartEnums";
import ViewModeToggle from "../../components/ProductsExhibitorList/ViewModeToggle";

describe("ViewModeToggle", () => {
  it("llama a setViewMode con Grid al hacer click en el ícono de grilla", async () => {
    const setViewMode = vi.fn();
    render(<ViewModeToggle viewMode={ViewMode.List} setViewMode={setViewMode} />);
    await userEvent.click(screen.getByTestId("GridViewIcon"));
    expect(setViewMode).toHaveBeenCalledWith(ViewMode.Grid);
  });

  it("llama a setViewMode con List al hacer click en el ícono de lista", async () => {
    const setViewMode = vi.fn();
    render(<ViewModeToggle viewMode={ViewMode.Grid} setViewMode={setViewMode} />);
    await userEvent.click(screen.getByTestId("ViewListIcon"));
    expect(setViewMode).toHaveBeenCalledWith(ViewMode.List);
  });
});