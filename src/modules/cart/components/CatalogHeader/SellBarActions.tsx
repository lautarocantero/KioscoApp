import { Box } from "@mui/material";
import type { ReactNode } from "react";
import BarcodeButtonComponent from "./BarcodeButtonComponent";
import PresentationSearchBar from "./PresentationSearchBar";
import { useSellbar } from "@hooks/cart/useSellBar";
import { usePresentationSearch } from "@hooks/cart/usePresentationSearch";


export const SellBarActions = (): ReactNode => {
  const { barcode } = useSellbar();
  const search = usePresentationSearch();

  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        width: "100%",
        gap: "0.75em",
        flexShrink: 0,
      }}
    >
      <PresentationSearchBar search={search} />
      <BarcodeButtonComponent barcode={barcode} />
    </Box>
  );
};

export default SellBarActions;
