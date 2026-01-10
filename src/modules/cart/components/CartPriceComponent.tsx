//─────────────────── Componente 🧩: ProductsList ───────────────────//

//─────────────────── Descripción 📝 ───────────────────//
// Este componente se encarga de mostrar la informacion del precio del carrito
// tiene en cuenta la suma de los productos y el iva
//──────────────────── Funciones 🔧 ─────────────────────//
// CartPrice Componente principal que se encarga de renderizar boxes que muestran la informacion

//-----------------------------------------------------------------------------//

import { Grid} from "@mui/material";
import { formatCurrency } from "../helpers/formatCurrency";
import { CartPriceLabel } from "./CartPriceLabelComponent";
import type { CartPriceProps } from "@typings/sells/reactComponents";

const CartPriceComponent = (
    {productsTotalPrice,ivaPercentage,ivaAmount,total}
    : CartPriceProps): React.ReactNode => {

    return (
        <Grid 
            container 
            display="flex" 
            flexDirection="column" 
            gap={1}
        >
            <CartPriceLabel 
              label="Productos:" 
              nestedValue={formatCurrency(productsTotalPrice)} 
              labelStyles={(theme) => ({
                    alignItems: "center",
                    color: theme?.custom?.white,
                    display: "flex"
                })}
              nestedStyles={(theme) => ({
                    backgroundColor: theme?.custom?.whiteTranslucid,
                    color: theme?.custom?.white,
                })}
            />
          <CartPriceLabel 
            label="IVA +" 
            nestedLabel={`${ivaPercentage}%`} 
            nestedValue={formatCurrency(ivaAmount)} 
            labelStyles={(theme) => ({
              alignItems: "center",
              backgroundColor: theme?.custom?.errorLight,
              color: theme?.palette?.error?.main,
              display: "flex"
            })}
            nestedStyles={(theme) => ({
              backgroundColor: theme?.custom?.errorDark,
              color: theme?.palette?.error?.main
            })}
          />

          <CartPriceLabel 
            label="Total de venta" 
            nestedValue={formatCurrency(total)} 
            labelStyles={(theme) => ({
              alignItems: "center",
              backgroundColor: theme?.custom?.darkSecondary,
              color: theme?.custom?.white,
              display: "flex"
            })}
          />
        </Grid>
    )

}

export default CartPriceComponent;