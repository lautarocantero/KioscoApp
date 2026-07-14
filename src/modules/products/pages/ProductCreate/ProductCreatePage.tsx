import ProductForm from "../../components/ProductForm/ProductForm";
import AppLayout from "../../../shared/layout/AppLayout";
import { FormModeComplexEnum } from "@typings/shared/sharedEnums";


const ProductCreatePage = ():React.ReactNode => {
    return (
        <AppLayout title='Crear producto'>
            <ProductForm mode={FormModeComplexEnum.Create} />
        </AppLayout>
    )
}

export default ProductCreatePage;