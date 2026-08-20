import { describe, it, expect, vi } from "vitest";
import { renderHook } from "@testing-library/react";
import { useScrollToSection } from "../useScrollToSection";

describe("useScrollToSection", () => {
  it("hace scroll al elemento cuando existe", () => {
    const element = document.createElement("div");
    element.id = "target-section";
    element.scrollIntoView = vi.fn();
    document.body.appendChild(element);

    const { result } = renderHook(() => useScrollToSection());
    result.current.scrollToSection("target-section");

    expect(element.scrollIntoView).toHaveBeenCalledWith({ behavior: "smooth", block: "start" });

    document.body.removeChild(element);
  });

  it("no falla cuando el elemento no existe", () => {
    const { result } = renderHook(() => useScrollToSection());
    expect(() => result.current.scrollToSection("missing-section")).not.toThrow();
  });
});
