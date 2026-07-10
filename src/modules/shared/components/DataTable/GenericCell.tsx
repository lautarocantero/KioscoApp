import React from "react";
import { Tooltip, Typography, Stack, Box } from "@mui/material";
import type { GenericCellProps } from "@typings/ui/dataTable.types";


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
  const fullListLabel = items.map((item) => getTooltipLine(item)).join(", ");

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
      <Box
        tabIndex={0}
        role="button"
        aria-label={fullListLabel}
        sx={{ cursor: "default", display: "inline-block", "&:focus-visible": { outline: (theme) => `2px solid ${theme.palette.primary.main}`, outlineOffset: 2 } }}
      >
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