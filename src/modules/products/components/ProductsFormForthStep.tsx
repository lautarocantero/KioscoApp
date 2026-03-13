// # Componente: ProductsFormStep4
// ## Descripción 📦
// Step 4 del formulario de productos: Datos finales.
// Campos: proveedor (select) con botón para agregar uno nuevo.
// Consume el contexto de Formik mediante useFormikContext.
//-----------------------------------------------------------------------------//

import {
    TextField,
    Grid,
    MenuItem,
    Button,
    type Theme,
} from "@mui/material";
import { useFormikContext } from "formik";
import type { ProductFormValues } from "./ProductsFormSchema";

// Tipo de proveedor — reemplazar con datos reales del store/API
interface Supplier {
    id: string;
    name: string;
}

interface ProductsFormStep4Props {
    suppliers?: Supplier[];
    onAddSupplier?: () => void;
}

const ProductsFormForthStep = ({
    suppliers = [],
    onAddSupplier,
}: ProductsFormStep4Props): React.ReactNode => {
    const { values, errors, setFieldValue } = useFormikContext<ProductFormValues>();

    return (
        <Grid container spacing={2}>
            {/* Proveedor */}
            <Grid spacing={12}>
                <TextField
                    select
                    fullWidth
                    label="Proveedor"
                    value={values.supplierId}
                    onChange={(e) => setFieldValue("supplierId", e.target.value)}
                    error={!!errors.supplierId}
                    helperText={errors.supplierId}
                    variant="standard"
                    sx={(theme: Theme) => ({
                        "& .MuiInputLabel-root": { color: theme?.custom?.fontColorTransparent },
                        "& .MuiInput-underline:before": { borderBottomColor: theme?.custom?.fontColorTransparent },
                        "& .MuiSvgIcon-root": { color: theme?.custom?.fontColorTransparent },
                    })}
                >
                    {suppliers.length === 0 ? (
                        <MenuItem disabled value="">
                            Sin proveedores disponibles
                        </MenuItem>
                    ) : (
                        suppliers.map((supplier) => (
                            <MenuItem key={supplier.id} value={supplier.id}>
                                {supplier.name}
                            </MenuItem>
                        ))
                    )}
                </TextField>
            </Grid>

            {/* Agregar proveedor */}
            <Grid spacing={12}>
                <Button
                    fullWidth
                    variant="outlined"
                    onClick={onAddSupplier}
                    sx={(theme: Theme) => ({
                        borderColor: theme?.custom?.fontColorTransparent,
                        color: theme?.custom?.fontColorTransparent,
                        textTransform: "none",
                    })}
                >
                    Agregar proveedor
                </Button>
            </Grid>
        </Grid>
    );
};

export default ProductsFormForthStep;
