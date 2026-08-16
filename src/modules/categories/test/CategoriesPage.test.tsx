import { describe, it, expect, vi } from "vitest";
import { screen } from "@testing-library/react";
import BookmarksIcon from "@mui/icons-material/Bookmarks";
import { renderWithTheme } from "../../shared/test/utils/setupTests";
import CategoriesPage from "../pages/CategoriesPage";
import DisplayOptions from "../../shared/components/OptionsItems/DisplayOptions";
import { useCategoriesLinks } from "../../../hooks/categories/useLinksData";
import type { OptionLink } from "@typings/ui/layout.types";

vi.mock("../../../hooks/categories/useLinksData");
vi.mock("../../shared/components/OptionsItems/DisplayOptions", () => ({
  default: vi.fn(() => <div data-testid="display-options" />),
}));

const mockedUseCategoriesLinks = vi.mocked(useCategoriesLinks);
const mockedDisplayOptions = vi.mocked(DisplayOptions);

const links: OptionLink[] = [
  { description: "Ver Categorías", icon: null, url: "/categories-list", subtitle: "" },
];

describe("CategoriesPage", () => {
  it("renderiza DisplayOptions con título 'Categorías', el ícono de bookmarks y los links del hook", () => {
    mockedUseCategoriesLinks.mockReturnValue(links);

    renderWithTheme(<CategoriesPage />);

    expect(screen.getByTestId("display-options")).toBeInTheDocument();

    const props = mockedDisplayOptions.mock.calls[0][0];
    expect(props.title).toBe("Categorías");
    expect(props.links).toBe(links);
    expect((props.icon as React.ReactElement).type).toBe(BookmarksIcon);
  });
});
