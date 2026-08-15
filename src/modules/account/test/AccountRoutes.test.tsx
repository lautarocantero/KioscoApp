import { describe, it, expect, vi } from "vitest";
import { screen } from "@testing-library/react";
import { MemoryRouter, Routes } from "react-router-dom";
import { renderWithTheme } from "../../shared/test/utils/setupTests";
import AccountRoutes from "../AccountRoutes";

vi.mock("../pages/AccountPage", () => ({
  default: () => <div data-testid="account-page" />,
}));
vi.mock("../pages/AccountEditPage", () => ({
  default: () => <div data-testid="account-edit-page" />,
}));
vi.mock("../pages/AccountSubscriptionPage", () => ({
  default: () => <div data-testid="account-subscription-page" />,
}));

const renderAt = (path: string) =>
  renderWithTheme(
    <MemoryRouter initialEntries={[path]}>
      <Routes>{AccountRoutes()}</Routes>
    </MemoryRouter>
  );

describe("AccountRoutes", () => {
  it("renderiza AccountPage en /account", () => {
    renderAt("/account");

    expect(screen.getByTestId("account-page")).toBeInTheDocument();
  });

  it("renderiza AccountEditPage en /account-edit", () => {
    renderAt("/account-edit");

    expect(screen.getByTestId("account-edit-page")).toBeInTheDocument();
  });

  it("renderiza AccountSubscriptionPage en /account-subscription", () => {
    renderAt("/account-subscription");

    expect(screen.getByTestId("account-subscription-page")).toBeInTheDocument();
  });
});
