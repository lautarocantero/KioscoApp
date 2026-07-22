// SellbarSection.tsx
import { Box, Typography, type Theme } from "@mui/material";
import type { SellbarSectionProps } from "@typings/ui/appbar.types";
import type { ReactNode } from "react";


export const SellbarSection = ({
  gridArea,
  title,
  children,
  flexContent = false,
}: SellbarSectionProps): ReactNode => {
  return (
    <Box sx={{ gridArea }}>
      <Typography
        variant="caption"
        sx={(theme: Theme) => ({
          mb: 0.5,
          display: "block",
          color: theme?.custom?.fontColor,
        })}
      >
        {title}
      </Typography>

      {flexContent ? (
        <Box
          sx={{
            display: "flex",
            flexDirection: { xs: "column", sm: "row" },
            gap: "0.5em",
          }}
        >
          {children}
        </Box>
      ) : (
        children
      )}
    </Box>
  );
};

export default SellbarSection;