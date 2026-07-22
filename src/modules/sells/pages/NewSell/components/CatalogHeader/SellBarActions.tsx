// SellBarActions.tsx
import { Box } from "@mui/material";
import type { ReactNode } from "react";
import BarcodeButtonComponent from "./BarcodeButtonComponent";
import { SellbarFilter } from "./SellBarFilter";
import CartButtonComponent from "./CartButtonComponent";
import SortByCatalogHeader from "./SortByCatalogHeader";
import ViewModeToggle from "./ViewModeToggle";
import { SellbarSearch } from "./SellBarSearch";
import SellbarSection from "./SellBarSection";

export const SellBarActions = (): ReactNode => {
  return (
    <Box
      sx={{
        display: "grid",
        width: "100%",
        marginTop: "4px",
        gap: "0.75em",
        flexShrink: 0,

        gridTemplateColumns: {
          xs: "1fr",
          sm: "repeat(3, 1fr)",
        },
        gridTemplateAreas: {
          xs: `
            "search"
            "quickactions"
            "sortview"
          `,
          sm: `
            "search       search       search"
            "quickactions quickactions quickactions"
            "sortview     sortview     sortview"
          `,
        },
      }}
    >
      <SellbarSection gridArea="search" title="Búsqueda">
        <SellbarSearch />
      </SellbarSection>

      <SellbarSection gridArea="quickactions" title="Acciones rápidas" flexContent>
        <BarcodeButtonComponent />
        <SellbarFilter />
        <CartButtonComponent />
      </SellbarSection>

      <SellbarSection gridArea="sortview" title="Orden y vista" flexContent>
        <SortByCatalogHeader />
        <ViewModeToggle />
      </SellbarSection>
    </Box>
  );
};

export default SellBarActions;