import { Grid } from '@mui/material';
import LinkMapper from './LinkCard/LinkMapper';
import type { LinksColumnProps } from '@typings/ui/layout.types';

const LinksColumnComponent = ({ links }: LinksColumnProps): React.ReactNode => {

    return (
        <Grid size={{ xs: 12, md: 6 }}>
            <LinkMapper links={links}/>
        </Grid>
    );
};

export default LinksColumnComponent;
