import { describe, it, expect, vi } from "vitest";
import { renderHook } from "@testing-library/react";
import { useAccountLinks } from "../useLinksData";
import {
  useAccountEditLinkData,
  useAccountSubscriptionLinkData,
} from "../useAccountLinksData";

vi.mock("../useAccountLinksData");
vi.mock("../../../config/Links", () => ({
  AccountNavLinks: [
    { description: "Editar cuenta", icon: null, url: "/account-edit", subtitle: "" },
    { description: "Plan de suscripción", icon: null, url: "/account-subscription", subtitle: "" },
  ],
}));

const mockedUseAccountEditLinkData = vi.mocked(useAccountEditLinkData);
const mockedUseAccountSubscriptionLinkData = vi.mocked(useAccountSubscriptionLinkData);

describe("useAccountLinks", () => {
  it("devuelve un link por cada entrada de AccountNavLinks", () => {
    const { result } = renderHook(() => useAccountLinks());

    expect(result.current.map((link) => link.url)).toEqual([
      "/account-edit",
      "/account-subscription",
    ]);
  });

  it("asocia useAccountEditLinkData al link de /account-edit", () => {
    const { result } = renderHook(() => useAccountLinks());

    const editLink = result.current.find((link) => link.url === "/account-edit");

    expect(editLink?.useData).toBe(mockedUseAccountEditLinkData);
  });

  it("asocia useAccountSubscriptionLinkData al link de /account-subscription", () => {
    const { result } = renderHook(() => useAccountLinks());

    const subscriptionLink = result.current.find((link) => link.url === "/account-subscription");

    expect(subscriptionLink?.useData).toBe(mockedUseAccountSubscriptionLinkData);
  });

  it("preserva el resto de los campos del link original", () => {
    const { result } = renderHook(() => useAccountLinks());

    expect(result.current[0]).toMatchObject({
      description: "Editar cuenta",
      url: "/account-edit",
      subtitle: "",
    });
  });
});
