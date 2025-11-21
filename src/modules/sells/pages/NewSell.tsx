import { useEffect, useState } from "react";
import { useNavigate} from 'react-router-dom';
import { getProducts } from "../api/sellsApi";
import AppLayout from "../../shared/layout/AppLayout";
import ProductsExhibitor from "./components/ProductsExhibitor";
import type { ProductInterface } from "../../../typings/sells/sellsTypes";
import SimpleDialog from "../../shared/components/SimpleDialog/SimpleDialog";


const NewSellPage = ():React.ReactNode => {

    const [showProducts, setShowProducts] = useState<boolean>(true);
    const [products, setProducts] = useState<ProductInterface[]>([]);
    const navigate = useNavigate();

    useEffect(() => {
      const fetchProducts = async () => {
        const resp = await getProducts();
        if(resp) setProducts(resp);
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
            <ProductsExhibitor products={products} title={'Más vendido'} />
            <SimpleDialog />
        </AppLayout>

    )

}

export default NewSellPage;