import AppLayout from "../../../../shared/layout/AppLayout";
import ProductsFormComponent from "../../../components/ProductsForm/ProductsForm"; 


const ProductsCreatePage = ():React.ReactNode => {

    return (
        <AppLayout title='Crear producto'>
            <ProductsFormComponent />
        </AppLayout>
    )

}

export default ProductsCreatePage;