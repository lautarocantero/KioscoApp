import { Grid } from '@mui/material';
import { useContext } from 'react';
import { ThemeContext } from '../../../../theme/ThemeContext';
import BackButton from '../Buttons/BackButton';
import LinksColumnComponent from './LinksColumnComponent';
import type { OptionLink, OptionsListInterface } from '@typings/ui/layout.types';

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
      {!disconnect && <BackButton />}
      
    </Grid>
  );
};

export default OptionsList;