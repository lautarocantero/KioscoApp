import { MenuItem, Select, type Theme } from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";
import type { SellerFilterProps } from "@typings/ui/analytics.types";
import { useSellers } from "../../../../hooks/sellers/useSellers";

const ALL_SELLERS_OPTION = { _id: "all", name: "Todos los vendedores" };

export const SellerFilter = ({ sellerId, onChange }: SellerFilterProps) => {
    const { sellers, loading } = useSellers();

    const options = [ALL_SELLERS_OPTION, ...sellers];

    return (
        <Select
            value={sellerId}
            onChange={onChange}
            size="small"
            disabled={loading}
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
            {options.map((seller) => (
                <MenuItem key={seller._id} value={seller._id}>
                    {seller.name}
                </MenuItem>
            ))}
        </Select>
    );
};