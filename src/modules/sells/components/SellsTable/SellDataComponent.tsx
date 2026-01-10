
//─────────────────── Componente 🧩: SellDataComponent ───────────────────//
//
//─────────────────── Descripción 📝 ───────────────────//
//
// Este componente muestra los datos generales de una venta seleccionada,
// como fechas, vendedor, método de pago y montos.
//
//-----------------------------------------------------------------------------


import { CircularProgress, Paper, Table, TableBody, TableCell, TableContainer, TableRow, Typography, type Theme } from "@mui/material";
import type { SellDataProps } from "@typings/sells/reactComponents";

const SellDataComponent = ({sellSelected}: SellDataProps): React.ReactNode => {

  if(!sellSelected) {
    return <CircularProgress />
  }

  const {
    purchase_date,modification_date,seller_name,payment_method,
    sub_total,iva,total_amount,currency
  } = sellSelected;

  return (
    <>
      <Typography
          component={'h2'}
          sx={(theme: Theme) => ({
              color: theme?.custom?.white,
              m: 'auto'
          })}
      >
          Datos de la venta
      </Typography>
      <TableContainer component={Paper}>
        <Table size="small">
          <TableBody>
            <TableRow>
              <TableCell>Fecha de compra</TableCell>
              <TableCell>{purchase_date}</TableCell>
            </TableRow>
            {modification_date && (
              <TableRow>
                <TableCell>Fecha de modificación</TableCell>
                <TableCell>{modification_date}</TableCell>
              </TableRow>
            )}
            <TableRow>
              <TableCell>Vendedor</TableCell>
              <TableCell>{seller_name}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Método de pago</TableCell>
              <TableCell>{payment_method}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Subtotal</TableCell>
              <TableCell>{sub_total}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>IVA</TableCell>
              <TableCell>{iva}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Total</TableCell>
              <TableCell>{total_amount}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Moneda</TableCell>
              <TableCell>{currency}</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
    </>
  )
}

export default SellDataComponent;