import { type ReactNode } from "react";
import DataTable from "../../../shared/components/DataTable/DataTable";
import type { Presentation } from "../../../../typings/presentation/presentationTypes";
import type { ProductDialogTableProps } from "@typings/sells/SellComponentTypes";
import useProductDialogSelector from "../../../../hooks/sells/useProductDialogSelector";
import ProductDialogTableTotal from "./ProductDialogTableTotal";

const ProductDialogTable = ({ products }: ProductDialogTableProps): ReactNode => {
  const {
    formatter,
    sessionTotal,
    addedItems,
    columns,
  } = useProductDialogSelector(products);

  return (
    <>
      <DataTable<Presentation>
        rows={products}
        columns={columns}
        getRowId={(row) => row._id}
        emptyMessage="No hay presentaciones"
        height="18em"
      />

      <ProductDialogTableTotal
        hasAddedItems={addedItems.length > 0}
        sessionTotal={sessionTotal}
        formatter={formatter}
      />
    </>
  );
};

export default ProductDialogTable;