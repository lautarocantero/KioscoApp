import { Box } from '@mui/material';
import LinkCard from './LinkCard';
import type { LinkMapperProps, OptionLink } from '@typings/ui/layout.types';


const LinkMapper = ({ links }: LinkMapperProps): React.ReactNode => {

    return links.map((link: OptionLink) => (
        <Box key={link.url} role="listitem">
            <LinkCard link={link} />
        </Box>
    ));
};

export default LinkMapper;