// modules/Presentations/components/PresentationUpdated/VariantUpdatedBody.tsx

import { Box, Typography } from "@mui/material";

interface Props { name: string; }

const VariantUpdatedBody = ({ name }: Props): React.ReactNode => (
    <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 1.5, py: 2 }}>
        <Box sx={{
            width: 64, height: 64, borderRadius: "50%",
            backgroundColor: "rgba(3,134,238,0.10)",
            border: "0.5px solid rgba(3,134,238,0.25)",
            display: "flex", alignItems: "center", justifyContent: "center",
            fontSize: "2rem",
        }}>
            ✅
        </Box>

        <Typography sx={{ fontSize: "1.05rem", fontWeight: 600, color: "rgba(255,255,255,0.90)", textAlign: "center" }}>
            Presentación actualizada correctamente
        </Typography>

        <Box sx={{ px: 1.5, py: 0.5, backgroundColor: "rgba(3,134,238,0.08)", border: "0.5px solid rgba(3,134,238,0.20)", borderRadius: "8px" }}>
            <Typography sx={{ fontSize: "0.85rem", fontWeight: 600, color: "#0386EE" }}>
                {name}
            </Typography>
        </Box>
    </Box>
);

export default VariantUpdatedBody;