import { Box, type Theme } from "@mui/material";
import BarcodeButtonComponent from "./BarcodeButtonComponent";
import { SellbarFilter } from "./SellBarFilter";
import CartButtonComponent from "./CartButtonComponent";
import type { SellbarActionsInterface } from "@typings/ui/appbar.types";
import type { ReactNode } from "react";


export const SellBarActions = ({ showFilters }: SellbarActionsInterface): ReactNode => {
  if (!showFilters) return null;


  return (
    <Box
      display={"flex"}
      flexDirection={{ xs: "column", sm: "row" }}
      alignItems={"center"}
      sx={(theme: Theme) => ({
        flexWrap: 'nowrap',
        flexShrink: 0,
        height: { xs: "5em", sm: "2em"},
        width: "100%",
        borderTop: `0.1em solid ${theme?.custom?.darkBackground}`,
        marginTop: "0.5em",
      })}
    >

      <BarcodeButtonComponent />

      <SellbarFilter />

      <CartButtonComponent />
      
    </Box>
  );
};

export default SellBarActions;