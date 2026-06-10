import { Link } from '@mui/material';
import { Link as LinkReactRouter } from 'react-router-dom';
import type { LinkCardProps } from '../../../../../typings/ui/uiModules';
import LinkCardIcon from './LinkCardIcon';
import LinkCardContent from './LinkCardContent';

const LinkCard = ({ link, accent, appTheme }: LinkCardProps): React.ReactNode => (
    <Link
        component={LinkReactRouter}
        to={link.url}
        sx={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            mb: 1.5,
            minHeight: "100px",
            borderRadius: "16px",
            overflow: "hidden",
            textDecoration: "none",
            backgroundColor: "rgba(255,255,255,0.06)",
            border: `1px solid ${accent}44`,
            backdropFilter: "blur(8px)",
            cursor: "pointer",
            transition: "transform 0.15s cubic-bezier(0.4, 0, 0.2, 1), box-shadow 0.15s ease, background-color 0.15s",
            "&:hover": {
                backgroundColor: "rgba(255,255,255,0.10)",
                border: `1px solid ${accent}99`,
                transform: "translateY(-3px)",
                boxShadow: `0 8px 24px ${accent}33`,
            },
        }}
    >
        <LinkCardIcon icon={link.icon} accent={accent} />
        <LinkCardContent link={link} accent={accent} appTheme={appTheme}/>
    </Link>
);

export default LinkCard;
