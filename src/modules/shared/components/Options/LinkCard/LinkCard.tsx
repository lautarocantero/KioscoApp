import { Link } from '@mui/material';
import { Link as LinkReactRouter } from 'react-router-dom';
import LinkCardIcon from './LinkCardIcon';
import LinkCardContent from './LinkCardContent';
import type { LinkCardProps } from '@typings/ui/layout.types';

const LinkCard = ({ link }: LinkCardProps): React.ReactNode => (
    <Link
        component={LinkReactRouter}
        to={link.url}
        sx={(theme) => ({
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            mb: 1.5,
            minHeight: "100px",
            borderRadius: "16px",
            overflow: "hidden",
            textDecoration: "none",
            backgroundColor: theme.custom.darkGray,
            border: `1px solid ${theme.custom.darkGray}44`,
            backdropFilter: "blur(8px)",
            cursor: "pointer",
            transition: "transform 0.15s cubic-bezier(0.4, 0, 0.2, 1), box-shadow 0.15s ease, background-color 0.15s",
            "&:hover": {
                backgroundColor: theme.custom.darkMain,
                border: `1px solid ${theme.palette.primary.main}66`,
                transform: "translateY(-3px)",
                boxShadow: `0 8px 24px ${theme.palette.primary.main}40`,
            },
            "&:hover .link-card-icon-box": {
                backgroundColor: theme.custom.white,
                color: theme.palette.primary.main,
            },
            "&:hover .link-card-description": {
                color: theme.custom.white,
            },
            "&:hover .link-card-value, &:hover .link-card-subtitle": {
                color: theme.custom.white,
            },
        })}
    >
        <LinkCardIcon icon={link.icon} />
        <LinkCardContent link={link} />
    </Link>
);

export default LinkCard;