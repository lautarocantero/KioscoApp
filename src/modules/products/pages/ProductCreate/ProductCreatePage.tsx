import ProductForm from "../../components/ProductForm/ProductForm";
import AppLayout from "../../../shared/layout/AppLayout";
import { FormModeComplexEnum } from "@typings/shared/sharedEnums";


const ProductCreatePage = ():React.ReactNode => {
    return (
        <AppLayout>
            <ProductForm mode={FormModeComplexEnum.Create} />
        </AppLayout>
    )
}

export default ProductCreatePage;