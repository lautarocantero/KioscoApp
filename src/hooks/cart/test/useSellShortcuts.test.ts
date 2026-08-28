import { describe, it, expect, vi, afterEach } from "vitest";
import { renderHook } from "@testing-library/react";
import { useSellShortcuts } from "../useSellShortcuts";
import { SELL_SEARCH_INPUT_ID, SELL_BARCODE_TOGGLE_ID, CART_GENERATE_TICKET_BUTTON_ID } from "../../../config/constants";

const fireKeyDown = (key: string) => {
  const event = new KeyboardEvent("keydown", { key, bubbles: true, cancelable: true });
  document.dispatchEvent(event);
  return event;
};

describe("useSellShortcuts", () => {
  afterEach(() => {
    document.body.innerHTML = "";
  });

  it("enfoca el input de búsqueda con '/'", () => {
    const input = document.createElement("input");
    input.id = SELL_SEARCH_INPUT_ID;
    document.body.appendChild(input);
    const focusSpy = vi.spyOn(input, "focus");

    renderHook(() => useSellShortcuts());
    fireKeyDown("/");

    expect(focusSpy).toHaveBeenCalled();
  });

  it("no roba el foco de '/' si ya se está escribiendo en otro input", () => {
    const otherInput = document.createElement("input");
    document.body.appendChild(otherInput);
    otherInput.focus();

    const searchInput = document.createElement("input");
    searchInput.id = SELL_SEARCH_INPUT_ID;
    document.body.appendChild(searchInput);
    const focusSpy = vi.spyOn(searchInput, "focus");

    renderHook(() => useSellShortcuts());
    fireKeyDown("/");

    expect(focusSpy).not.toHaveBeenCalled();
  });

  it("clickea el toggle de código de barras con F2", () => {
    const toggle = document.createElement("div");
    toggle.id = SELL_BARCODE_TOGGLE_ID;
    document.body.appendChild(toggle);
    const clickSpy = vi.spyOn(toggle, "click");

    renderHook(() => useSellShortcuts());
    fireKeyDown("F2");

    expect(clickSpy).toHaveBeenCalled();
  });

  it("clickea el botón de generar ticket con F9", () => {
    const button = document.createElement("button");
    button.id = CART_GENERATE_TICKET_BUTTON_ID;
    document.body.appendChild(button);
    const clickSpy = vi.spyOn(button, "click");

    renderHook(() => useSellShortcuts());
    fireKeyDown("F9");

    expect(clickSpy).toHaveBeenCalled();
  });

  it("remueve el listener al desmontar", () => {
    const removeSpy = vi.spyOn(document, "removeEventListener");
    const { unmount } = renderHook(() => useSellShortcuts());
    unmount();
    expect(removeSpy).toHaveBeenCalledWith("keydown", expect.any(Function));
  });
});
