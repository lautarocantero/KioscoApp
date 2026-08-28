import { describe, it, expect, vi } from "vitest";
import { screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { renderWithTheme } from "../../../shared/test/utils/setupTests";
import CategoryChipsRow from "../../components/ProductsExhibitorList/CategoryChipsRow";
import { useSellbarCategories } from "@hooks/cart/useSellbarCategories";
import { PresentationCategory } from "@typings/presentation/presentationEnum";

vi.mock("@hooks/cart/useSellbarCategories");

const mockedUseSellbarCategories = vi.mocked(useSellbarCategories);

describe("CategoryChipsRow", () => {
  it("no renderiza nada si no hay categorías disponibles", () => {
    mockedUseSellbarCategories.mockReturnValue({
      list: [],
      isLoading: false,
      selected: null,
      selectedLabel: null,
      getLabel: vi.fn(),
      anchorEl: null,
      isMenuOpen: false,
      onOpenMenu: vi.fn(),
      onCloseMenu: vi.fn(),
      onSelect: vi.fn(),
    });

    const { container } = renderWithTheme(<CategoryChipsRow />);
    expect(container).toBeEmptyDOMElement();
  });

  it("renderiza la chip 'Todas' + una por categoría, y despacha onSelect al clickear", async () => {
    const onSelect = vi.fn();
    mockedUseSellbarCategories.mockReturnValue({
      list: [PresentationCategory.Dairy, PresentationCategory.Bakery],
      isLoading: false,
      selected: PresentationCategory.Dairy,
      selectedLabel: "Lácteos",
      getLabel: (c) => c,
      anchorEl: null,
      isMenuOpen: false,
      onOpenMenu: vi.fn(),
      onCloseMenu: vi.fn(),
      onSelect,
    });

    renderWithTheme(<CategoryChipsRow />);

    expect(screen.getByText("Todas")).toBeInTheDocument();
    expect(screen.getByText(PresentationCategory.Dairy)).toBeInTheDocument();
    expect(screen.getByText(PresentationCategory.Bakery)).toBeInTheDocument();

    await userEvent.click(screen.getByText("Todas"));
    expect(onSelect).toHaveBeenCalledWith(null);

    await userEvent.click(screen.getByText(PresentationCategory.Bakery));
    expect(onSelect).toHaveBeenCalledWith(PresentationCategory.Bakery);
  });
});
