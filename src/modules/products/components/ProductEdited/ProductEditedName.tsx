// ProductEditedName.tsx
import { Box, Typography } from "@mui/material";

interface ProductEditedNameProps {
    name: string;
}

const ProductEditedName = ({ name }: ProductEditedNameProps): React.ReactNode => (
    <Box sx={theme => ({ px: 3, py: 1, borderRadius: "12px", backgroundColor: `${theme.palette.primary.main}12`, mb: 3 })}>
        <Typography sx={theme => ({ fontWeight: 700, color: theme.custom.backgroundDark, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap", maxWidth: "20ch" })}>
            {name}
        </Typography>
    </Box>
);

export default ProductEditedName;