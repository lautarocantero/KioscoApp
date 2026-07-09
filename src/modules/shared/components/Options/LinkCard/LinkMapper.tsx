import LinkCard from './LinkCard';
import type { LinkMapperProps, OptionLink } from '@typings/ui/layout.types';


const LinkMapper = ({ links }: LinkMapperProps): React.ReactNode => {

    return links.map((link: OptionLink) => (
        <LinkCard
            key={link.url}
            link={link}
        />
    ));
};

export default LinkMapper;
