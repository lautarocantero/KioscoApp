import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { renderHook, act } from "@testing-library/react";
import { useCartClearAnimation } from "../useCartClearAnimation";
import { CartBagAnimationPhase } from "@typings/cart/cartEnums";

describe("useCartClearAnimation", () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it("arranca en reposo, con la mano oculta y la bolsa quieta", () => {
    const { result } = renderHook(() => useCartClearAnimation());

    expect(result.current.phase).toBe(CartBagAnimationPhase.Idle);
    expect(result.current.bagStyle).toEqual({ transform: "none", opacity: 1, transitionDuration: "0s" });
    expect(result.current.handStyle.opacity).toBe(0);
    expect(result.current.handlesStyle.transform).toBe("none");
  });

  it("agarra, levanta la bolsa fuera de cuadro recién ahí vacía, y vuelve a caer vacía", () => {
    const onCleared = vi.fn();
    const { result } = renderHook(() => useCartClearAnimation());

    act(() => result.current.runBagAnimation(onCleared));

    expect(result.current.phase).toBe(CartBagAnimationPhase.Grab);
    expect(result.current.handStyle.opacity).toBe(1);
    expect(result.current.handlesStyle.transform).not.toBe("none");
    expect(onCleared).not.toHaveBeenCalled();

    act(() => {
      vi.advanceTimersByTime(380);
    });

    expect(result.current.phase).toBe(CartBagAnimationPhase.Lift);
    expect(result.current.bagStyle.opacity).toBe(0.25);
    expect(onCleared).not.toHaveBeenCalled();

    act(() => {
      vi.advanceTimersByTime(520);
    });

    expect(onCleared).toHaveBeenCalledTimes(1);
    expect(result.current.phase).toBe(CartBagAnimationPhase.Back);
    expect(result.current.bagStyle.opacity).toBe(0);
    expect(result.current.bagStyle.transitionDuration).toBe("0s");

    act(() => {
      vi.advanceTimersByTime(20);
    });

    expect(result.current.bagStyle).toEqual({ transform: "none", opacity: 1, transitionDuration: "500ms" });

    act(() => {
      vi.advanceTimersByTime(500);
    });

    expect(result.current.phase).toBe(CartBagAnimationPhase.Idle);
    expect(result.current.handStyle.opacity).toBe(0);
  });

  it("ignora un segundo trigger mientras la animación está en curso", () => {
    const onCleared = vi.fn();
    const { result } = renderHook(() => useCartClearAnimation());

    act(() => result.current.runBagAnimation(onCleared));
    act(() => result.current.runBagAnimation(onCleared));

    act(() => {
      vi.advanceTimersByTime(380 + 520);
    });

    expect(onCleared).toHaveBeenCalledTimes(1);
  });
});
