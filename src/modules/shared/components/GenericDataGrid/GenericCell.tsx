// components/PresentationsCell.tsx
import React from "react";
import { Tooltip, Typography, Stack, Box } from "@mui/material";

interface GenericCellProps<T> {
  items: T[];
  emptyLabel: string;
  getLabel: (item: T) => string;
  getTooltipLine: (item: T) => string;
  getKey: (item: T, index: number) => string;
}

function GenericListCell<T>({
  items,
  emptyLabel,
  getLabel,
  getTooltipLine,
  getKey,
}: GenericCellProps<T>): React.ReactNode {
  if (!items.length) {
    return (
      <Typography variant="body2" color="text.disabled">
        {emptyLabel}
      </Typography>
    );
  }

  const [first, ...rest] = items;
  const label = getLabel(first);

  return (
    <Tooltip
      title={
        <Stack spacing={0.5} sx={{ py: 0.5 }}>
          {items.map((item, i) => (
            <Typography key={getKey(item, i)} variant="caption" component="div">
              {getTooltipLine(item)}
            </Typography>
          ))}
        </Stack>
      }
      arrow
      placement="top"
    >
      <Box sx={{ cursor: "default", display: "inline-block" }}>
        <Typography variant="body2">
          {label}
          {rest.length > 0 && (
            <Typography
              component="span"
              variant="caption"
              color="text.secondary"
              sx={{ ml: 0.5 }}
            >
              +{rest.length} más
            </Typography>
          )}
        </Typography>
      </Box>
    </Tooltip>
  );
}

export default GenericListCell;