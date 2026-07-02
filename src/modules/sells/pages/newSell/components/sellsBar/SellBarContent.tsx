import { Grid, Typography, type Theme } from "@mui/material";
import { useNavigate, type NavigateFunction } from "react-router-dom";
import type { SharedAppBarContentType } from "../../../../../../typings/ui/uiModules";
import { SellbarSearch } from "./SellBarSearch";
import SellBarActions from "./SellBarActions";

const SellBarContent = ({showFilters}: SharedAppBarContentType): React.ReactNode => {
  const navigate: NavigateFunction = useNavigate();

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
      {/* Título */}
      <Typography
        onClick={() => navigate('/home')}
        sx={(theme: Theme) => ({
          color: theme?.custom?.fontColor,
          fontSize: theme?.typography?.body1?.fontSize,
          whiteSpace: 'nowrap',
          cursor: 'pointer',
          flexShrink: 0,
        })}
      >
        Buscar productos
      </Typography>

      {/* Buscador — ocupa el espacio disponible */}
      {showFilters && (
        <SellbarSearch />
      )}
      
        <SellBarActions showFilters={showFilters} />
    </Grid>
  );
};

export default SellBarContent;