import type { ReactNode } from "react";
import type { ProductRowActionCellProps } from "@typings/seller/sellerComponentTypes";
import { useProductItem } from "@hooks/cart/useProductItem";
import { CellCenter } from "../../../shared/components/DataTable/CellCenter";
import ProductItemButton from "../ProductItem/ProductItemButton";


const ProductRowActionCell = ({ product }: ProductRowActionCellProps): ReactNode => {
  const { handleSelect } = useProductItem(product);

  return (
    <CellCenter>
      <ProductItemButton onClick={handleSelect} />
    </CellCenter>
  );
};

export default ProductRowActionCell;