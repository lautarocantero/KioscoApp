import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { ViewMode } from "@typings/cart/cartEnums";
import { useSortByCatalog } from "@hooks/cart/useSortByCatalogHeader";
import SortByCatalog from "../../components/ProductsExhibitorList/SortByCatalog";

vi.mock("@hooks/cart/useSortByCatalogHeader");

const mockedHook = vi.mocked(useSortByCatalog);
const options = [
  { value: "name_asc", label: "Nombre A-Z" },
  { value: "price_desc", label: "Precio: mayor a menor" },
];

describe("SortByCatalog", () => {
  const handleSelect = vi.fn();
  const onOpenMenu = vi.fn();
  const onCloseMenu = vi.fn();

  beforeEach(() => {
    handleSelect.mockClear();
    onOpenMenu.mockClear();
    mockedHook.mockReturnValue({
      anchorEl: null,
      isMenuOpen: false,
      onOpenMenu,
      onCloseMenu,
      handleSelect,
      selectedLabel: undefined,
      options,
    });
  });

  it("es visible cuando viewMode es Grid", () => {
    const { container } = render(<SortByCatalog viewMode={ViewMode.Grid} />);
    expect(container.firstChild).toHaveStyle({ visibility: "visible" });
  });

  it("está oculto cuando viewMode es List", () => {
    const { container } = render(<SortByCatalog viewMode={ViewMode.List} />);
    expect(container.firstChild).toHaveStyle({ visibility: "hidden" });
  });

  it("muestra 'Nombre A-Z' por defecto cuando no hay selectedLabel", () => {
    render(<SortByCatalog viewMode={ViewMode.Grid} />);
    expect(screen.getByText("Nombre A-Z", { exact: false })).toBeInTheDocument();
  });

  it("llama a onOpenMenu al hacer click en el selector", async () => {
    render(<SortByCatalog viewMode={ViewMode.Grid} />);
    await userEvent.click(screen.getByText("Ordenar por:", { exact: false }));
    expect(onOpenMenu).toHaveBeenCalledTimes(1);
  });

  it("llama a handleSelect con el value elegido", async () => {
    mockedHook.mockReturnValue({
      anchorEl: document.body,
      isMenuOpen: true,
      onOpenMenu,
      onCloseMenu,
      handleSelect,
      selectedLabel: undefined,
      options,
    });
    render(<SortByCatalog viewMode={ViewMode.Grid} />);
    await userEvent.click(screen.getByText("Precio: mayor a menor"));
    expect(handleSelect).toHaveBeenCalledWith("price_desc");
  });
});