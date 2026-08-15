import { describe, it, expect, vi } from "vitest";
import { screen } from "@testing-library/react";
import { renderWithTheme } from "../../shared/test/utils/setupTests";
import HomePage from "../Home/HomePage";
import DisplayOptions from "../../shared/components/OptionsItems/DisplayOptions";
import { useHomePageLinks } from "../../../hooks/shared/useLinksData";
import type { OptionLink } from "@typings/ui/layout.types";

vi.mock("../../../hooks/shared/useLinksData");
vi.mock("../../shared/components/OptionsItems/DisplayOptions", () => ({
  default: vi.fn(() => <div data-testid="display-options" />),
}));

const mockedUseHomePageLinks = vi.mocked(useHomePageLinks);
const mockedDisplayOptions = vi.mocked(DisplayOptions);

const links: OptionLink[] = [
  { description: "Vender", icon: null, url: "/sell", subtitle: "" },
];

describe("HomePage", () => {
  it("renderiza DisplayOptions con el título, saludo y los links del hook", () => {
    mockedUseHomePageLinks.mockReturnValue(links);

    renderWithTheme(<HomePage />);

    expect(screen.getByTestId("display-options")).toBeInTheDocument();

    const props = mockedDisplayOptions.mock.calls[0][0];
    expect(props.title).toBe("¿Qué deseas hacer?");
    expect(props.links).toBe(links);
    expect(props.disconnect).toBe(true);
    expect(props.greetings).toBe("¡Hola! 👋");
  });
});
