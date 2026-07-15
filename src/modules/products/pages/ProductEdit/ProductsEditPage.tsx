import ProductForm from "../../components/ProductForm/ProductForm";
import AppLayout from "../../../shared/layout/AppLayout";
import { FormModeComplexEnum } from "@typings/shared/sharedEnums";


const ProductsEditPage = (): React.ReactNode => {
    return (
        <AppLayout>
            <ProductForm mode={FormModeComplexEnum.Edit}   />
        </AppLayout>
    );
};

export default ProductsEditPage;
