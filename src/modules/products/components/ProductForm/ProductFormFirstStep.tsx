import { useFormNavigation } from "../../../shared/context/FormNavigationContext";
import FormCard from "../../../../modules/shared/components/FormCard/FormCard";
import { FormModeComplexEnum } from "@typings/shared/sharedEnums";
import FormFieldsRenderer from "modules/shared/components/FormCard/FormFieldsRenderer";
import type { ProductEditFormValues, ProductFormValues } from "@typings/product/productTypes";
import ProductImagePreview from "modules/shared/components/Image/ProductImagePreview";
import { PRODUCT_FIELD_REGISTRY } from "./ProductFieldRegistry";
import { useFormikContext } from "formik";

const ProductFormFirstStep = (): React.ReactNode => {
    const { actionTitle, submitError, stepErrors } = useFormNavigation();
    const isDetail = actionTitle === FormModeComplexEnum.Detail;
    const { values } = useFormikContext<ProductFormValues>();

    return (
        <FormCard
            submitText={actionTitle === FormModeComplexEnum.Create ? "Crear" : "Actualizar"}
            showButtons={!isDetail}
            header={{
                title:
                    actionTitle === FormModeComplexEnum.Create ? "Crear producto" :
                    actionTitle === FormModeComplexEnum.Edit ? "Editar producto" :
                    "Detalle del producto",
            }}
            submitError={submitError}
            stepErrors={stepErrors}
            readOnly={isDetail}
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
            backPath={`/products`}
        >
            <FormFieldsRenderer<ProductFormValues & ProductEditFormValues>
                idPrefix="product"
                sectionLabel="Datos del producto"
                registry={PRODUCT_FIELD_REGISTRY}
                fields={["name", "brand", "description", "image_url"]}
                icons={{ /* tus iconos actuales */ }}
                renderAfterField={
                    values.image_url ? { image_url: <ProductImagePreview imageUrl={values.image_url} /> } : undefined
                }
            />
        </FormCard>
    );
};

export default ProductFormFirstStep;