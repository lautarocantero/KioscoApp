import { Box, Typography, type Theme } from "@mui/material";
import { useTranslation } from "react-i18next";
import type { ReactNode } from "react";
import type { SellPageHeaderProps } from "@typings/cart/cartComponentTypes";

const ShortcutHint = ({ keyLabel, description }: { keyLabel: string; description: string }): ReactNode => (
  <Box sx={{ display: "flex", alignItems: "center", gap: "0.4em" }}>
    <Box
      component="kbd"
      sx={(theme: Theme) => ({
        fontFamily: "inherit",
        fontSize: "0.7rem",
        color: theme.custom?.black,
        backgroundColor: theme.custom?.white,
        border: `1px solid ${theme.custom?.darkGray}`,
        borderRadius: "6px",
        padding: "0.2em 0.5em",
      })}
    >
      {keyLabel}
    </Box>
    {description}
  </Box>
);

const SellPageHeader = ({ kioscoName, sellerName, dateLabel }: SellPageHeaderProps): ReactNode => {
  const { t } = useTranslation();

  return (
    <Box
      component="header"
      sx={{
        display: "flex",
        alignItems: "center",
        gap: 2,
        width: "100%",
        flexWrap: "wrap",
        pt: "1em",
        px: { xs: "0.75em", sm: "1.5em" },
      }}
    >
      <Box sx={{ minWidth: 0 }}>
        <Typography variant="h4" component="h1" noWrap sx={{ fontWeight: 600, letterSpacing: "-0.01em" }}>
          {t("cart.page.title")}
        </Typography>
        <Typography variant="caption" noWrap sx={(theme: Theme) => ({ color: theme.custom?.darkWhite, display: "block", mt: "0.15em" })}>
          {t("cart.page.subtitle", { kiosco: kioscoName, seller: sellerName, date: dateLabel })}
        </Typography>
      </Box>

      <Box
        sx={(theme: Theme) => ({
          ml: "auto",
          mr: { sm: "1.5em" },
          display: { xs: "none", md: "flex" },
          alignItems: "center",
          gap: 1.5,
          color: theme.custom?.darkWhite,
          fontSize: "0.75rem",
          flexShrink: 0,
        })}
      >
        <ShortcutHint keyLabel="/" description={t("cart.page.shortcuts.search")} />
        <ShortcutHint keyLabel="F2" description={t("cart.page.shortcuts.scan")} />
        <ShortcutHint keyLabel="F9" description={t("cart.page.shortcuts.checkout")} />
      </Box>
    </Box>
  );
};

export default SellPageHeader;
