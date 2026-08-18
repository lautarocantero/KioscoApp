import { type ReactNode } from "react";
import { useTranslation } from "react-i18next";
import ProductDialogTableTotal from "./ProductDialogTableTotal";
import type { Presentation } from "@typings/presentation/presentationTypes";
import type { ProductDialogTableProps } from "@typings/cart/cartComponentTypes";
import useProductDialogSelector from "@hooks/cart/useProductDialogSelector";
import DataTable from "../../../shared/components/DataTable/DataTable";


const ProductDialogTable = ({ products, product }: ProductDialogTableProps): ReactNode => {
  const { t } = useTranslation();
  const {
    formatter,
    sessionTotal,
    addedItems,
    columns,
  } = useProductDialogSelector(products, product);

  return (
    <>
      <DataTable<Presentation>
        rows={products}
        columns={columns}
        getRowId={(row) => row._id}
        emptyMessage={t("cart.productDialog.table.emptyMessage")}
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