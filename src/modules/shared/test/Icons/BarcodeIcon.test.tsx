import { describe, it, expect } from "vitest";
import { render } from "@testing-library/react";
import BarcodeIcon from "../../components/Icons/BarcodeIcon";

describe("BarcodeIcon", () => {
  it("renderiza un ícono svg", () => {
    const { container } = render(<BarcodeIcon />);
    expect(container.querySelector("svg")).toBeInTheDocument();
  });
});
