import { describe, it, expect, vi } from "vitest";
import { render } from "@testing-library/react";
import SellbarFilter from "../../components/CatalogHeader/SellBarFilter";
import FormSelector from "../../../shared/components/FormSelector/FormSelector";

vi.mock("../../../shared/components/FormSelector/FormSelector", () => ({
  default: vi.fn(() => <div data-testid="form-selector" />),
}));

describe("SellbarFilter", () => {
  it("pasa las props correctas a FormSelector", () => {
    const onSelect = vi.fn();
    const getLabel = vi.fn();
    const categories = {
      list: [{ id: "1" }],
      selected: null,
      selectedLabel: null,
      getLabel,
      onSelect,
      isLoading: false,
      anchorEl: null,
      isMenuOpen: false,
      onOpenMenu: vi.fn(),
      onCloseMenu: vi.fn(),
    } as any;

    render(<SellbarFilter categories={categories} />);

    const receivedProps = vi.mocked(FormSelector).mock.calls[0][0];

    expect(receivedProps).toEqual(
      expect.objectContaining({
        mode: "single",
        id: "sellbar-category",
        catalogFilter: true,
        label: "Categoría",
        categories: categories.list,
        getLabel,
        value: categories.selected,
        onChange: onSelect,
        allowClear: true,
        clearLabel: "Todas",
      })
    );
  });
});