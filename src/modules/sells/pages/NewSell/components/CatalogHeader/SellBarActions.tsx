import { Box } from "@mui/material";
import type { ReactNode } from "react";
import BarcodeButtonComponent from "./BarcodeButtonComponent";
import { SellbarFilter } from "./SellBarFilter";
import CartButtonComponent from "./CartButtonComponent";
import { SellbarSearch } from "./SellBarSearch";
import SellbarSection from "./SellBarSection";
import { useSellbar } from "../../../../../../hooks/sells/useSellBar";

export const SellBarActions = (): ReactNode => {
  const { search, barcode, cart, categories } = useSellbar();

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
          `,
          sm: `
            "search       search       search"
            "quickactions quickactions quickactions"
          `,
        },
      }}
    >
      <SellbarSection gridArea="search" title="Búsqueda">
        <SellbarSearch search={search} />
      </SellbarSection>

      <SellbarSection gridArea="quickactions" title="Acciones rápidas" flexContent>
        <BarcodeButtonComponent barcode={barcode} />
        <SellbarFilter categories={categories} />
        <CartButtonComponent cart={cart} />
      </SellbarSection>
    </Box>
  );
};

export default SellBarActions;