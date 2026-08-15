import { describe, it, expect } from "vitest";
import { screen } from "@testing-library/react";
import { renderWithTheme } from "../../shared/test/utils/setupTests";
import AccountSubscriptionPage from "../pages/AccountSubscriptionPage";

describe("AccountSubscriptionPage", () => {
  it("renderiza el texto placeholder de la página en construcción", () => {
    renderWithTheme(<AccountSubscriptionPage />);

    expect(screen.getByText("AccountSubscriptionPage")).toBeInTheDocument();
  });
});
