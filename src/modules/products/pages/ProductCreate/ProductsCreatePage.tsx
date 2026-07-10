import ProductForm from "../../components/ProductForm/ProductForm";
import AppLayout from "../../../shared/layout/AppLayout";


const ProductsCreatePage = ():React.ReactNode => {
    return (
        <AppLayout title='Crear producto'>
            <ProductForm mode="create" />
        </AppLayout>
    )
}

export default ProductsCreatePage;