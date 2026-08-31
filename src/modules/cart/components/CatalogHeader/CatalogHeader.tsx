import { Box, Toolbar } from "@mui/material";
import React, { type ReactNode } from "react";
import NoisyCard from "../../../shared/components/Cards/NoisyCard";
import SellBarActions from "./SellBarActions";
import SellPageHeader from "./SellPageHeader";
import { useSellPageHeader } from "@hooks/cart/useSellPageHeader";


const CatalogHeader = (): ReactNode => {
  const pageHeader = useSellPageHeader();

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: 1.5,
        width: "100%",
        mt: { xs: "3em", md: "0" },
      }}
    >
      <SellPageHeader {...pageHeader} />

      {/* overflow: visible pisa el overflow: auto que trae NoisyCard por defecto
          (getNoisyBackgroundSx) — si no, el dropdown de sugerencias del buscador
          (position: absolute, se desborda hacia abajo) queda recortado dentro
          de la altura de esta barra en vez de flotar sobre el catálogo. */}
      <NoisyCard component="nav" sx={{ width: "100%", alignSelf: "center", overflow: "visible" }}>
        <Toolbar sx={{ minHeight: 'auto', padding: { xs: "0.4em 0.5em", sm: "0.4em 1em" } }}>
          <SellBarActions />
        </Toolbar>
      </NoisyCard>
    </Box>
  );
};

export default React.memo(CatalogHeader);