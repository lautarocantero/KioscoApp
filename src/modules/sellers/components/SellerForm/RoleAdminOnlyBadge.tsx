import { Chip, type Theme } from "@mui/material";
import { alpha } from "@mui/material/styles";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import type { ReactNode } from "react";

const RoleAdminOnlyBadge = (): ReactNode => (
    <Chip
        size="small"
        icon={<InfoOutlinedIcon />}
        label="Solo administradores pueden editar el rol."
        sx={(theme: Theme) => ({
            alignSelf: "flex-start",
            mb: 1,
            bgcolor: alpha(theme.custom.accents.blue, 0.15),
            color: theme.custom.accents.blue,
            fontWeight: 600,
            "& .MuiChip-icon": {
                color: theme.custom.accents.blue,
            },
        })}
    />
);

export default RoleAdminOnlyBadge;
