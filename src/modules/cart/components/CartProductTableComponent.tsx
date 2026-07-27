import type { ReactNode } from "react";
import type { ProductTicketType } from "@typings/sells/sellTypes";
import DataTable from "../../shared/components/DataTable/DataTable";
import type { CartProductTableProps } from "@typings/sells/SellComponentTypes";
import { Grid } from "@mui/system";
import CartEmptyComponent from "./EmptyCartComponent";


const CartProductTable = ({ cart, columns }: CartProductTableProps): ReactNode => {

    if (!cart) return null;

    if(cart.length <= 0 ) return <CartEmptyComponent />

    return (
        <Grid size={{ xs: 12, md: 8 }}>
            <DataTable<ProductTicketType>
                rows={cart}
                columns={columns}
                getRowId={(row) => row._id}
                emptyMessage="No hay productos en el carrito"
                height="30em"
            />
        </Grid>
    );
};

export default CartProductTable;