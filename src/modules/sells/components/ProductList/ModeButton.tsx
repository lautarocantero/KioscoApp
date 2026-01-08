
//─────────────────── Componente 🧩: ModeButtonComponent ───────────────────//

//─────────────────── Descripción 📝 ───────────────────//
// Se encarga de renderizar las opciones para agregar un producto al carrito,
// recibe una funcion a ejecutar on-click, un texto y un icono.

//-----------------------------------------------------------------------------//

import { Grid, Typography, type Theme } from "@mui/material";
import type { ModeButtonComponentInterface } from "../../../../typings/sells/sellsTypes";

const ModeButtonComponent = ({functionAction, text, icon}: ModeButtonComponentInterface):React.ReactNode => {

    return (
        <Grid
            container
            onClick={() => functionAction()}
            sx={(theme: Theme) => ({
                display: 'flex',
                flexDirection: 'column',
                color: theme?.custom?.fontColor,
                border: `1px solid ${theme?.custom?.backgroundDark}`,
                margin: '0.2em',
                borderRadius: '1em',
                height: {xs: '8em', sm: '14em'},
                '&:hover': {
                    color: theme?.palette?.primary?.main,
                    cursor: 'pointer',
                }
            })}
        >
            {icon}
            <Typography
                sx={(theme: Theme) => ({
                    fontSize: theme?.typography?.body2?.fontSize,
                    textAlign: 'center',
                    fontFamily: theme?.typography?.fontFamily,
                })}
            >
                {text}
            </Typography>
        </Grid>
    )
}

export default ModeButtonComponent;