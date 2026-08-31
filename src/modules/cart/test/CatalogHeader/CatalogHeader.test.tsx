import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import CatalogHeader from "../../components/CatalogHeader/CatalogHeader";

vi.mock("../../../shared/components/Cards/NoisyCard", () => ({
  default: ({ children }: { children: React.ReactNode }) => <div data-testid="noisy-card">{children}</div>,
}));

vi.mock("../../components/CatalogHeader/SellBarActions", () => ({
  default: () => <div data-testid="sell-bar-actions" />,
}));

vi.mock("../../components/CatalogHeader/SellPageHeader", () => ({
  default: () => <div data-testid="sell-page-header" />,
}));

vi.mock("@hooks/cart/useSellPageHeader", () => ({
  useSellPageHeader: () => ({ kioscoName: "", sellerName: "", dateLabel: "" }),
}));

describe("CatalogHeader", () => {
  it("renderiza NoisyCard con SellBarActions dentro", () => {
    render(<CatalogHeader />);
    expect(screen.getByTestId("noisy-card")).toBeInTheDocument();
    expect(screen.getByTestId("sell-bar-actions")).toBeInTheDocument();
  });
});