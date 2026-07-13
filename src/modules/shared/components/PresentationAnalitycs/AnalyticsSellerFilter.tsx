import { Box, InputAdornment, MenuItem, Select, Typography } from "@mui/material";
import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";
import { fieldLabelSx, filterInputSx } from "../sharedSx/sharedSx";
import type { SellerFilterProps } from "@typings/ui/analytics.types";

/** Vendedores hardcodeados hasta que exista el endpoint real */
const HARDCODED_SELLERS = [{ id: "all", name: "Todos los vendedores" }]; // to do des hardcodear esto


export const SellerFilter = ({ sellerId, onChange }: SellerFilterProps) => {
    return (
        <Box>
            <Typography sx={fieldLabelSx}>Vendedor</Typography>
            <Select
                value={sellerId}
                onChange={onChange}
                size="small"
                startAdornment={
                    <InputAdornment position="start">
                        <PersonOutlineOutlinedIcon fontSize="small" />
                    </InputAdornment>
                }
                sx={filterInputSx}
            >
                {HARDCODED_SELLERS.map((seller) => (
                    <MenuItem key={seller.id} value={seller.id}>
                        {seller.name}
                    </MenuItem>
                ))}
            </Select>
        </Box>
    );
};