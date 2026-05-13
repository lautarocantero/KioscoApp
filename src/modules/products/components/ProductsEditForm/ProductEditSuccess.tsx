import { Box, Typography, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import type { UpdatedProductInterface } from "@typings/product/productTypes";


// # Componente: ProductEditSuccessComponent
//
// ## Descripción 📦
// Pantalla de confirmación que se muestra luego de una edición exitosa.
// Análogo a `ProductCreatedComponent` pero para el flujo de edición.
//
// ## Props
// - `updatedProduct`: objeto con `_id` y `name` del producto recién actualizado.
//
// ## Funciones 🔧
// - Botón "Ver productos" → navega a la lista de productos.
// - Botón "Seguir editando" → recarga la misma página de edición.
//-----------------------------------------------------------------------------//

interface ProductEditSuccessProps {
    updatedProduct: UpdatedProductInterface;
}

const ProductEditSuccessComponent = ({ updatedProduct }: ProductEditSuccessProps): React.ReactNode => {
    const navigate = useNavigate();

    return (
        <Box
            sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                gap: 3,
                py: 8,
                textAlign: "center",
            }}
        >
            <Typography variant="h5" fontWeight={600}>
                ¡Producto actualizado!
            </Typography>

            <Typography variant="body1" color="text.secondary">
                <strong>{updatedProduct.name}</strong> fue guardado correctamente.
            </Typography>

            <Box sx={{ display: "flex", gap: 2 }}>
                <Button
                    variant="outlined"
                    onClick={() => navigate("/products")}
                >
                    Ver productos
                </Button>

                <Button
                    variant="contained"
                    onClick={() => navigate(`/products/edit/${updatedProduct._id}`)}
                >
                    Seguir editando
                </Button>
            </Box>
        </Box>
    );
};

export default ProductEditSuccessComponent;
