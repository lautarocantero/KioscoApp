import { Grid } from '@mui/material';
import type { LinksColumnProps } from '../../../../typings/ui/uiModules';
import LinkMapper from './LinkCard/LinkMapper';

const LinksColumnComponent = ({ links, appTheme }: LinksColumnProps): React.ReactNode => {
    return (
        <Grid size={{ xs: 12, md: 6 }}>
            <LinkMapper links={links} appTheme={appTheme} />
        </Grid>
    );
};

export default LinksColumnComponent;
