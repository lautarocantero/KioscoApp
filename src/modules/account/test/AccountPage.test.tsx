import { describe, it, expect, vi } from "vitest";
import { screen } from "@testing-library/react";
import PersonIcon from "@mui/icons-material/Person";
import { renderWithTheme } from "../../shared/test/utils/setupTests";
import AccountPage from "../pages/AccountPage";
import DisplayOptions from "../../shared/components/OptionsItems/DisplayOptions";
import { useAccountLinks } from "../../../hooks/account/useLinksData";
import type { OptionLink } from "@typings/ui/layout.types";

vi.mock("../../../hooks/account/useLinksData");
vi.mock("../../shared/components/OptionsItems/DisplayOptions", () => ({
  default: vi.fn(() => <div data-testid="display-options" />),
}));

const mockedUseAccountLinks = vi.mocked(useAccountLinks);
const mockedDisplayOptions = vi.mocked(DisplayOptions);

const links: OptionLink[] = [
  { description: "Editar cuenta", icon: null, url: "/account-edit", subtitle: "" },
];

describe("AccountPage", () => {
  it("renderiza DisplayOptions con título 'Cuenta', el ícono de persona y los links del hook", () => {
    mockedUseAccountLinks.mockReturnValue(links);

    renderWithTheme(<AccountPage />);

    expect(screen.getByTestId("display-options")).toBeInTheDocument();

    const props = mockedDisplayOptions.mock.calls[0][0];
    expect(props.title).toBe("Cuenta");
    expect(props.links).toBe(links);
    expect((props.icon as React.ReactElement).type).toBe(PersonIcon);
  });
});
