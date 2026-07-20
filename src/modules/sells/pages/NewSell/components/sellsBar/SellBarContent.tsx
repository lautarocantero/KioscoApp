import { Grid, type Theme } from "@mui/material";
import type { SharedAppBarContentType } from "../../../../../../typings/ui/appbar.types";
import { SellbarSearch } from "./SellBarSearch";
import SellBarActions from "./SellBarActions";
import SellBarTitleComponent from "./SellBarTitle";


const SellBarContent = ({showFilters}: SharedAppBarContentType): React.ReactNode => {
  
  return (
    <Grid
      container
      display={"flex"}
      flexDirection={"column"}
      alignItems={"start"}
      width={"100%"}
      sx={(theme: Theme) => ({
        color: theme.custom?.white,
        gap: '0.6em',
        flexWrap: 'nowrap',
        padding: '0.3em 0',
      })}
    >

      <SellBarTitleComponent title={"Buscar productos"} />

      <SellbarSearch showFilters={showFilters}/>
      
      <SellBarActions showFilters={showFilters} />
    </Grid>
  );
};

export default SellBarContent;