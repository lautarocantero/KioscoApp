import { type ReactNode } from "react";
import { Box } from "@mui/material";
import AppLayout from "../../../shared/layout/AppLayout";
import CartComponent from "../../components/CartComponent/CartComponent";
import ProductDialog from "../../components/ProductDialog/ProductDialog";
import CatalogHeader from "../../components/CatalogHeader/CatalogHeader";
import ProductsExhibitorComponent from "../../components/ProductsExhibitorList/ProductsExhibitorComponent";
import { useSellShortcuts } from "@hooks/cart/useSellShortcuts";

const NewSellPage = (): ReactNode => {
  useSellShortcuts();

  return (
    <AppLayout noCenter fullWidth noPadding>
      <CatalogHeader />
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: { xs: "1fr", md: "minmax(0,1fr) 380px" },
          alignItems: "start",
          gap: 2,
          width: "100%",
        }}
      >
        <ProductsExhibitorComponent />
        <CartComponent />
      </Box>
      <ProductDialog />
    </AppLayout>
  );
};

export default NewSellPage;
