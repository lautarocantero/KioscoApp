import { describe, it, expect, vi } from "vitest";
import { screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { renderWithTheme } from "../../../shared/test/utils/setupTests";
import CartNoteInput from "../../components/CartComponent/CartNoteInput";

describe("CartNoteInput", () => {
  it("muestra el valor actual y llama a onNoteChange al tipear", async () => {
    const onNoteChange = vi.fn();
    renderWithTheme(<CartNoteInput note="" onNoteChange={onNoteChange} />);

    await userEvent.type(screen.getByRole("textbox", { name: "Nota" }), "x");

    expect(onNoteChange).toHaveBeenCalledWith("x");
  });
});
