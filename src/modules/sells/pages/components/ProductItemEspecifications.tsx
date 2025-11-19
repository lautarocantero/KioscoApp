import { Button, Grid, Typography, type Theme } from "@mui/material";
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';

interface QuantityChipInterface {
    color: string,
    label: string,
}

const QuantityChip = ({ color = "red", label }: QuantityChipInterface): React.ReactNode => {
    const fontSize = label.length > 3 ? "0.6em" : "0.7em";

    return (
        <span
            style={{
              border: `1px solid ${color}`,
              borderRadius: "50%",
              color: color,
              width: "2.5em",
              height: "2.5em",
              display: "inline-flex",
              alignItems: "center",
              justifyContent: "center",
              marginLeft: "0.5em",
              textAlign: "center",
              lineHeight: 1,
              whiteSpace: "nowrap",
            }}
        >
            <span style={{ fontSize }}>{label}</span>
        </span>
    );
};

const ProductItemEspecifications = (): React.ReactNode => {

    return (
        <Grid display="flex" flexDirection="column" alignItems="flex-end">
            <Grid 
                sx={(theme: Theme) => ({
                backgroundColor: theme?.custom?.blackTranslucid,
                borderRadius: '1em',
                marginBottom: '0.3em',
                padding: '0.2em 0.5em'
                })}
            >
                <Typography
                    sx={(theme: Theme) => ({
                        fontSize: theme?.typography?.caption?.fontSize,
                        marginBottom: "0.5em",
                    })}
                >
                    <strong>ml</strong> 
                    <QuantityChip  color="red" label="2L"/>
                    <QuantityChip  color="green" label="1.5L"/>
                    <QuantityChip  color="green" label="500ml"/>
                </Typography>
            </Grid>
            <Grid>
                <Button
                    variant="contained"
                    size="small"
                    sx={(theme: Theme) => ({
                        backgroundColor: theme?.custom?.blackTranslucid,
                        border: `0.1em solid ${theme?.palette?.primary?.main}`,
                        borderRadius: '0.7em',
                        color: theme?.custom?.fontColor,
                        textTransform: "none",
                        fontSize: theme?.typography?.caption?.fontSize,
                        padding: "0.3em 1em",
                    })}
                >
                    Añadir
                    <AddShoppingCartIcon 
                        sx={(theme: Theme) => ({
                            backgroundColor: theme?.palette?.primary?.main,
                            borderRadius: '1em',
                            fontSize: theme?.typography?.h2?.fontSize,
                            padding: '0.1em',
                            marginLeft: '0.3em',
                        })}
                    />
                </Button>
            </Grid>
        </Grid>
    )
}

export default ProductItemEspecifications;