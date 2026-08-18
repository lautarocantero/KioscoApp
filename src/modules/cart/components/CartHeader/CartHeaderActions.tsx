import DeleteSweepIcon from '@mui/icons-material/DeleteSweep';
import { Box } from "@mui/material";
import { useTranslation } from 'react-i18next';
import type { ReactNode } from 'react';
import PrimaryButtonComponent from '../../../shared/components/Buttons/PrimaryButtonComponent';
import type { CartHeaderActionsProps } from '@typings/cart/cartComponentTypes';


const CartHeaderActions = ({ itemsCount, onClearCart }: CartHeaderActionsProps): ReactNode => {
    const { t } = useTranslation();
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
            </Box>

            {hasItems && (
                <PrimaryButtonComponent
                    buttonText={t("cart.header.clearButton")}
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