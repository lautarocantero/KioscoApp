import { useFormNavigation } from "../../../shared/context/FormNavigationContext";
import FormCard from "../../../../modules/shared/components/FormCard/FormCard";
import { FormModeComplexEnum } from "@typings/shared/sharedEnums";
import type { ProductEditFormValues, ProductFormValues } from "@typings/product/productTypes";
import { getProductFieldRegistry } from "./ProductFieldRegistry";
import { useFormikContext } from "formik";
import { useTheme } from "@mui/material";
import { useTranslation } from "react-i18next";
import BookmarkBorderOutlinedIcon from "@mui/icons-material/BookmarkBorderOutlined";
import LocalOfferOutlinedIcon from "@mui/icons-material/LocalOfferOutlined";
import DescriptionOutlinedIcon from "@mui/icons-material/DescriptionOutlined";
import LinkOutlinedIcon from "@mui/icons-material/LinkOutlined";
import FormFieldsRenderer from "../../../shared/components/FormCard/FormFieldsRenderer";
import ProductImagePreview from "../../../shared/components/Image/ProductImagePreview";
import { getPublicAssetUrl } from "../../../shared/helpers/getPublicAssetUrl";

const ProductFormFirstStep = (): React.ReactNode => {
    const theme = useTheme();
    const { t } = useTranslation();
    const { actionTitle, submitError, stepErrors } = useFormNavigation();
    const isDetail = actionTitle === FormModeComplexEnum.Detail;
    const { values } = useFormikContext<ProductFormValues>();
    const registry = getProductFieldRegistry(t);

    return (
        <FormCard
            submitText={actionTitle === FormModeComplexEnum.Create ? t("products.form.submit.create") : t("products.form.submit.update")}
            showButtons={!isDetail}
            header={{
                title:
                    actionTitle === FormModeComplexEnum.Create ? t("products.form.header.create") :
                    actionTitle === FormModeComplexEnum.Edit ? t("products.form.header.edit") :
                    t("products.form.header.detail"),
            }}
            submitError={submitError}
            stepErrors={stepErrors}
            readOnly={isDetail}
            accordion={
                isDetail
                    ? undefined
                    : {
                          title: t("products.form.accordion.title"),
                          content: t("products.form.accordion.content"),
                          bannerImage: {
                              src: getPublicAssetUrl("images/productExample/ilustration.png"),
                              alt: t("products.form.accordion.bannerAlt"),
                          },
                      }
            }
            defaultBack={`/products`}
        >
            <FormFieldsRenderer<ProductFormValues & ProductEditFormValues>
                idPrefix="product"
                sectionLabel={t("products.form.sectionLabel")}
                registry={registry}
                fields={["name", "brand", "description", "image_url"]}
                readOnly={isDetail}
                icons={{
                    name: { icon: <BookmarkBorderOutlinedIcon fontSize="small" />, color: theme.custom.accents.violet },
                    brand: { icon: <LocalOfferOutlinedIcon fontSize="small" />, color: theme.custom.accents.pink },
                    description: { icon: <DescriptionOutlinedIcon fontSize="small" />, color: theme.custom.accents.pink },
                    image_url: { icon: <LinkOutlinedIcon fontSize="small" />, color: theme.custom.accents.green },
                }}
                renderAfterField={
                    values.image_url ? { image_url: <ProductImagePreview imageUrl={values.image_url} /> } : undefined
                }
            />
        </FormCard>
    );
};

export default ProductFormFirstStep;