import { useTheme } from '@mui/material/styles';
import { getCardColors } from '../helpers/getCardColors';
import LinkCard from './LinkCard';
import type { LinkMapperProps, OptionLink } from '@typings/ui/layout.types';


const LinkMapper = ({ links, appTheme }: LinkMapperProps): React.ReactNode => {
    const theme = useTheme();
    const cardColors = getCardColors(theme);

    return links.map((link: OptionLink) => (
        <LinkCard
            key={link.url}
            link={link}
            accent={cardColors[link.url] ?? theme?.palette?.primary?.main}
            appTheme={appTheme}
        />
    ));
};

export default LinkMapper;
