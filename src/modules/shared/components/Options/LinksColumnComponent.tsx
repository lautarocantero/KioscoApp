import { Grid } from '@mui/material';
import LinkMapper from './LinkCard/LinkMapper';
import type { LinksColumnProps } from '@typings/ui/layout.types';

const LinksColumnComponent = ({ links, appTheme }: LinksColumnProps): React.ReactNode => {
    return (
        <Grid size={{ xs: 12, md: 6 }}>
            <LinkMapper links={links} appTheme={appTheme} />
        </Grid>
    );
};

export default LinksColumnComponent;
