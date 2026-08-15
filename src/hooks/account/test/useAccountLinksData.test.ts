import { describe, it, expect } from "vitest";
import { renderHook } from "@testing-library/react";
import {
  useAccountEditLinkData,
  useAccountSubscriptionLinkData,
} from "../useAccountLinksData";

describe("useAccountEditLinkData", () => {
  it("devuelve el subtitle fijo de edición de cuenta", () => {
    const { result } = renderHook(() => useAccountEditLinkData());

    expect(result.current).toEqual({ subtitle: "Datos personales y contraseña" });
  });
});

describe("useAccountSubscriptionLinkData", () => {
  it("devuelve el plan actual y el subtitle de suscripción", () => {
    const { result } = renderHook(() => useAccountSubscriptionLinkData());

    expect(result.current).toEqual({
      value: "Free",
      subtitle: "Actualizá tu plan cuando quieras",
    });
  });
});
