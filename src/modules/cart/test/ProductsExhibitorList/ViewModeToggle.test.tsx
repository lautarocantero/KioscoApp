import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { ViewMode } from "@typings/cart/cartEnums";
import ViewModeToggle from "../../components/ProductsExhibitorList/ViewModeToggle";

describe("ViewModeToggle", () => {
  it("llama a setViewMode con Grid al hacer click en 'Grilla'", async () => {
    const setViewMode = vi.fn();
    render(<ViewModeToggle viewMode={ViewMode.Collapsed} setViewMode={setViewMode} />);
    await userEvent.click(screen.getByText("Grilla"));
    expect(setViewMode).toHaveBeenCalledWith(ViewMode.Grid);
  });

  it("llama a setViewMode con Collapsed al hacer click en 'Lista'", async () => {
    const setViewMode = vi.fn();
    render(<ViewModeToggle viewMode={ViewMode.Grid} setViewMode={setViewMode} />);
    await userEvent.click(screen.getByText("Lista"));
    expect(setViewMode).toHaveBeenCalledWith(ViewMode.Collapsed);
  });
});
