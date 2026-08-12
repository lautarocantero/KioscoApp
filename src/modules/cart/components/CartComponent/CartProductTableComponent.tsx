import { memo, type ReactNode } from "react";
import type { ProductTicketWithStockType } from "@typings/sells/sellTypes";
import DataTable from "../../../shared/components/DataTable/DataTable";
import { Grid } from "@mui/system";
import CartEmptyComponent from "./EmptyCartComponent";
import type { CartProductTableProps } from "@typings/seller/sellerComponentTypes";


const CartProductTable = ({ cart, columns }: CartProductTableProps): ReactNode => {

    if (!cart) return null;

    if(cart.length <= 0 ) return <CartEmptyComponent />

    return (
        <Grid size={{ xs: 12, md: 8 }}>
            <DataTable<ProductTicketWithStockType>
                rows={cart}
                columns={columns}
                getRowId={(row) => row._id}
                emptyMessage="No hay productos en el carrito"
                height="30em"
            />
        </Grid>
    );
};

export default memo(CartProductTable);