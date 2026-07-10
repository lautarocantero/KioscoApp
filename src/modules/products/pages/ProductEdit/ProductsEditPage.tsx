import ProductForm from "../../components/ProductForm/ProductForm";
import AppLayout from "../../../shared/layout/AppLayout";


const ProductsEditPage = (): React.ReactNode => {
    return (
        <AppLayout title="Editar producto">
            <ProductForm mode="edit"  />
        </AppLayout>
    );
};

export default ProductsEditPage;
