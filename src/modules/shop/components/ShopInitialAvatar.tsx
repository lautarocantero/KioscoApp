import { Avatar } from "@mui/material";
import type { ShopInitialAvatarProps } from "@typings/shop/shopComponentTypes";

const ShopInitialAvatar = ({ name, color }: ShopInitialAvatarProps): React.ReactNode => (
    <Avatar
        sx={{
            width: 40,
            height: 40,
            flexShrink: 0,
            bgcolor: color,
            color: "common.white",
            fontSize: 15,
            fontWeight: 700,
        }}
    >
        {name.charAt(0).toUpperCase()}
    </Avatar>
);

export default ShopInitialAvatar;
