import { Box, useTheme, type Theme } from "@mui/material";
import FormHeaderDefaultIcon from "./FormHeaderDefaultIconProps";
import type { FormHeaderIconBoxProps } from "@typings/shared/reactComponents";
import type { ReactNode } from "react";


const FormHeaderIconBox = ({ icon }: FormHeaderIconBoxProps): ReactNode => {
    const theme = useTheme();

    return (
        <Box sx={(theme: Theme) => ({
            width: 34, height: 34, borderRadius: "8px",
            background: theme.custom.darkBackground,
            display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0,
        })}>
            {icon ?? <FormHeaderDefaultIcon color={theme.palette.primary.main} />}
        </Box>
    );
};

export default FormHeaderIconBox;