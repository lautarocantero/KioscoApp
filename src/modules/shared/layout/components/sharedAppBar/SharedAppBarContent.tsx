//─────────────────── Componente 🧩: SharedAppBarContent ───────────────────//

//─────────────────── Descripción 📝 ───────────────────//
// Contenido principal de la barra superior compartida (AppBar).
// Renderiza el título "Kiosco", el control de tema y opcionalmente los filtros.
// Se integra en el layout global para mantener consistencia visual y funcional.  

//──────────────────── Funciones 🔧 ─────────────────────//
// - SharedAppBarContent: componente principal.
//   - Recibe showFilters.
//   - Usa ThemeContext para obtener appTheme.
//   - Usa useNavigate para redirigir a /home al hacer clic en el título.
//     - LightMode: control de cambio de tema.
//     - Filters: renderizado condicional según showFilters.
//     - CartButtonComponent: acceso rápido al carrito.

//-----------------------------------------------------------------------------//


import { Grid, Typography, type Theme } from "@mui/material";
import { useNavigate, type NavigateFunction } from "react-router-dom";
import type { SharedAppBarContentType } from "../../../../../typings/ui/uiModules";
import LightMode from "../../../components/LightMode/LightMode";
import CartButtonComponent from "./CartButtonComponent";
import Filters from "./Filters";
import BarcodeButtonComponent from "./BarcodeButtonComponent";

const SharedAppBarContent = ({showFilters}: SharedAppBarContentType): React.ReactNode => {
  const navigate: NavigateFunction = useNavigate();

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
            color: theme?.custom?.fontColor,
            lineHeight: 'none'
          })}>
            Kiosco
        </Typography>
        <LightMode />
      </Grid> 
      <Filters showFilters={showFilters}/> 
      <BarcodeButtonComponent />      
      <CartButtonComponent />                    
    </Grid>
  );
};

export default SharedAppBarContent;
