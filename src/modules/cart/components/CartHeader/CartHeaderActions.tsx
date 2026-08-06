import DeleteSweepIcon from '@mui/icons-material/DeleteSweep';
import { Box } from "@mui/material";
import type { ReactNode } from 'react';
import PrimaryButtonComponent from '../../../shared/components/Buttons/PrimaryButtonComponent';
import type { CartHeaderActionsProps } from '@typings/seller/sellerComponentTypes';
import BarcodeButtonComponent from '../../../sellers/components/CatalogHeader/BarcodeButtonComponent';
import { useSellbar } from '@hooks/sellers/useSellBar';


const CartHeaderActions = ({ itemsCount, onClearCart }: CartHeaderActionsProps): ReactNode => {
    const { barcode } = useSellbar();
    const hasItems = itemsCount > 0;

    return (
        <Box
            display="flex"
            alignItems="center"
            flexDirection={{ xs: "column", sm: "row" }}
            justifyContent={hasItems ? "space-between" : "flex-start"}
            width="100%"
            gap={1.5}
        >
            <Box
                sx={{
                    width: { xs: "100%", sm: hasItems ? "auto" : "fit-content" },
                    minWidth: { sm: "180px" },
                    flexGrow: hasItems ? 1 : 0,
                    maxWidth: { sm: "320px" },
                }}
            >
                <BarcodeButtonComponent barcode={barcode} />
            </Box>

            {hasItems && (
                <PrimaryButtonComponent
                    buttonText="Vaciar carrito"
                    buttonOnClick={onClearCart}
                    buttonColor="error"
                    buttonWidth="180px"
                    marginTop="0"
                    icon={<DeleteSweepIcon sx={{ mr: '0.4em' }} />}
                />
            )}
        </Box>
    )
}

export default CartHeaderActions;