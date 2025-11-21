import { Grid, Typography, type Theme } from "@mui/material";
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';

const SimpleDialogContentData = ({data}: {data: string}) => {
    return (
        <Grid 
            display={'inline-block'}
            sx={(theme: Theme) => ({
                backgroundColor: theme?.custom?.backgroundDark,
                borderRadius: '1em',
                p:0.5,
                minWidth:'3em',
                textAlign: 'center',
            })}
        >
            <Typography>{data}</Typography>
        </Grid>

    )
}


const SimpleDialogContent = ({size, stock, price}: {size: string, stock: number, price: number} ):React.ReactNode => {

    return (
        <Grid
            sx={{
                mt: '2em',
            }}
        >
            <Typography>Tamaño: <SimpleDialogContentData data={size}/></Typography>
            <Typography>Unidades: <SimpleDialogContentData data={`${stock}`}/></Typography>
            <Typography>Total: <AttachMoneyIcon/><SimpleDialogContentData data={`${price}`}/></Typography>
        </Grid>
    )
};

export default SimpleDialogContent;