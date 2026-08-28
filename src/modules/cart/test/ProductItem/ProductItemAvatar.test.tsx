import { describe, it, expect, vi } from "vitest";
import { screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { renderWithTheme } from "../../../shared/test/utils/setupTests";
import ProductItemAvatar from "../../components/ProductItem/ProductItemAvatar";

describe("ProductItemAvatar", () => {
  it("muestra la inicial del nombre en mayúscula", () => {
    renderWithTheme(<ProductItemAvatar name="coca cola" />);
    expect(screen.getByText("C")).toBeInTheDocument();
  });

  it("muestra '?' si no hay nombre", () => {
    renderWithTheme(<ProductItemAvatar name={undefined} />);
    expect(screen.getByText("?")).toBeInTheDocument();
  });

  it("llama a onClick cuando se provee", async () => {
    const onClick = vi.fn();
    renderWithTheme(<ProductItemAvatar name="Coca Cola" onClick={onClick} />);
    await userEvent.click(screen.getByText("C"));
    expect(onClick).toHaveBeenCalledTimes(1);
  });
});
