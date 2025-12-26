
//─────────────────── Componente 🧩: CartPriceLabel ───────────────────//

//─────────────────── Descripción 📝 ───────────────────//
// Componente visual reutilizable para mostrar etiquetas de precios en un carrito. 
// Permite renderizar un texto principal (label), un texto secundario opcional (nestedLabel) 
// y un valor asociado (nestedValue), con estilos personalizables mediante funciones de tema.

//──────────────────── Funciones 🔧 ─────────────────────//
// - CartPriceLabel Renderiza una fila con alineación a la derecha usando Grid y Typography. 
// - Muestra un Box principal con el label y opcionalmente un nestedLabel. 
// - Si se pasa nestedValue, se renderiza un Box adicional con estilos propios. 
// - Permite inyectar estilos dinámicos a través de props labelStyles y nestedStyles.

//─────────────────── Notas técnicas 💽 ───────────────────//
// - Los estilos se reciben como funciones que aceptan el objeto Theme.

//-----------------------------------------------------------------------------//

import { Grid, Typography, Box, type Theme } from "@mui/material"
import type { CartPriceLabelInterface } from "../../../typings/sells/sellsTypes"

export const CartPriceLabel = ({
  label,
  nestedLabel,
  nestedValue,
  labelStyles,
  nestedStyles
}: CartPriceLabelInterface) => (

  <Grid>
    <Typography display="flex" justifyContent="flex-end" gap={1}>
      <Box
        sx={(theme: Theme) => ({
          padding: "0.3em 0.6em",
          borderRadius: "1em",
          fontWeight: 600,
          fontSize: theme?.typography?.body2.fontSize,
          ...(labelStyles ? labelStyles(theme) : {})
        })}
      >
        {label} {nestedLabel}
        {nestedValue && (
          <Box
            sx={(theme: Theme) => ({
              padding: "0.3em 0.6em",
              borderRadius: "1em",
              marginLeft: "1em",
              ...(nestedStyles ? nestedStyles(theme) : {})
            })}
          >
            {nestedValue}
          </Box>
        )}
      </Box>
    </Typography>
  </Grid>
)
