import { Grid, Typography, type Theme } from "@mui/material"
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';

export const SellbarFilter = (): React.ReactNode => {
    return (
      <Grid
        display="flex"
        alignItems="center"
        justifyContent="center"
        sx={(theme: Theme) => ({
          flex: 1,
          position: 'relative',
          '&::after': {
            content: '""',
            position: 'absolute',
            right: 0,
            height: '50%',
            width: '0.1em',
            backgroundColor: theme?.custom?.darkBackground,
          },
        })}
      >
        <Grid
            sx={(theme: Theme) => ({
                alignItems: 'center',
                borderRadius: '1em',
                color: theme?.custom?.fontColor,
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'center',
                padding: '0 0.8em',
                flexShrink: 0,
                cursor: 'pointer',
                transition: 'all 0.3s ease',
                '&:hover': {
                  backgroundColor: theme?.custom?.white,
                  color: theme?.palette.secondary.main,
                },
                '&:hover .MuiSvgIcon-root': {
                  color: theme?.palette.secondary.main,
                },
            })}
        >
            <Typography sx={(theme: Theme) => ({
              fontSize: '0.85em',
              color: theme?.palette?.secondary?.main,
              whiteSpace: 'nowrap',
            })}>
              Tipo
            </Typography>
            <KeyboardArrowDownIcon sx={(theme: Theme) => ({
              fontSize: '1em',
              color: theme?.palette?.secondary?.main,
            })}/>
        </Grid>
      </Grid>
    )
}