import { type ReactNode } from "react";
import SimpleSnackbar from "../../../shared/components/SnackBar/SnackBarComponent";
import AppLayout from "../../../shared/layout/AppLayout";
import ProductDialog from "../../components/ProductDialog/ProductDialog";
import ProductsExhibitor from "../../components/ProductList/ProductsExhibitorComponent";
import CatalogHeader from "./components/sellsBar/CatalogHeader";
import { useProductsListData } from "../../../../hooks/products/useProductListData";

const NewSellPage = (): ReactNode => {
  const { products } = useProductsListData();
    
  return (
      <AppLayout noCenter fullWidth>
          <CatalogHeader showFilters/>
          <ProductsExhibitor products={products} title={'Más vendido'} />
          <ProductDialog />
          <SimpleSnackbar  />
      </AppLayout>

  )

}

export default NewSellPage;