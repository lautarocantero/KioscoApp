import type { ReactNode } from "react";
import DataTable from "../../../shared/components/DataTable/DataTable";
import type { Product } from "../../../../typings/product/productTypes";
import type { ProductExhibitorTableProps } from "@typings/sells/SellComponentTypes";


const ProductExhibitorTable = ({
  products,
  isLoading = false,
  columns,
}: ProductExhibitorTableProps): ReactNode => {
  
  return (
    <DataTable<Product>
      rows={products}
      columns={columns}
      getRowId={(row) => row._id}
      loading={isLoading}
      emptyMessage="No hay productos"
      height="35em"
    />
  );
};

export default ProductExhibitorTable;