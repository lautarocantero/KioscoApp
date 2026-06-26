import { Box } from "@mui/material";
import type { VariantCreatedActionsProps } from "@typings/presentation/presentationComponentTypes";
import EmptyButton from "../../../../../shared/components/Buttons/EmptyButton";
import PrimaryButtonComponent from "../../../../../shared/components/Buttons/PrimaryButtonComponent";
import { useNavigate } from "react-router-dom";


const VariantCreatedActions = ({ onCreateAnother }: VariantCreatedActionsProps): React.ReactNode => {
    const navigate = useNavigate();

    return (
        <Box sx={{
            display: "flex", flexDirection: "column", gap: 2,
            px: 3, py: 2.5,
            borderTop: "0.5px solid rgba(255,255,255,0.07)",
            backgroundColor: "rgba(0,0,0,0.2)",
        }}>
            <PrimaryButtonComponent
                buttonText="+ Crear otra presentación"
                buttonOnClick={onCreateAnother}
                buttonWidth="100%"
            />
            <EmptyButton
                buttonText="Crear otro producto"
                buttonOnClick={() => navigate("/products/new")}
                buttonWidth="100%"
            />
            <EmptyButton
                buttonText="Ver listado de productos"
                buttonOnClick={() => navigate("/products")}
                buttonWidth="100%"
            />
        </Box>
    );
};

export default VariantCreatedActions;