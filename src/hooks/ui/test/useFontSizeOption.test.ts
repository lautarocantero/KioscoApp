import { describe, it, expect, beforeEach } from "vitest";
import { renderHook, act } from "@testing-library/react";
import { FontSizeProvider } from "../../../theme/FontSizeProvider";
import { useFontSizeOption } from "../useFontSizeOption";
import { FONT_SIZE_DEFAULT } from "../../../config/constants";

describe("useFontSizeOption", () => {
  beforeEach(() => {
    localStorage.clear();
    document.documentElement.style.fontSize = "";
  });

  it("expone el tamaño por defecto y lo aplica al <html> al cambiarlo, persistiéndolo", () => {
    const { result } = renderHook(() => useFontSizeOption(), { wrapper: FontSizeProvider });

    expect(result.current.fontSize).toBe(FONT_SIZE_DEFAULT);

    act(() => result.current.setFontSize(20));

    expect(result.current.fontSize).toBe(20);
    expect(document.documentElement.style.fontSize).toBe("20px");
    expect(localStorage.getItem("appFontSize")).toBe("20");
  });
});
