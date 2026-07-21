import { Box, Tooltip, Typography, type Theme } from "@mui/material"
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import type { ReactNode } from "react";


export const SellbarFilter = (): ReactNode => {


    return (
      <Tooltip title="Filtra por tipo de producto">
        <Box
          display="flex"
          alignItems="center"
          justifyContent="center"
          sx={(theme: Theme) => ({
            flex: 1,
            position: 'relative',
            cursor: 'pointer',
            '&::after': {
              content: '""',
              position: 'absolute',
              right: 0,
              height: '50%',
              width: '0.1em',
              backgroundColor: theme?.custom?.darkBackground,
            },
            '&:hover': {
              backgroundColor: theme?.custom?.darkBackground,
            }
          })}
        >
          <Box
              sx={(theme: Theme) => ({
                  alignItems: 'center',
                  borderRadius: '1em',
                  display: 'flex',
                  gap: '0.4em',
                  flexShrink: 0,
                  transition: 'all 0.3s ease',
                  height: "2em",
                  flexDirection: 'row',
                  justifyContent: 'center',
                  '&:hover .MuiSvgIcon-root': {
                    color: theme?.palette.secondary.main,
                  },
              })}
          >
              <Typography sx={(theme: Theme) => ({
                color: theme?.palette?.secondary?.main,
                fontSize: theme?.typography?.body1?.fontSize,
                transition: 'color 0.3s ease',
              })}>
                Tipo
              </Typography>
              <KeyboardArrowDownIcon sx={(theme: Theme) => ({
                fontSize: '1em',
                color: theme?.palette?.secondary?.main,
              })}/>
          </Box>
        </Box>
      </Tooltip>
    )
}