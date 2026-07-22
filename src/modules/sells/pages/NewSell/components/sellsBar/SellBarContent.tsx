import { Box, type Theme } from "@mui/material";
import type { SharedAppBarContentType } from "../../../../../../typings/ui/appbar.types";
import SellBarActions from "./SellBarActions";
import type { ReactNode } from "react";


const SellBarContent = ({showFilters}: SharedAppBarContentType): ReactNode => {
  

  return (
    <Box
      display={"flex"}
      flexDirection={"column"}
      alignItems={"start"}
      width={"100%"}
      sx={(theme: Theme) => ({
        color: theme.custom?.white,
        flexWrap: 'nowrap',
        padding: '0.3em 0',
      })}
    >

      <SellBarActions showFilters={showFilters} />
    </Box>
  );
};

export default SellBarContent;