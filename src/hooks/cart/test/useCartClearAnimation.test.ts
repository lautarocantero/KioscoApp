import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { renderHook, act } from "@testing-library/react";
import { useCartClearAnimation } from "../useCartClearAnimation";

describe("useCartClearAnimation", () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it("arranca en reposo, sin transform ni transición", () => {
    const onClear = vi.fn();
    const { result } = renderHook(() => useCartClearAnimation(onClear));

    expect(result.current.bagStyle).toEqual({
      transform: "translateX(0px)",
      opacity: 1,
      transitionDuration: "0s",
    });
  });

  it("desliza la bolsa afuera, vacía el carrito real a mitad de camino, y la trae de vuelta vacía", () => {
    const onClear = vi.fn();
    const { result } = renderHook(() => useCartClearAnimation(onClear));

    act(() => result.current.triggerClear());

    expect(result.current.bagStyle.opacity).toBe(0);
    expect(result.current.bagStyle.transform).toBe("translateX(480px)");
    expect(onClear).not.toHaveBeenCalled();

    act(() => {
      vi.advanceTimersByTime(340);
    });

    expect(onClear).toHaveBeenCalledTimes(1);
    expect(result.current.bagStyle.opacity).toBe(1);
    expect(result.current.bagStyle.transform).toBe("translateX(0px)");

    act(() => {
      vi.advanceTimersByTime(420);
    });

    expect(result.current.bagStyle.transitionDuration).toBe("0s");
  });

  it("ignora un segundo trigger mientras la animación está en curso", () => {
    const onClear = vi.fn();
    const { result } = renderHook(() => useCartClearAnimation(onClear));

    act(() => result.current.triggerClear());
    act(() => result.current.triggerClear());

    act(() => {
      vi.advanceTimersByTime(340);
    });

    expect(onClear).toHaveBeenCalledTimes(1);
  });
});
