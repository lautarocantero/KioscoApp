import type { ReactNode } from "react";
import ProductItemButton from "../ProductItem/ProductItemButton";
import type { ProductRowActionCellProps } from "@typings/sells/SellComponentTypes";
import { CellCenter } from "../../../../shared/components/DataTable/CellCenter";
import { useProductItem } from "../../../../../hooks/sellers/useProductItem";


const ProductRowActionCell = ({ product }: ProductRowActionCellProps): ReactNode => {
  const { handleSelect } = useProductItem(product);

  return (
    <CellCenter>
      <ProductItemButton onClick={handleSelect} />
    </CellCenter>
  );
};

export default ProductRowActionCell;