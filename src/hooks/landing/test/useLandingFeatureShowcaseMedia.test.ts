import { describe, it, expect } from "vitest";
import { renderHook, act } from "@testing-library/react";
import { useLandingFeatureShowcaseMedia } from "../useLandingFeatureShowcaseMedia";

describe("useLandingFeatureShowcaseMedia", () => {
  it("arranca con hasVideoEnded en false y lo pasa a true al terminar el video", () => {
    const { result } = renderHook(() => useLandingFeatureShowcaseMedia());

    expect(result.current.hasVideoEnded).toBe(false);

    act(() => result.current.handleVideoEnded());

    expect(result.current.hasVideoEnded).toBe(true);
  });
});
