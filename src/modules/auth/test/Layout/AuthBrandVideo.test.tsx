import { cleanup, render } from "@testing-library/react";
import { describe, it, beforeEach, expect, vi } from "vitest";
import "@testing-library/jest-dom";
import AuthBrandVideo from "../../layout/AuthBrandPanel/AuthBrandVideo";
import { getAuthBrandVideoUrl } from "../../helpers/getAuthBrandVideoUrl";

beforeEach(cleanup);

describe("AuthBrandVideo", () => {
  it("se reproduce automáticamente, sin sonido y sin controles", () => {
    render(<AuthBrandVideo onEnded={vi.fn()} onContextMenu={vi.fn()} />);

    const element = document.querySelector("video") as HTMLVideoElement;

    expect(element.tagName).toBe("VIDEO");
    expect(element).toHaveAttribute("src", getAuthBrandVideoUrl());
    expect(element).not.toHaveAttribute("controls");
    expect(element.muted).toBe(true);
    expect(element.autoplay).toBe(true);
    expect(element.tabIndex).toBe(-1);
  });

  it("no se puede pausar con click ni con el menú contextual", () => {
    const handleContextMenu = vi.fn();
    render(<AuthBrandVideo onEnded={vi.fn()} onContextMenu={handleContextMenu} />);

    const element = document.querySelector("video") as HTMLVideoElement;
    expect(element).toHaveStyle({ pointerEvents: "none" });
  });

  it("avisa cuando el video termina de reproducirse", () => {
    const handleEnded = vi.fn();
    render(<AuthBrandVideo onEnded={handleEnded} onContextMenu={vi.fn()} />);

    const element = document.querySelector("video") as HTMLVideoElement;
    element.dispatchEvent(new Event("ended"));

    expect(handleEnded).toHaveBeenCalled();
  });
});
