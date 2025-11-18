import { useEffect, useState } from "react";
import { useNavigate} from 'react-router-dom';
import { getProducts } from "../api/sellsApi";
import AppLayout from "../../shared/layout/AppLayout";


const NewSellPage = ():React.ReactNode => {

    const [showProducts, setShowProducts] = useState<boolean>(true);
    const navigate = useNavigate();

    useEffect(() => {
      const fetchProducts = async () => {
        await getProducts();
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
            <p>hola</p>
        </AppLayout>

    )

}

export default NewSellPage;