import { type ReactNode } from "react";
import { Box } from "@mui/material";
import AppLayout from "../../../shared/layout/AppLayout";
import CartComponent from "../../components/CartComponent/CartComponent";
import ProductDialog from "../../components/ProductDialog/ProductDialog";
import CatalogHeader from "../../components/CatalogHeader/CatalogHeader";
import ProductsExhibitorComponent from "../../components/ProductsExhibitorList/ProductsExhibitorComponent";
import { useSellShortcuts } from "@hooks/cart/useSellShortcuts";
import { useAutoStartTutorial } from "@hooks/tutorial/useAutoStartTutorial";
import { TutorialIdEnum } from "@typings/tutorial/enums";
import { newSellTutorialSteps } from "../../tutorial/newSellTutorialSteps";

const NewSellPage = (): ReactNode => {
  useSellShortcuts();
  // Sin loader propio: el header (buscador/escáner) y el carrito montan
  // siempre — solo el catálogo tiene su propio loading interno (ver
  // ProductsExhibitorComponent), que ningún target del tutorial referencia.
  useAutoStartTutorial(TutorialIdEnum.NewSell, newSellTutorialSteps, true);

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
