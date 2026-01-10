
//─────────────────── Componente 🧩: SellCartDataComponent ───────────────────//
//
//─────────────────── Descripción 📝 ───────────────────//
// Este componente renderiza la tabla principal de productos vendidos dentro
// de un carrito de venta. Sirve como contenedor y delega la renderización
// de las filas a `SellCartProductsComponent`.
//
//──────────────────── Funciones 🔧 ─────────────────────//
//
// SellCartDataComponent:
//   • Renderiza el título y la tabla contenedora.
// SellCartProductsComponent:
//   • Renderiza los productos vendidos en filas dentro de la tabla.
//
//-----------------------------------------------------------------------------


import { CircularProgress, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography, type Theme } from "@mui/material";
import type { SellCartDataProps } from "@typings/sells/reactComponents";
import SellCartProductsComponent from "./SellCartProductsComponent";

const SellCartDataComponent = ({sellSelected}: SellCartDataProps ): React.ReactNode => {

  if(!sellSelected) {
    return <CircularProgress />
  }

  return (
    <>
      <Typography
          component={'h2'}
          sx={(theme: Theme) => ({
              color: theme?.custom?.white,
              m: 'auto'
          })}
      >
          Productos vendidos
      </Typography>
      <TableContainer component={Paper}>
        <Table size="small">
          <TableHead>
            <TableRow>
              <TableCell>Id</TableCell>
              <TableCell>Nombre</TableCell>
              <TableCell>Precio unitario</TableCell>
              <TableCell>Cantidad</TableCell>
              <TableCell>Total</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <SellCartProductsComponent sellSelected={sellSelected} />
          </TableBody>
        </Table>
      </TableContainer>

    </>
  )
}

export default SellCartDataComponent;