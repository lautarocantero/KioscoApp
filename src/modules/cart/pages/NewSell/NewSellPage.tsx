import { type ReactNode } from "react";
import AppLayout from "../../../shared/layout/AppLayout";
import CartComponent from "../../components/CartComponent/CartComponent";
import ProductDialog from "../../components/ProductDialog/ProductDialog";
import CatalogHeader from "../../components/CatalogHeader/CatalogHeader";
import ProductsExhibitorComponent from "../../components/ProductsExhibitorList/ProductsExhibitorComponent";

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