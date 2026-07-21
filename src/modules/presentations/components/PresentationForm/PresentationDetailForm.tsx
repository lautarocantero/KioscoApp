import { Box } from "@mui/material";
import { useFormikContext } from "formik";
import { useParams } from "react-router-dom";
import FormCard from "../../../shared/components/FormCard/FormCard";
import Inventory2OutlinedIcon from "@mui/icons-material/Inventory2Outlined";
import { usePresentationDetailStatus } from "../../../../hooks/presentations/usePresentationData";
import GroupBasicInfo from "./GroupBasicInfo";
import GroupStock from "./GroupStock";
import GroupCommercialInfo from "./GroupComercialInfo";
import type { getPresentationEditInitialValues } from "../../schema/PresentationFormSchema";

const PresentationDetailForm = (): React.ReactNode => {
    const { product_id } = useParams<{ product_id: string }>();
    const { values } = useFormikContext<ReturnType<typeof getPresentationEditInitialValues>>();

    const { hasSufficientStock, isNotExpired } = usePresentationDetailStatus(values);

    return (
        <FormCard
            readOnly
            defaultBack={`/products/${product_id}/presentations`}
            header={{
                title: "Detalles de la presentacion",
                subtitle: "Información completa del producto (solo lectura)",
                icon: <Inventory2OutlinedIcon />,
            }}
        >
            <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
                <GroupBasicInfo
                    sku={values.sku}
                    barcode={values.barcode}
                    modelType={values.model_type}
                    modelSize={values.model_size}
                    imageUrl={values.image_url}
                />

                <GroupStock
                    minStock={values.min_stock}
                    stock={values.stock}
                    hasSufficientStock={hasSufficientStock}
                />

                <GroupCommercialInfo
                    price={values.price}
                    expirationDate={values.expiration_date}
                    isNotExpired={isNotExpired}
                />
            </Box>
        </FormCard>
    );
};

export default PresentationDetailForm;
