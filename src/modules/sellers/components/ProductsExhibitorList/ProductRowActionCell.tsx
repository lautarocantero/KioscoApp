import type { ReactNode } from "react";
import ProductItemButton from "../ProductItem/ProductItemButton";
import { CellCenter } from "../../../shared/components/DataTable/CellCenter";
import { useProductItem } from "../../../../hooks/sellers/useProductItem";
import type { ProductRowActionCellProps } from "@typings/seller/sellerComponentTypes";


const ProductRowActionCell = ({ product }: ProductRowActionCellProps): ReactNode => {
  const { handleSelect } = useProductItem(product);

  return (
    <CellCenter>
      <ProductItemButton onClick={handleSelect} />
    </CellCenter>
  );
};

export default ProductRowActionCell;