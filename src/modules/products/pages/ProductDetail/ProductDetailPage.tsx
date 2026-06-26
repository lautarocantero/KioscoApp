import AppLayout from "../../../shared/layout/AppLayout";
import ProductDetailFormComponent from "./components/ProductDetailForm";


const ProductDetailPage = (): React.ReactNode => {
    return (
        <AppLayout title="Detalle del producto">
            <ProductDetailFormComponent />
        </AppLayout>
    );
};

export default ProductDetailPage;