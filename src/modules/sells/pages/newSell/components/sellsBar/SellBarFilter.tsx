import { Grid, Typography, type Theme } from "@mui/material"
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';

export const SellbarFilter = (): React.ReactNode => {
    return (
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
                  color: theme?.custom?.accentShop,
                },
                '&:hover .MuiSvgIcon-root': {
                  color: theme?.custom?.accentShop,
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
    )
}