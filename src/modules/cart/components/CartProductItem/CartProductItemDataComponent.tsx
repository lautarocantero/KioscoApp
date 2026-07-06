import { Chip, Grid, Tooltip, Typography, type Theme } from "@mui/material";

type CartProductItemDataProps = {
    name?: string;
    size?: string;
    category?: string; // 📝 opcional hasta que exista en ProductTicketType
}

const CartProductItemDataComponent = ({ name = 'Coca Cola', size = '2L', category }
    : CartProductItemDataProps): React.ReactNode => {

    const nameEdited: string = name.length > 25 ? `${name.slice(0, 25)}...` : name;

    return (
        <Tooltip title={name}>
            <Grid sx={{ flex: 1, minWidth: 0, display: 'flex', flexDirection: 'column', gap: '0.2em' }}>
                <Typography
                    sx={(theme: Theme) => ({
                        color: theme?.custom?.fontColor,
                        fontWeight: 600,
                        fontSize: theme?.typography?.body2?.fontSize,
                    })}
                >
                    {nameEdited}
                </Typography>
                <Typography
                    sx={(theme: Theme) => ({
                        color: theme?.custom?.translucidWhite,
                        fontSize: theme?.typography?.caption?.fontSize,
                    })}
                >
                    {size}
                </Typography>
                {category && (
                    <Chip
                        label={category}
                        size="small"
                        sx={(theme: Theme) => ({
                            alignSelf: 'flex-start',
                            height: '1.4em',
                            fontSize: '0.65rem',
                            fontWeight: 600,
                            color: theme?.palette?.primary?.main,
                            backgroundColor: `${theme?.palette?.primary?.main}22`,
                        })}
                    />
                )}
            </Grid>
        </Tooltip>
    )
}

export default CartProductItemDataComponent;