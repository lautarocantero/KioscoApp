import { Box, Link } from '@mui/material';
import { Link as LinkReactRouter } from 'react-router-dom';
import LinkCardIcon from './LinkCardIcon';
import LinkCardContent from './LinkCardContent';
import type { LinkCardProps } from '@typings/ui/layout.types';
import { useLinkCard } from '../hooks/useLinkCard';
import LinkCardArrow from './LinkCardArrow';
import type { ReactNode } from 'react';
import { linkCardBadgeSx, linkCardSx } from '../../sharedSx/LinkCardSx';


const LinkCard = ({ link }: LinkCardProps): ReactNode => {
    const resolvedLink = useLinkCard({ link });
    const isDisabled = Boolean(resolvedLink.disabled);

    if (isDisabled) {
        return (
            <Box
                role="listitem"
                sx={(theme) => linkCardSx(theme, true)}
            >
                <Box component="span" sx={linkCardBadgeSx}>
                    Disponible pronto
                </Box>
                <LinkCardIcon icon={link.icon} />
                <LinkCardContent link={resolvedLink} />
            </Box>
        );
    }

    return (
        <Link
            component={LinkReactRouter}
            to={link.url}
            sx={(theme) => linkCardSx(theme, false)}
        >
            <LinkCardIcon icon={link.icon} />
            <LinkCardContent link={resolvedLink} />
            <LinkCardArrow />
        </Link>
    );
};

export default LinkCard;