import { useTheme } from "@mui/material/styles";
import ProductFormFields from "./ProductFormFields";
import { useFormNavigation } from "../../../shared/context/FormNavigationContext";
import FormCard from "../../../../modules/shared/components/FormCard/FormCard";
import Inventory2OutlinedIcon from "@mui/icons-material/Inventory2Outlined";
import LocalOfferOutlinedIcon from "@mui/icons-material/LocalOfferOutlined";
import DescriptionOutlinedIcon from "@mui/icons-material/DescriptionOutlined";
import LinkOutlinedIcon from "@mui/icons-material/LinkOutlined";

const ProductFormFirstStep = (): React.ReactNode => {
    const theme = useTheme();
    const { actionTitle, submitError, stepErrors } = useFormNavigation();
    const isEdit   = actionTitle === "edit";
    const isDetail = actionTitle === "detail";

    const title = isDetail ? "Detalle del Producto" : isEdit ? "Editar Producto" : "Crear Producto";

    return (
        <FormCard
            submitText={isEdit ? "Guardar" : "Crear"}
            showButtons={!isDetail}
            readOnly={isDetail}
            header={{ title }}
            submitError={submitError}
            stepErrors={stepErrors}
            accordion={
                isDetail
                    ? undefined
                    : {
                          title: "¿Cómo funciona?",
                          content:
                              "Creá el producto una sola vez (nombre, marca, descripción) y luego agregás sus presentaciones (2L, retornable, lata...) con el stock y precio de cada una.",
                          bannerImage: {
                              src: "/images/productExample/ilustration.png",
                              alt: "Producto y presentaciones",
                          },
                      }
            }
        >
            <ProductFormFields
                readOnly={isDetail}
                icons={{
                    name: { icon: <Inventory2OutlinedIcon fontSize="small" />, color: theme.custom.accents.violet },
                    brand: { icon: <LocalOfferOutlinedIcon fontSize="small" />, color: theme.custom.accents.pink },
                    description: { icon: <DescriptionOutlinedIcon fontSize="small" />, color: theme.custom.accents.violet },
                    image_url: { icon: <LinkOutlinedIcon fontSize="small" />, color: theme.custom.accents.green },
                }}
            />
        </FormCard>
    );
};

export default ProductFormFirstStep;