import { describe, it, expect, vi } from "vitest";
import { render, screen, act } from "@testing-library/react";
import { useHorizontalScrollArrows } from "../useHorizontalScrollArrows";

const TestComponent = ({ itemCount }: { itemCount: number }) => {
  const { scrollRef, canScrollLeft, canScrollRight, scrollLeft, scrollRight } = useHorizontalScrollArrows(itemCount);

  return (
    <div>
      <div data-testid="scroller" ref={scrollRef} />
      <span data-testid="state">{JSON.stringify({ canScrollLeft, canScrollRight })}</span>
      <button onClick={scrollLeft}>left</button>
      <button onClick={scrollRight}>right</button>
    </div>
  );
};

const mockScrollableDiv = (el: HTMLElement, overrides: Partial<{ scrollLeft: number; scrollWidth: number; clientWidth: number }> = {}) => {
  Object.defineProperty(el, "scrollWidth", { value: overrides.scrollWidth ?? 400, configurable: true });
  Object.defineProperty(el, "clientWidth", { value: overrides.clientWidth ?? 200, configurable: true });
  Object.defineProperty(el, "scrollLeft", { value: overrides.scrollLeft ?? 0, writable: true, configurable: true });
  el.scrollBy = vi.fn();
};

describe("useHorizontalScrollArrows", () => {
  it("detecta que se puede scrollear a la derecha cuando el contenido excede el ancho visible", () => {
    render(<TestComponent itemCount={3} />);
    const el = screen.getByTestId("scroller");
    mockScrollableDiv(el);

    act(() => {
      el.dispatchEvent(new Event("scroll"));
    });

    expect(screen.getByTestId("state")).toHaveTextContent(JSON.stringify({ canScrollLeft: false, canScrollRight: true }));
  });

  it("detecta que se puede scrollear a la izquierda cuando ya no está en el borde inicial", () => {
    render(<TestComponent itemCount={3} />);
    const el = screen.getByTestId("scroller");
    mockScrollableDiv(el, { scrollLeft: 50 });

    act(() => {
      el.dispatchEvent(new Event("scroll"));
    });

    expect(screen.getByTestId("state")).toHaveTextContent(JSON.stringify({ canScrollLeft: true, canScrollRight: true }));
  });

  it("scrollLeft/scrollRight llaman a scrollBy con el delta correspondiente", () => {
    render(<TestComponent itemCount={3} />);
    const el = screen.getByTestId("scroller");
    mockScrollableDiv(el);

    screen.getByText("right").click();
    expect(el.scrollBy).toHaveBeenCalledWith({ left: 160, behavior: "smooth" });

    screen.getByText("left").click();
    expect(el.scrollBy).toHaveBeenCalledWith({ left: -160, behavior: "smooth" });
  });

  it("convierte la rueda vertical del mouse en scroll horizontal cuando hay overflow", () => {
    render(<TestComponent itemCount={3} />);
    const el = screen.getByTestId("scroller");
    mockScrollableDiv(el);

    const wheelEvent = new WheelEvent("wheel", { deltaY: 50, deltaX: 0, cancelable: true });
    act(() => {
      el.dispatchEvent(wheelEvent);
    });

    expect(el.scrollLeft).toBe(50);
    expect(wheelEvent.defaultPrevented).toBe(true);
  });

  it("no intercepta la rueda cuando no hay overflow horizontal", () => {
    render(<TestComponent itemCount={3} />);
    const el = screen.getByTestId("scroller");
    mockScrollableDiv(el, { scrollWidth: 200, clientWidth: 200 });

    const wheelEvent = new WheelEvent("wheel", { deltaY: 50, deltaX: 0, cancelable: true });
    act(() => {
      el.dispatchEvent(wheelEvent);
    });

    expect(wheelEvent.defaultPrevented).toBe(false);
  });
});
