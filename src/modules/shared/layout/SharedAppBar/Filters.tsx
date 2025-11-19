import { Grid, type Theme } from "@mui/material";
import { AppbarSearch } from "./AppBarSearch";
import { AppbarFilter } from "./AppBarFilter";

const Filters = ({showFilters}: {showFilters: boolean}) => {

  if(!showFilters) return (<></>);

  return (
    <Grid
      container
      spacing={2}
      display={"flex"}
      flexDirection={"row"}
      alignItems={"center"}
      width={"100%"}
      sx={(theme: Theme) => ({
        color: theme.custom?.white,
        justifyContent: "space-between",
        margin: '0.3em 0',
        height: '20px',
      })}
    >
      <Grid size={8}>
        <AppbarSearch />
      </Grid>
      <Grid size={4}>
        <AppbarFilter />
      </Grid>
    </Grid>
  )
}

export default Filters;