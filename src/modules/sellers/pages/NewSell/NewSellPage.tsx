import { type ReactNode } from "react";
import AppLayout from "../../../shared/layout/AppLayout";
import CatalogHeader from "../../../sellers/components/CatalogHeader/CatalogHeader";
import ProductsExhibitorComponent from "../../../sellers/components/ProductsExhibitorList/ProductsExhibitorComponent";
import ProductDialog from "../../../sellers/components/ProductDialog/ProductDialog";
import CartComponent from "../../components/Cart/CartComponent";

const NewSellPage = (): ReactNode => {
    
    
  return (
      <AppLayout noCenter fullWidth>
            <CatalogHeader />
            <ProductsExhibitorComponent />
            <CartComponent />
            <ProductDialog />
      </AppLayout>

  )

}

export default NewSellPage;