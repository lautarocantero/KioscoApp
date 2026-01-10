
//─────────────────── Componente 🧩: SellCartProductsComponent ───────────────────//
//
//─────────────────── Descripción 📝 ───────────────────//
// Este componente se encarga de renderizar las filas de productos vendidos
// dentro de la tabla del carrito de venta.
//
//-----------------------------------------------------------------------------


import { CircularProgress, TableCell, TableRow } from "@mui/material";
import type { ProductTicketType } from "@typings/seller/sellerTypes";
import type { SellCartProductsProps } from "@typings/sells/reactComponents";

const SellCartProductsComponent = ({sellSelected}: SellCartProductsProps): React.ReactNode => {
  if(!sellSelected) {
    return <CircularProgress />
  }

  sellSelected.products?.map((product: Partial<ProductTicketType>, index: number) => {
    const {
      _id,name,price,stock_required
    } = product;

    return (
      <TableRow key={index}>
        <TableCell>{_id}</TableCell>
        <TableCell>{name ? name.length > 30 ? name.substring(0, 30) + "..." : name : ""}</TableCell>
        <TableCell>{price}</TableCell>
        <TableCell>{stock_required}</TableCell>
        <TableCell>{price && stock_required ? price * stock_required + "$" : ""}</TableCell>
      </TableRow>
    )
  }
)}

export default SellCartProductsComponent;