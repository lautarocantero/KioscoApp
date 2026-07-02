import { Grid, type Theme } from "@mui/material";
import BarcodeButtonComponent from "./BarcodeButtonComponent";
import { SellbarFilter } from "./SellBarFilter";
import CartButtonComponent from "./CartButtonComponent";

interface SellBarActionsProps {
  showFilters: boolean;
}

export const SellBarActions = ({ showFilters }: SellBarActionsProps): React.ReactNode => {
  if (!showFilters) return null;

  return (
    <Grid
      display={"flex"}
      flexDirection={"row"}
      alignItems={"center"}
      sx={(theme: Theme) => ({
        flexWrap: 'nowrap',
        flexShrink: 0,
        height: '2em',
        width: "100%",
        borderTop: `0.1em solid ${theme?.custom?.posSurface}`,
        marginTop: "0.5em",
      })}
    >
      <Grid
        display="flex"
        alignItems="center"
        justifyContent="center"
        sx={(theme: Theme) => ({
          flex: 1,
          position: 'relative',
          '&::after': {
            content: '""',
            position: 'absolute',
            right: 0,
            height: '50%',
            width: '0.1em',
            backgroundColor: theme?.custom?.posSurface,
          },
        })}
      >
        <BarcodeButtonComponent />
      </Grid>

      <Grid
        display="flex"
        alignItems="center"
        justifyContent="center"
        sx={(theme: Theme) => ({
          flex: 1,
          position: 'relative',
          '&::after': {
            content: '""',
            position: 'absolute',
            right: 0,
            height: '50%',
            width: '0.1em',
            backgroundColor: theme?.custom?.posSurface,
          },
        })}
      >
        <SellbarFilter />
      </Grid>

      <Grid
        display="flex"
        alignItems="center"
        justifyContent="center"
        sx={{ flex: 1 }}
      >
        <CartButtonComponent />
      </Grid>
</Grid>
  );
};

export default SellBarActions;