import { describe, it, expect, vi, afterEach } from "vitest";
import { render, screen, act } from "@testing-library/react";
import { useScrollInAnimation } from "../useScrollInAnimation";

type IntersectionCallback = (entries: Pick<IntersectionObserverEntry, "isIntersecting">[]) => void;

const TestComponent = (): React.ReactNode => {
  const { ref, hasEntered } = useScrollInAnimation<HTMLDivElement>();
  return (
    <div ref={ref} data-testid="target">
      {hasEntered ? "entered" : "not-entered"}
    </div>
  );
};

describe("useScrollInAnimation", () => {
  afterEach(() => {
    vi.unstubAllGlobals();
  });

  it("arranca con hasEntered en false y observa el nodo montado", () => {
    const observe = vi.fn();
    vi.stubGlobal(
      "IntersectionObserver",
      vi.fn().mockImplementation(() => ({ observe, unobserve: vi.fn(), disconnect: vi.fn(), takeRecords: vi.fn() }))
    );

    render(<TestComponent />);

    expect(screen.getByTestId("target")).toHaveTextContent("not-entered");
    expect(observe).toHaveBeenCalledWith(screen.getByTestId("target"));
  });

  it("pasa a hasEntered=true cuando el observer reporta intersección", () => {
    let triggerIntersection: IntersectionCallback | undefined;
    const disconnect = vi.fn();
    vi.stubGlobal(
      "IntersectionObserver",
      vi.fn().mockImplementation((callback: IntersectionCallback) => {
        triggerIntersection = callback;
        return { observe: vi.fn(), unobserve: vi.fn(), disconnect, takeRecords: vi.fn() };
      })
    );

    render(<TestComponent />);
    act(() => triggerIntersection?.([{ isIntersecting: true }]));

    expect(screen.getByTestId("target")).toHaveTextContent("entered");
    expect(disconnect).toHaveBeenCalled();
  });
});
