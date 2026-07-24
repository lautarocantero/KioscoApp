import { type ReactNode } from "react";
import SimpleSnackbar from "../../../shared/components/SnackBar/SnackBarComponent";
import AppLayout from "../../../shared/layout/AppLayout";
import ProductDialog from "../../components/ProductDialog/ProductDialog";
import ProductsExhibitor from "../../components/ProductsExhibitorList/ProductsExhibitorComponent";
import CatalogHeader from "./components/CatalogHeader/CatalogHeader";

const NewSellPage = (): ReactNode => {
    
  return (
      <AppLayout noCenter fullWidth>
          <CatalogHeader />
          <ProductsExhibitor />
          <ProductDialog />
          <SimpleSnackbar  />
      </AppLayout>

  )

}

export default NewSellPage;