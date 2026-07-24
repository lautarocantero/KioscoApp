import type { ReactNode } from "react";
import { CellCenter } from "../../../shared/components/DataTable/CellCenter";
import ProductItemButton from "../ProductItem/ProductItemButton";
import { useProductItem } from "../../../../hooks/sells/useProductItem";
import type { ProductRowActionCellProps } from "@typings/sells/SellComponentTypes";


const ProductRowActionCell = ({ product }: ProductRowActionCellProps): ReactNode => {
  const { handleSelect } = useProductItem(product);

  return (
    <CellCenter>
      <ProductItemButton onClick={handleSelect} />
    </CellCenter>
  );
};

export default ProductRowActionCell;