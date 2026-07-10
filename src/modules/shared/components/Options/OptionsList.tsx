import { Grid } from '@mui/material';
import BackButton from '../Buttons/BackButton';
import LinksColumnComponent from './LinksColumnComponent';
import type { OptionLink, OptionsListInterface } from '@typings/ui/layout.types';
import { splitLinks } from './helper/SplitLinks';


const OptionsList = ({ links, disconnect }: OptionsListInterface): React.ReactNode => {

  const { leftLinks, rightLinks }: { leftLinks: OptionLink[], rightLinks: OptionLink[] } = splitLinks(links);

  return (
    <Grid
      container
      spacing={2}
      component="nav"
      aria-label="Opciones disponibles"
      role="list"
    >
      {/*─────────────────── 🔎 Columna izquierda 🔎 ───────────────────*/}
      <LinksColumnComponent links={leftLinks} />

      {/*─────────────────── 🔎 Columna derecha 🔎 ───────────────────*/}
      <LinksColumnComponent links={rightLinks} />

      {/*─────────────────── 🔎 Botones extra 🔎 ───────────────────*/}
      {!disconnect && (
        <Grid size={{ xs: 12 }}>
          <BackButton />
        </Grid>
      )}

    </Grid>
  );
};

export default OptionsList;