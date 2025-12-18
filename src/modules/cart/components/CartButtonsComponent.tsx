
//─────────────────── Componente 🧩: ProductsList ───────────────────//

//─────────────────── Descripción 📝 ───────────────────//
// Componente que renderiza los botones del carrito

//-----------------------------------------------------------------------------//

import ReceiptLongIcon from '@mui/icons-material/ReceiptLong';
import { Grid } from "@mui/material";
import { useNavigate, type NavigateFunction } from "react-router-dom";
import EmptyButton from "../../shared/components/Buttons/EmptyButton";
import PrimaryButton from "../../shared/components/Buttons/PrimaryButtonComponent";
import type { CartButtonsComponentInterface } from '../../../typings/sells/sellsTypes';

const CartButtonsComponent = ({generateTicket}: CartButtonsComponentInterface ):React.ReactNode => {
    const navigate: NavigateFunction = useNavigate();

    return (
        <Grid
            container
            sx={{
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'space-between',
                margin: '2em 0 1em',
                width: '100%'
            }}
        >
            <EmptyButton 
                buttonText='Volver' 
                buttonOnClick={() => { navigate('/new-sell')}} 
                buttonWidth={{xs: "50%", sm: '20%', md: '10%' }}
            />
            <PrimaryButton 
                buttonText='Hacer Ticket' 
                buttonOnClick={() => {generateTicket()}} 
                buttonWidth={{xs: "50%", sm: '20%', md: '10%' }} 
                marginTop={'0'} 
                icon={<ReceiptLongIcon/>}
            />
        </Grid>
    );
}

export default CartButtonsComponent;