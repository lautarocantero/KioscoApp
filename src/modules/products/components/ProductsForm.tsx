import { Grid } from "@mui/material";
import FormGridComponent from "../../shared/components/FormGrid/FormGrid";
import { useFormSteps } from "../../../hooks/shared/useFormSteps";
import FirstStepComponent from "./ProductsFormFirstStep";

const stepsConfig = [
    {
        title: "Datos principales",
        content: <FirstStepComponent />,
    },
    {
        title: "Datos técnicos",
        content: <FirstStepComponent />,
    },
    {
        title: "Datos técnicos II",
        content: <FirstStepComponent />,
    },
    {
        title: "Datos finales",
        content: <FirstStepComponent />,
    },
];

const ProductsFormComponent = ():React.ReactNode => {
    const formSteps = useFormSteps(stepsConfig);

    return(
        <Grid
            container
        >
            <FormGridComponent formSteps={formSteps} />
        </Grid>
    )
};
        
export default ProductsFormComponent;