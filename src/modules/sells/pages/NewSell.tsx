import { useEffect, useState } from "react";
import { useNavigate} from 'react-router-dom';
import AppLayout from "../../shared/layout/AppLayout";
import ProductsExhibitor from "./components/ProductsExhibitor";
import ProductDialog from "./components/ProductDialog/ProductDialog";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "../../../store/product/productSlice";
import { getProducts } from "../../../store/product/thunks";

const NewSellPage = ():React.ReactNode => {
    const dispatch = useDispatch<AppDispatch>();
    const navigate = useNavigate();
    const { product } = useSelector((state: RootState) => state);
    const { products } = product;
    const [showProducts, setShowProducts] = useState<boolean>(true);


    useEffect(() => {
      const fetchProducts = async () => {
        await dispatch(getProducts());
      };
      fetchProducts();
    }, []);

    if(!showProducts) return (
        <>
            <button onClick={ () => navigate('/qr-scan')}>escanear qr</button>
            <button onClick={ () => setShowProducts(true)}>manualmente</button>
        </>
    )

    return (
        <AppLayout>
            <ProductsExhibitor products={products} title={'Más vendido'} />
            <ProductDialog />
        </AppLayout>

    )

}

export default NewSellPage;