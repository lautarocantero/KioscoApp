import { useTranslation } from "react-i18next";
import type { ProductEditedProps } from "@typings/product/productComponentTypes";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import SuccessCard from "../../../../shared/components/SuccessCard/SuccessCard";


const ProductEdited = ({ updatedProduct, handleSeeDetail, handleBackToProducts }: ProductEditedProps): React.ReactNode => {
    const { t } = useTranslation();

    return (
        <SuccessCard
            name={updatedProduct.name}
            title={t("products.edited.title")}
            subtitle={t("products.edited.subtitle")}
            actions={[
                {
                    label:   t("products.edited.actions.viewDetail"),
                    variant: "contained",
                    onClick: handleSeeDetail,
                    icon:    <VisibilityOutlinedIcon fontSize="small" />,
                },
                {
                    label:   t("products.edited.actions.viewProducts"),
                    variant: "outlined",
                    onClick: handleBackToProducts,
                    icon:    <VisibilityOutlinedIcon fontSize="small" />,
                },
            ]}
        />
    );
};

export default ProductEdited;