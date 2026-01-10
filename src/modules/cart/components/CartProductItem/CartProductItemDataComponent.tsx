
//─────────────────── Componente 🧩: CartProductItemData ───────────────────//

//─────────────────── Descripción 📝 ───────────────────//
// Renderiza todos los datos del producto (nombre, tamaño, stock, precio)

//──────────────────── Funciones 🔧 ─────────────────────//
// -CartProductItemDataComponent renderiza los componentes que le dan sentido a la pagina
// -DisplayDataComponent se encarga de renderizar la informacion del producto que le pasa CartProductItemData
// -ColumnData se encarga de renderizar los datos de las columnas

//-----------------------------------------------------------------------------//

import { Grid, Tooltip, Typography, type Theme } from "@mui/material";
import type { CartProductItemDataProps, DisplayDataComponentProps } from "@typings/sells/reactComponents";

const ColumnData = ({label = '', value =''}: {label?: string, value: string}): React.ReactNode => {
    return (
        <Grid size={{md: 2}}>
            <Typography
                sx={(theme: Theme) => ({
                    fontSize: theme?.typography?.caption?.fontSize,
                })}
            >
                {label}{value}
            </Typography>
        </Grid>
    )
}

const DisplayDataComponent = ({nameEdited,size, units, price} : DisplayDataComponentProps):React.ReactNode => (
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
        <ColumnData value={nameEdited}/>
        <ColumnData value={size} label="Presentación: "/>
        <ColumnData value={units} label="Unidades: "/>
        <ColumnData value={price} label="Precio unitario: "/>
    </Grid>
)

const CartProductItemDataComponent = ({name = 'Coca Cola', size = '2L', units = '1', price = '2500$'}
    : CartProductItemDataProps):React.ReactNode => {

    const nameEdited: string = name.length > 25 ? `${name.slice(0, 25)}...` : name;

    return (
        <Tooltip title={name}>
            <DisplayDataComponent nameEdited={nameEdited} size={size} units={units} price={price} />
        </Tooltip>
    )
}

export default CartProductItemDataComponent;
