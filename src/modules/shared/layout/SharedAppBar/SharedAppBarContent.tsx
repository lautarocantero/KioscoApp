import { Grid, Typography, type Theme } from "@mui/material";
import LightMode from "../../components/LightMode";
import { useContext } from "react";
import { ThemeContext } from "../../../../theme/ThemeContext";
import { useNavigate } from "react-router-dom";
import Filters from "./Filters";

const SharedAppBarContent = ({showFilters}: {showFilters: boolean}): React.ReactNode => {
  const { appTheme } = useContext(ThemeContext);
  const navigate = useNavigate();

  return (
    <Grid
        container
        display={'flex'}
        flexDirection={'column'}
        sx={{
          width: '100%',
        }}
    >
      <Grid
        container
        display={"flex"}
        flexDirection={"row"}
        alignItems={"center"}
        width={"100%"}
        sx={(theme: Theme) => ({
          color: theme.custom?.white,
          justifyContent: "space-between",
        })}
      >
        <Typography 
          onClick={() => navigate('/home')}
          sx={(theme: Theme) => ({ 
            fontSize: theme?.typography?.h4,
            color: `${appTheme ? "#333333" : "#eff0f8"}`,
            lineHeight: 'none'
          })}>
            Kiosco
        </Typography>
        <LightMode />
      </Grid> 
      <Filters showFilters={showFilters}/>                       
    </Grid>
  );
};

export default SharedAppBarContent;
