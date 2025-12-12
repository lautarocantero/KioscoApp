
// # Componente: OptionsList  

// ## Descripción 📦  
// Lista de opciones interactiva que organiza enlaces en dos columnas y añade botones extra según el contexto.  
// Se utiliza en combinación con `DisplayOptions` para mostrar menús de navegación o acciones dentro de la aplicación.  

// ## Lógica 🔧  
// - Props (`OptionsListInterface`):  
//   - `links`: array de opciones con ícono, descripción y URL.  
//   - `disconnect`: booleano que determina si se muestra el botón de cerrar sesión (`LogoutButton`) o el botón de volver (`BackButton`).  
// - Contexto:  
//   - Usa `ThemeContext` para obtener `appTheme` y aplicar estilos dinámicos.  
//   - Usa `useDispatch<AppDispatch>` para disparar acciones de Redux (ej. logout).  
// - Organización:  
//   - Divide la lista de enlaces en dos mitades (`leftLinks` y `rightLinks`).  
//   - Renderiza cada mitad en una columna (`Grid` con `xs:12, sm:6`).  
// - Estilos:  
//   - Bordes, colores y tipografía adaptados al tema (`Theme`).  
//   - Hover: cambia color de fondo o texto para mejorar la interacción.  

// ## Renderizado 🎨  
// - Dos columnas (`Grid`) con enlaces (`Link` de MUI integrado con `react-router-dom`).  
// - Cada enlace muestra ícono + descripción con estilos responsivos (`body1` en xs, `h6` en sm).  
// - Botones extra:  
//   - Si `disconnect` es `true` → `LogoutButton`.  
//   - Si `disconnect` es `false` → `BackButton`.  

// ## Notas técnicas 💽  
// - Modularidad: separa la lógica de opciones en columnas y botones adicionales.  
// - Flexibilidad: puede adaptarse a distintos menús cambiando el array `links`.  
// - Accesibilidad: enlaces con `textDecoration: "none"` y roles claros.  
// - Pendientes (TODO):  
//   - Ajustar espaciado en pantallas `xs`.  
//   - Componetizar bloques repetidos para mayor mantenibilidad.  


import { Grid, Link, type Theme} from '@mui/material';
import { Link as LinkReactRouter } from 'react-router-dom';
import type { OptionLink, OptionsListInterface } from '../../../../typings/ui/uiModules';
import { useDispatch } from 'react-redux';
import type { AppDispatch } from '../../../../store/auth/authSlice';
import { useContext } from 'react';
import { ThemeContext } from '../../../../theme/ThemeContext';
import LogoutButton from '../Buttons/LogoutButton';
import BackButton from '../Buttons/BackButton';

const OptionsList = ({ links, disconnect }: OptionsListInterface): React.ReactNode => {
  const { appTheme } = useContext(ThemeContext);
  const dispatch = useDispatch<AppDispatch>();

  // To do, en xs no deberia espaciarse tanto entre columnas
  // To do, componetizar esto

  // dividir en dos mitades
  const mid = Math.ceil(links.length / 2);
  const leftLinks = links.slice(0, mid);
  const rightLinks = links.slice(mid);

  return (
    <Grid container spacing={2}>
      {/* Columna izquierda */}
      <Grid size={{ xs: 12, sm: 6 }}>
        {leftLinks.map((link: OptionLink) => (
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

      {/* Columna derecha */}
      <Grid size={{ xs: 12, sm: 6 }}>
        {rightLinks.map((link: OptionLink) => (
          <Grid
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
                backgroundColor: theme.custom?.fontColor,
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

      {/* Botones extra */}
      {disconnect && <LogoutButton dispatch={dispatch} appTheme={appTheme} />}
      {!disconnect && <BackButton appTheme={appTheme} />}
    </Grid>
  );
};

export default OptionsList;