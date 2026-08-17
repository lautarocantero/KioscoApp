import { useTranslation } from "react-i18next";
import ProductCreatedTimeline from "./ProductCreatedTimeline";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import AddOutlinedIcon from "@mui/icons-material/AddOutlined";
import type { ProductCreatedComponentProps } from "@typings/product/productComponentTypes";
import SuccessCard from "../../../../shared/components/SuccessCard/SuccessCard";


const ProductCreated = ({ createdProduct, handleCreatePresentation, handleSeeDetail, handleCreateAnotherProduct, handleBackToProducts }: ProductCreatedComponentProps): React.ReactNode => {
    const { t } = useTranslation();

    return (
        <SuccessCard
            name={createdProduct.name}
            title={t("products.created.title")}
            subtitle={t("products.created.subtitle")}
            timeline={<ProductCreatedTimeline />}
            actions={[
                {
                    label:   t("products.created.actions.createPresentation"),
                    variant: "contained",
                    onClick: handleCreatePresentation,
                    icon:    <AddOutlinedIcon fontSize="small" />,
                },
                {
                    label:   t("products.created.actions.viewDetail"),
                    variant: "outlined",
                    onClick: handleSeeDetail,
                    icon:    <VisibilityOutlinedIcon fontSize="small" />,
                },
                {
                    label:   t("products.created.actions.createAnother"),
                    variant: "outlined",
                    onClick: handleCreateAnotherProduct,
                    icon:    <AddOutlinedIcon fontSize="small" />,
                },
                {
                    label:   t("products.created.actions.viewProducts"),
                    variant: "outlined",
                    onClick: handleBackToProducts,
                    icon:    <VisibilityOutlinedIcon fontSize="small" />,
                },
            ]}
        />
    );
};

export default ProductCreated;