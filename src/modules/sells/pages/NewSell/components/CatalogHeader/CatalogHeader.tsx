import { Toolbar } from "@mui/material";
import React, { type ReactNode } from "react";
import NoisyCard from "../../../../../shared/components/Cards/NoisyCard";
import SellBarActions from "./SellBarActions";


const CatalogHeader = (): ReactNode => {

  return (
    <NoisyCard
      component="nav"
      sx={() => ({
        width:  { xs: "98%", sm: "90%", md: "80%", lg: "50%" },
        mt: { xs: "3em", md: "0" },
        alignSelf: "center",
      })}
    >
      <Toolbar sx={{ minHeight: 'auto', padding: { xs: "0.4em 0.5em", sm: "0.4em 1em" } }}>
        <SellBarActions />
      </Toolbar>
    </NoisyCard>
  );
};

export default React.memo(CatalogHeader);