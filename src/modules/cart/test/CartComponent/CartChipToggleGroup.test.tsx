import { describe, it, expect, vi } from "vitest";
import { screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { renderWithTheme } from "../../../shared/test/utils/setupTests";
import CartChipToggleGroup from "../../components/CartComponent/CartChipToggleGroup";

const options = [
  { value: "a", label: "Opción A" },
  { value: "b", label: "Opción B" },
];

describe("CartChipToggleGroup", () => {
  it("marca como seleccionada la opción activa", () => {
    renderWithTheme(<CartChipToggleGroup options={options} value="b" onChange={vi.fn()} ariaLabel="Grupo" />);

    expect(screen.getByText("Opción A")).toHaveAttribute("aria-checked", "false");
    expect(screen.getByText("Opción B")).toHaveAttribute("aria-checked", "true");
  });

  it("llama a onChange con el value clickeado", async () => {
    const onChange = vi.fn();
    renderWithTheme(<CartChipToggleGroup options={options} value="a" onChange={onChange} ariaLabel="Grupo" />);

    await userEvent.click(screen.getByText("Opción B"));

    expect(onChange).toHaveBeenCalledWith("b");
  });
});
