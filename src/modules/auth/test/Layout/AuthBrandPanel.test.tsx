import { cleanup, screen } from "@testing-library/react";
import { describe, it, beforeEach, expect } from "vitest";
import "@testing-library/jest-dom";
import { renderWithTheme } from "../../../shared/test/utils/setupTests";
import AuthBrandPanel from "../../layout/AuthBrandPanel/AuthBrandPanel";

beforeEach(cleanup);

describe("AuthBrandPanel", () => {
  it("should render correctly", () => {
    renderWithTheme(<AuthBrandPanel tagline="Gestión de stock y ventas para tu kiosco" />);
  });

  it("should render the Stocko brand name", () => {
    renderWithTheme(<AuthBrandPanel tagline="Gestión de stock y ventas para tu kiosco" />);
    expect(screen.getByText("Stocko")).toBeInTheDocument();
  });

  it("should render the given tagline", () => {
    renderWithTheme(<AuthBrandPanel tagline="Creá tu cuenta y empezá a vender en minutos" />);
    expect(screen.getByText("Creá tu cuenta y empezá a vender en minutos")).toBeInTheDocument();
  });

  it("should render the logo image", () => {
    renderWithTheme(<AuthBrandPanel tagline="Gestión de stock y ventas para tu kiosco" />);
    const logo = screen.getByRole("presentation");
    expect(logo.tagName).toBe("IMG");
  });
});
