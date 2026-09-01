import { describe, it, expect, vi } from "vitest";
import { screen } from "@testing-library/react";
import { MemoryRouter, Routes } from "react-router-dom";
import { renderWithTheme } from "../../shared/test/utils/setupTests";
import LandingRoutes from "../routes/LandingRoutes";

vi.mock("../pages/LandingPage/LandingPage", () => ({
  default: () => <div data-testid="landing-page" />,
}));

const renderAt = (path: string) =>
  renderWithTheme(
    <MemoryRouter initialEntries={[path]}>
      <Routes>{LandingRoutes()}</Routes>
    </MemoryRouter>
  );

describe("LandingRoutes", () => {
  it("renderiza LandingPage en /landing", () => {
    renderAt("/landing");

    expect(screen.getByTestId("landing-page")).toBeInTheDocument();
  });

  it("no renderiza LandingPage en la raíz", () => {
    renderAt("/");

    expect(screen.queryByTestId("landing-page")).not.toBeInTheDocument();
  });
});
