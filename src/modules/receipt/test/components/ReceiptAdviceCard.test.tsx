import { describe, it, expect } from "vitest";
import { renderWithTheme } from "../../../shared/test/utils/setupTests";
import { screen } from "@testing-library/react";
import ReceiptAdviceCard from "../../pages/ReceiptPage/components/ReceiptAdviceCard";

describe("ReceiptAdviceCard", () => {
  it("muestra el título y cada consejo recibido", () => {
    const adviceItems = ["Usá la plantilla", "Comprobá los códigos de barra"];

    renderWithTheme(<ReceiptAdviceCard adviceItems={adviceItems} />);

    expect(screen.getByText("Consejos")).toBeInTheDocument();
    expect(screen.getByText("Usá la plantilla")).toBeInTheDocument();
    expect(screen.getByText("Comprobá los códigos de barra")).toBeInTheDocument();
  });
});
