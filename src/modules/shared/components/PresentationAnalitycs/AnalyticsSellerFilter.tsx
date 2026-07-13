import { MenuItem, Select, type Theme } from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";
import type { SellerFilterProps } from "@typings/ui/analytics.types";

/** Vendedores hardcodeados hasta que exista el endpoint real */
const HARDCODED_SELLERS = [{ id: "all", name: "Todos los vendedores" }]; // to do des hardcodear esto

export const SellerFilter = ({ sellerId, onChange }: SellerFilterProps) => {
    return (
        <Select
            value={sellerId}
            onChange={onChange}
            size="small"
            IconComponent={ExpandMoreIcon}
            startAdornment={<PersonOutlineOutlinedIcon fontSize="small" sx={{ mr: 0.5 }} />}
            sx={(theme: Theme) => ({
                textTransform: "none",
                fontSize: "0.8rem",
                color: theme.custom.fontColor,
                borderRadius: "5em",
                minWidth: 180,
                "& .MuiOutlinedInput-notchedOutline": {
                    borderColor: theme.custom.darkGray,
                },
                "&:hover .MuiOutlinedInput-notchedOutline": {
                    borderColor: theme.custom.darkGray,
                },
                "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                    borderColor: theme.custom.darkGray,
                    borderWidth: "1px",
                },
            })}
        >
            {HARDCODED_SELLERS.map((seller) => (
                <MenuItem key={seller.id} value={seller.id}>
                    {seller.name}
                </MenuItem>
            ))}
        </Select>
    );
};