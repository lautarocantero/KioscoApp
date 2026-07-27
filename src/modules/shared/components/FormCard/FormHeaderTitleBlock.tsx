import { Box, Typography, type Theme } from "@mui/material";
import type { FormHeaderTitleBlockProps } from "@typings/shared/reactComponents";
import type { ReactNode } from "react";


const FormHeaderTitleBlock = ({ title, subtitle }: FormHeaderTitleBlockProps): ReactNode => (
    <Box>
        <Typography sx={(theme: Theme) => ({
            fontSize: "1.3rem", fontWeight: 500, lineHeight: 1.3,
            color: theme.custom.fontColor,
        })}>
            {title}
        </Typography>
        {subtitle && (
            <Typography sx={(theme: Theme) => ({
                fontSize: "0.75rem", color: theme.custom.translucidWhite, mt: "2px",
            })}>
                {subtitle}
            </Typography>
        )}
    </Box>
);

export default FormHeaderTitleBlock;