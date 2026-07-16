import { Box } from "@mui/material";
import type { FieldWithIconProps } from "@typings/product/productComponentTypes";

const FieldWithIcon = ({ iconConfig, children }: FieldWithIconProps): React.ReactNode => {
    if (!iconConfig) return <>{children}</>;

    return (
        <Box sx={{ display: "flex", gap: 2, alignItems: "start" }}>
            <Box
                aria-hidden="true"
                sx={{
                    width: 60,
                    height: 60,
                    borderRadius: "10px",
                    bgcolor: `${iconConfig.color}22`,
                    display: { xs: "none", sm: "flex" },
                    alignItems: "center",
                    justifyContent: "center",
                    flexShrink: 0,
                    color: iconConfig.color,
                }}
            >
                {iconConfig.icon}
            </Box>
            <Box sx={{ flex: 1, minWidth: 0 }}>
                {children}
            </Box>
        </Box>
    );
};

export default FieldWithIcon;