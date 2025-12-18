
//─────────────────── Componente 🧩: CartProductItemData ───────────────────//

//─────────────────── Descripción 📝 ───────────────────//
// Renderiza todos los datos del producto (nombre, tamaño, stock, precio)

//──────────────────── Funciones 🔧 ─────────────────────//
// -DisplayDataComponent se encarga de renderizar la informacion del producto que le pasa CartProductItemData

//─────────────────── 📝 To do: componetizar  ───────────────────//
//─────────────────── 📝 To do: mover interfaz ───────────────────//

//-----------------------------------------------------------------------------//

import { Grid, Tooltip, Typography, type Theme } from "@mui/material";
import type { CartProductItemDataComponentInterface } from "../../../../typings/sells/sellsTypes";

interface DisplayDataComponentInterface {
    nameEdited: string,
    size: string,
    units: string,
    price: string,
}

const DisplayDataComponent = ({nameEdited,size, units, price} : DisplayDataComponentInterface):React.ReactNode => (
    <Grid
        size={{ xs: 8 }}
        display={'flex'}
        flexDirection={{ xs: 'column', sm: 'row'}}
        sx={(theme: Theme) => ({
            alignItems: {sm: 'center'},
            gap: {xs: '0.1em', sm: '2em'},
            "& .MuiTypography-root": {
              color: theme?.palette?.common?.white,
            },
          })}
    >
        <Grid size={{md: 2}}>
            <Typography
                sx={(theme: Theme) => ({
                    fontSize: theme?.typography?.caption?.fontSize,
                })}
            >
                {nameEdited}
            </Typography>
        </Grid>
        <Grid size={{md: 2}}>
            <Typography
                sx={(theme: Theme) => ({
                    fontSize: theme?.typography?.caption?.fontSize
                })}
            >
                Tamaño: {size}
            </Typography>
        </Grid>
        <Grid size={{md: 2}}>
            <Typography
                sx={(theme: Theme) => ({
                    fontSize: theme?.typography?.caption?.fontSize
                })}
            >
                Unidades: {units} unidades
            </Typography>
        </Grid>
        <Grid size={{md: 2}}>
            <Typography
                sx={(theme: Theme) => ({
                    fontSize: theme?.typography?.caption?.fontSize
                })}
            >
                Precio unitario: {price}
            </Typography>
        </Grid>
    </Grid>
)

const CartProductItemDataComponent = ({name = 'Coca Cola', size = '2L', units = '1', price = '2500$'}
    : CartProductItemDataComponentInterface):React.ReactNode => {

    const nameEdited: string = name.length > 25 ? `${name.slice(0, 25)}...` : name;

    return (
        <Tooltip title={name}>
            <DisplayDataComponent nameEdited={nameEdited} size={size} units={units} price={price} />
        </Tooltip>
    )
}

export default CartProductItemDataComponent;
