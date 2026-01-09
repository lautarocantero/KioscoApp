
//─────────────────── Componente 🧩: SellDialog & SellDialogContent ───────────────────//
//
//─────────────────── Descripción 📝 ───────────────────//
// Componente modal encargado de mostrar el detalle completo de una venta seleccionada.  
// Renderiza información general de la venta (fechas, vendedor, método de pago, totales)  
// y una tabla con el detalle de los productos asociados.  
// Se integra con el contexto `SellDialogContext` para controlar la apertura/cierre del modal  
// y con el store de Redux para obtener la venta seleccionada (`sellSelected`).  
//
//──────────────────── Funciones 🔧 ─────────────────────//
// - `SellDialogContent`: recibe un objeto `SellTicketType` y renderiza:
//   • Tabla con datos generales de la venta (fecha, vendedor, método de pago, subtotal, IVA, total, moneda).  
//   • Tabla con productos, mostrando id, nombre truncado a 30 caracteres, precio unitario, cantidad y total calculado.  
//   • Si no hay venta seleccionada, muestra un `CircularProgress`.  
//
// - `SellDialog`: componente principal del modal que:
//   • Consume `showModal` y `setShowModal` desde `SellDialogContext`.  
//   • Obtiene `sellSelected` desde el store de Redux.  
//   • Renderiza un `Dialog` con título, contenido (`SellDialogContent`) y acciones (botón de cierre).  
//
//─────────────────── Notas técnicas 💽 ───────────────────//
// - Se utiliza `Table` y `TableContainer` de MUI para mostrar datos en formato tabular.  
// - Los nombres de productos se truncan a 30 caracteres para evitar desbordes visuales.  
// - El cálculo del total por producto se realiza multiplicando `price * stock_required`.  
// - El modal se configura con `maxWidth="lg"` y `fullWidth` para ocupar mayor espacio en pantalla.  
// - Se aplican estilos personalizados mediante `sx` y el objeto `Theme` para colores y tipografía.  
// - El botón "Cerrar" dispara `setShowModal(false)` para ocultar el modal.  
//
//-----------------------------------------------------------------------------//


import { Button, CircularProgress, Dialog, DialogActions, DialogContent, DialogTitle, Grid, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, type Theme } from "@mui/material";
import { useContext } from "react";
import { useSelector } from "react-redux";
import type { RootState as SellState } from '../../../../store/sell/sellSlice';
import type { ProductTicketType } from "../../../../typings/seller/sellerTypes";
import type { SellTicketType } from "../../../../typings/sells/types/sellsTypes";
import { SellDialogContext } from "../../context/Sell/SellDialogContext";

const SellDialogContent = ({ sellSelected }: { sellSelected: SellTicketType | null }): React.ReactNode => {
  if (!sellSelected) {
    return <CircularProgress />;
  }

  return (
    <Grid container display="flex" flexDirection="column" gap={2}>
      {/*─────────────────── 🔎 Datos generales de la venta ───────────────────*/}
      <TableContainer component={Paper}>
        <Table size="small">
          <TableBody>
            <TableRow>
              <TableCell>Fecha de compra</TableCell>
              <TableCell>{sellSelected.purchase_date}</TableCell>
            </TableRow>
            {sellSelected.modification_date && (
              <TableRow>
                <TableCell>Fecha de modificación</TableCell>
                <TableCell>{sellSelected.modification_date}</TableCell>
              </TableRow>
            )}
            <TableRow>
              <TableCell>Vendedor</TableCell>
              <TableCell>{sellSelected.seller_name}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Método de pago</TableCell>
              <TableCell>{sellSelected.payment_method}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Subtotal</TableCell>
              <TableCell>{sellSelected.sub_total}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>IVA</TableCell>
              <TableCell>{sellSelected.iva}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Total</TableCell>
              <TableCell>{sellSelected.total_amount}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Moneda</TableCell>
              <TableCell>{sellSelected.currency}</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>

      {/*─────────────────── 🔎 Tabla de productos ───────────────────*/}
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
            {sellSelected.products?.map((product: ProductTicketType, index: number) => (
              <TableRow key={index}>
                <TableCell>{product._id}</TableCell>
                <TableCell>{product.name.length > 30 ? product.name.substring(0, 30) + '...' : product.name}</TableCell>
                <TableCell>{product.price}</TableCell>
                <TableCell>{product.stock_required}</TableCell>
                <TableCell>{product.price * product.stock_required}$</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Grid>
  );
};

const SellDialog = (): React.ReactNode => { 

    const { showModal, setShowModal } = useContext(SellDialogContext)!;
    const { sell } = useSelector((state: SellState) => state);
    const { sellSelected } : { sellSelected: SellTicketType | null } = sell;

    return (
        <Dialog 
            key={String(sellSelected)}
            open={showModal} 
            onClose={() => setShowModal(false)}
            sx={(theme: Theme) => ({
              backgroundColor: theme?.custom?.backgroundDark, 
              width: '100%',
            })}
            maxWidth="lg"
        >
            <DialogTitle
              sx={(theme: Theme) => ({
                backgroundColor: theme?.custom?.backgroundLigth, 
                color: theme?.custom?.fontColor,
                fontSize: theme?.typography?.h5?.fontSize,
                width: '100%',
                textAlign: 'center',
              })}
            >
              Venta
            </DialogTitle>
            <DialogContent
              sx={(theme: Theme) => ({
                backgroundColor: theme?.custom?.backgroundLigth, 
                color: theme?.custom?.fontColor,
                width: '100%',
                padding: { xs: '0.1em', sm: '2em', }
              })}
            >
              <SellDialogContent sellSelected={sellSelected} />
            </DialogContent>
            <DialogActions
              sx={(theme: Theme) => ({
                backgroundColor: theme?.custom?.backgroundLigth, 
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'space-between',
              })}
            >
              <Button
                onClick={() => setShowModal(false)}
                sx={(theme: Theme) => ({
                  color: theme?.custom?.whiteTranslucid,
                })}
              >
                Cerrar
              </Button>
            </DialogActions>
        </Dialog>
    );
}

export default SellDialog;