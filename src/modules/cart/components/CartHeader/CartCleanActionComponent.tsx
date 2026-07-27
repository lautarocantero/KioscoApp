import DeleteSweepIcon from '@mui/icons-material/DeleteSweep';
import type { ReactNode } from 'react';
import type { CartCleanActionProps } from '@typings/sells/SellComponentTypes';
import PrimaryButtonComponent from '../../../shared/components/Buttons/PrimaryButtonComponent';


const CartCleanAction = ({ itemsCount, onClearCart }: CartCleanActionProps): ReactNode => {

    if (itemsCount <= 0) return null;

    return (
        <PrimaryButtonComponent
            buttonText="Vaciar carrito"
            buttonOnClick={onClearCart}
            buttonColor="error"
            buttonWidth="180px"
            icon={<DeleteSweepIcon sx={{ mr: '0.4em' }} />}
        />
    )
}

export default CartCleanAction;