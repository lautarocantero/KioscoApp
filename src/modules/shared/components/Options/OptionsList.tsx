
//─────────────────── Componente 🧩: OptionsList ───────────────────//

//─────────────────── Descripción 📝 ───────────────────//
// Lista de opciones interactiva que organiza enlaces en dos columnas y añade botones extra según el contexto.  
// Se utiliza en combinación con `DisplayOptions` para mostrar menús de navegación o acciones dentro de la aplicación.

//──────────────────── Funciones 🔧 ─────────────────────//
// -OptionsList Renderiza el listado de opciones disponibles
// -splitLinks se asegura de dividir en 2 partes simetricas la cantidad de opciones que haya disponibles

//─────────────────── Notas técnicas 💽 ───────────────────//
// - Se define un estilo dinámico con `sx` que depende del objeto `Theme` y del `appTheme`.
// - Los enlaces (`Link`) se renderizan con `LinkReactRouter` para navegación interna.
// - La altura de cada opción está fijada en `3.5em` para xs, lo que asegura consistencia visual.
// - El cálculo de `mid` asegura que la lista se divida en dos mitades lo más equilibradas posible.

//-----------------------------------------------------------------------------//

import { Grid } from '@mui/material';
import type { OptionLink, OptionsListInterface } from '../../../../typings/ui/uiModules';
import { useContext } from 'react';
import { ThemeContext } from '../../../../theme/ThemeContext';
import BackButton from '../Buttons/BackButton';
import LinksColumnComponent from './LinksColumnComponent';

const splitLinks = (links: OptionLink[]) => { 

  const mid = Math.ceil(links.length / 2); 
  const leftLinks = links.slice(0, mid); 
  const rightLinks = links.slice(mid); 

  return { leftLinks, rightLinks }; 
};

const OptionsList = ({ links, disconnect }: OptionsListInterface): React.ReactNode => {
  const { appTheme } = useContext(ThemeContext);

  {/*─────────────────── 🔎 dividir en dos mitades 🔎 ───────────────────*/}
  const { leftLinks ,rightLinks }: { leftLinks: OptionLink[],rightLinks: OptionLink[] }  = splitLinks(links);

  return (
    <Grid container spacing={2}>

      {/*─────────────────── 🔎 Columna izquierda 🔎 ───────────────────*/}
      <LinksColumnComponent links={leftLinks} appTheme={appTheme} />

      {/*─────────────────── 🔎 Columna derecha 🔎 ───────────────────*/}
      <LinksColumnComponent links={rightLinks} appTheme={appTheme} />

      {/*─────────────────── 🔎 Botones extra 🔎 ───────────────────*/}
      {!disconnect && <BackButton appTheme={appTheme} />}
      
    </Grid>
  );
};

export default OptionsList;