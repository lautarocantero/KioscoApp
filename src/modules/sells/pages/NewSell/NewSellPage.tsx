import { type ReactNode } from "react";
import SimpleSnackbar from "../../../shared/components/SnackBar/SnackBarComponent";
import AppLayout from "../../../shared/layout/AppLayout";
import ProductDialog from "../../components/ProductDialog/ProductDialog";
import ProductsExhibitor from "../../components/ProductList/ProductsExhibitorComponent";
import CatalogHeader from "./components/sellsBar/CatalogHeader";

const NewSellPage = (): ReactNode => {
  
    
  return (
      <AppLayout noCenter fullWidth>
          <CatalogHeader />
          <ProductsExhibitor title={'Más vendido'} />
          <ProductDialog />
          <SimpleSnackbar  />
      </AppLayout>

  )

}

export default NewSellPage;