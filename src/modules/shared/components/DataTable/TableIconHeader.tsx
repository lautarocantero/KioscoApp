import { Box, Typography, type Theme } from "@mui/material";
import type { TableIconHeaderProps } from "@typings/ui/dataTable.types";

const TableIconHeader = ({ icon, title, subtitle }: TableIconHeaderProps): React.ReactNode => {
    return (
        <Box component="header" sx={{ display: "flex", alignItems: "center", gap: 1.5, width: "100%" }}>
            <Box
                aria-hidden
                sx={(theme: Theme) => ({
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    width: 44,
                    height: 44,
                    borderRadius: "12px",
                    bgcolor: `${theme.palette.primary.main}1F`,
                    color: theme.palette.primary.main,
                    flexShrink: 0,
                })}
            >
                {icon}
            </Box>

            <Box>
                <Typography
                    component="h1"
                    variant="h4"
                    sx={(theme: Theme) => ({ color: theme.custom.fontColor, fontWeight: 700 })}
                >
                    {title}
                </Typography>
                {subtitle && (
                    <Typography variant="body2" sx={(theme: Theme) => ({ color: theme.custom.translucidFontColor })}>
                        {subtitle}
                    </Typography>
                )}
            </Box>
        </Box>
    );
};

export default TableIconHeader;
