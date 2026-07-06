import ProductForm from "../../components/ProductForm/ProductForm";
import AppLayout from "../../../shared/layout/AppLayout";


const ProductDetailPage = (): React.ReactNode => {
    return (
        <AppLayout title="Detalle del producto">
            <ProductForm mode="detail" />
        </AppLayout>
    );
};

export default ProductDetailPage;