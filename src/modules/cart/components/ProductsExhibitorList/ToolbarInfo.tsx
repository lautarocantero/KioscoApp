import {
  Box,
  Typography,
  type Theme,
} from "@mui/material";
import Inventory2OutlinedIcon from "@mui/icons-material/Inventory2Outlined";
import { useTranslation } from "react-i18next";
import type { ReactNode } from "react";
import type { ToolbarInfoProps } from "@typings/cart/cartComponentTypes";


const ToolbarInfo = ({
  totalCount,
  presentationsCount,
}: ToolbarInfoProps): ReactNode => {
  const { t } = useTranslation();

  return (
    <Box
        sx={{
            display: "flex",
            alignItems: "center",
            gap: 1.5,
            width: { xs: "100%", md: "20%" },
        }}
    >
    <Box
        sx={(theme: Theme) => ({
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        width: { xs: 44, sm: 50, md: 60 },
        height: { xs: 40, sm: 45, md: 50 },
        borderRadius: 2,
        backgroundColor: theme.custom?.lightMain,
        flexShrink: 0,
        })}
    >
        <Inventory2OutlinedIcon
        sx={(theme: Theme) => ({
            color: theme.custom?.white,
            fontSize: { xs: "1.3rem", md: "1.6rem" },
        })}
        />
    </Box>
    <Box sx={{ minWidth: 0 }}>
        <Typography
            variant="body1"
            noWrap
            sx={(theme: Theme) => ({ color: theme.custom?.white, lineHeight: 1.2 })}
        >
            {t("cart.productsExhibitor.toolbar.title")}
        </Typography>
        <Typography
            variant="caption"
            sx={(theme: Theme) => ({ color: theme.custom?.white })}
        >
            {t("cart.productsExhibitor.toolbar.availableCount", { count: totalCount, presentations: presentationsCount })}
        </Typography>
    </Box>
    </Box>
  );
};

export default ToolbarInfo;