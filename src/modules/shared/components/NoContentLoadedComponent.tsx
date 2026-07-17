import { Box, Typography } from '@mui/material';
import type { NoContentLoadedProps } from '@typings/ui/noContent.types';
import React, { type PropsWithChildren } from 'react';


export const NoContentLoaded = ({
  children,
  message = 'No hay contenido cargado...',
  icon: Icon,
  action,
  sx,
}: PropsWithChildren<NoContentLoadedProps>) => {
  const hasChildren = children && React.Children.count(children) > 0;

  if (hasChildren) {
    return <>{children}</>;
  }

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 1.5,
        py: 6,
        color: 'text.secondary',
        ...sx,
      }}
    >
      {Icon && <Icon sx={{ fontSize: 48, color: 'text.disabled' }} />}
      <Typography variant="body1" color="text.secondary">
        {message}
      </Typography>
      {action}
    </Box>
  );
};