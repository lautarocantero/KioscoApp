import { useEffect } from "react";
import AppLayout from "../../../shared/layout/AppLayout";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import type {AppDispatch, RootState as SellStateInterface} from '../../../../store/sell/sellSlice';
import { getSellById } from "../../../../store/sell/sellsThunks";
import { CircularProgress, Grid, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography, type Theme } from "@mui/material";
import type { ProductTicketType } from "../../../../typings/seller/sellerTypes";


const SellDetailPage = ():React.ReactNode => {
    const dispatch = useDispatch<AppDispatch>();

    const { ticket_id } = useParams<{ ticket_id: string }>();
    const { sell } = useSelector((state: SellStateInterface) => state);
    const { sellSelected } = sell;
    

    useEffect(() => {
        if(!ticket_id) return;

        const getSellByIdFunction = async () => {
            await dispatch(getSellById(ticket_id));
        };
        getSellByIdFunction();
    }, [ticket_id])

    if(!sellSelected) {
        return <CircularProgress />
    }

    return (
        <AppLayout isOptions title={`Detalle de la venta`}>
            <Grid 
                container 
                display="flex" 
                flexDirection="column" 
                gap={2}
                sx={{
                    marginTop: { xs: '-2em'}
                }}
            >
            {/*─────────────────── 🔎 Datos generales de la venta ───────────────────*/}
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
        </AppLayout>
    )
}

export default SellDetailPage;