import { useTranslation } from "react-i18next";
import type { ReactNode } from "react";
import type { Product } from "@typings/product/productTypes";
import type { ProductExhibitorTableProps } from "@typings/cart/cartComponentTypes";
import DataTable from "../../../shared/components/DataTable/DataTable";


const ProductExhibitorTable = ({
  products,
  isLoading = false,
  columns,
}: ProductExhibitorTableProps): ReactNode => {
  const { t } = useTranslation();

  return (
    <DataTable<Product>
      rows={products}
      columns={columns}
      getRowId={(row) => row._id}
      loading={isLoading}
      emptyMessage={t("cart.productsExhibitor.table.emptyMessage")}
      height="35em"
    />
  );
};

export default ProductExhibitorTable;