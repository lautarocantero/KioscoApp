
//─────────────────── Componente 🧩: LinksColumn ───────────────────//

//─────────────────── Descripción 📝 ───────────────────//
// Componente reutilizable que renderiza una columna de enlaces interactivos.  
// Cada enlace se muestra con icono y descripción, aplicando estilos dinámicos según el tema activo.  
// Se utiliza dentro de `OptionsList` u otros menús para organizar enlaces en columnas responsivas.  

//──────────────────── Funciones 🔧 ─────────────────────//
// - Recibe un array de `OptionLink` y lo recorre con `.map()` para renderizar cada enlace.  

//─────────────────── Notas técnicas 💽 ───────────────────//
// - El componente ocupa media pantalla (`xs:12, sm:6`) para integrarse en layouts de dos columnas.  
// - La altura de cada opción está fijada en `3.5em` para mantener consistencia visual en móviles.  

//-----------------------------------------------------------------------------//


import { Grid, Link, type Theme } from '@mui/material';
import { Link as LinkReactRouter } from 'react-router-dom';
import type { LinksColumnProps, OptionLink } from '../../../../typings/ui/uiModules';

const LinksColumnComponent = ({ links, appTheme }: LinksColumnProps): React.ReactNode => {
  return (
    <Grid size={{ xs: 12, sm: 6 }}>
      {links.map((link: OptionLink) => (
        <Grid
          component={'div'}
          key={link.url}
          sx={(theme: Theme) => ({
            alignItems: "center",
            border: `0.1em solid ${
              appTheme ? theme.custom?.blackTranslucid : theme.custom?.whiteTranslucid
            }`,
            borderRadius: "0.5em",
            color: theme.custom?.fontColor,
            display: "flex",
            height: { xs: "3.5em" },
            justifyContent: "center",
            textAlign: "center",
            width: "100%",
            mb: 1,
            "&:hover": {
              backgroundColor: theme?.custom?.fontColor,
            }
          })}
        >
          <Link
            component={LinkReactRouter}
            to={link.url}
            sx={(theme: Theme) => ({
              alignItems: "center",
              color: theme.custom?.fontColor,
              display: "flex",
              fontSize: {
                xs: theme.typography?.body1.fontSize,
                sm: theme.typography?.h6.fontSize,
              },
              gap: "0.5em",
              height: "100%",
              justifyContent: "center",
              textAlign: "center",
              textDecoration: "none",
              width: "100%",
              "&:hover": {
                color: theme?.custom?.backgroundDark,
              }
            })}
          >
            {link.icon}
            {link.description}
          </Link>
        </Grid>
      ))}
    </Grid>
  );
};

export default LinksColumnComponent;
