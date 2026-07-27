import { Box } from '@mui/material';
import ArrowOutwardIcon from '@mui/icons-material/ArrowOutward';
import type { LinkCardArrowProps } from '@typings/ui/layout.types';
import type { ReactNode } from 'react';


const LinkCardArrow = (_props: LinkCardArrowProps): ReactNode => (
    <Box
        aria-hidden="true"
        className="link-card-arrow"
        sx={(theme) => ({
            position: "absolute",
            top: "12px",
            right: "12px",
            width: "28px",
            height: "28px",
            borderRadius: "50%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            border: `1px solid ${theme.palette.primary.main}66`,
            color: theme.palette.primary.main,
            backgroundColor: "transparent",
            transition: "background-color 0.15s, color 0.15s, border-color 0.15s",
        })}
    >
        <ArrowOutwardIcon sx={{ fontSize: "0.95rem" }} />
    </Box>
);

export default LinkCardArrow;