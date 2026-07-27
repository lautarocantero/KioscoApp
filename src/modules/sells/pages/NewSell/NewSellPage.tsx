import { type ReactNode } from "react";
import SimpleSnackbar from "../../../shared/components/SnackBar/SnackBarComponent";
import AppLayout from "../../../shared/layout/AppLayout";
import CatalogHeader from "../../../sellers/api/components/CatalogHeader/CatalogHeader";
import ProductsExhibitorComponent from "../../../sellers/api/components/ProductsExhibitorList/ProductsExhibitorComponent";
import ProductDialog from "../../../sellers/api/components/ProductDialog/ProductDialog";

const NewSellPage = (): ReactNode => {
    
  return (
      <AppLayout noCenter fullWidth>
          <CatalogHeader />
          <ProductsExhibitorComponent />
          <ProductDialog />
          <SimpleSnackbar  />
      </AppLayout>

  )

}

export default NewSellPage;