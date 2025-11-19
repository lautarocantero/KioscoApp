import { Grid, Typography, type Theme } from "@mui/material";
import LightMode from "../../components/LightMode";
import { useContext } from "react";
import { ThemeContext } from "../../../../theme/ThemeContext";
import { AppbarSearch } from "./AppBarSearch";
import { AppbarFilter } from "./AppBarFilter";
import { useNavigate } from "react-router-dom";

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
          mt: '0.5em',
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
          onClick={() => navigate('/')}
          sx={(theme: Theme) => ({ 
            fontSize: theme?.typography?.h4,
            color: `${appTheme ? "#333333" : "#eff0f8"}`,
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

{/* <Grid */}
  // container
  // display={"flex"}
  // flexDirection={"row"}
  // alignItems={"center"}
  // width={"100%"}
  // sx={(theme: Theme) => ({
    // color: theme.custom?.white,
    // justifyContent: "space-between",
  // })}
{/* > */}
  {/* <Typography  */}
    // sx={(theme: Theme) => ({ 
      // fontSize: theme?.typography?.h4,
      // color: `${appTheme ? "#333333" : "#eff0f8"}`,
    // })}>
    {/* Kiosco */}
  {/* </Typography> */}
  {/* <LightMode /> */}
{/* </Grid> */}
