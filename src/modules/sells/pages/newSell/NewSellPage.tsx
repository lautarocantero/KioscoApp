import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "../../../../store/product/productSlice";
import { getProducts } from "../../../../store/product/productThunks";
import type { Product } from '../../../../typings/product/productTypes';
import SimpleSnackbar from "../../../shared/components/SnackBar/SnackBarComponent";
import AppLayout from "../../../shared/layout/AppLayout";
import ProductDialog from "../../components/ProductDialog/ProductDialog";
import ProductsExhibitor from "../../components/ProductList/ProductsExhibitorComponent";
import SellBar from "./components/sellsBar/SellBar";

const NewSellPage = ():React.ReactNode => {

    const dispatch = useDispatch<AppDispatch>();

    const { product } = useSelector((state: RootState) => state);
    const { products } : {products: Product[]} = product;


    useEffect(() => {
      const fetchProducts = async () => {
        await dispatch(getProducts());
      };
      fetchProducts();
    }, []);

    return (
        <AppLayout noCenter fullWidth>
            <SellBar showFilters/>
            <ProductsExhibitor products={products} title={'Más vendido'} />
            <ProductDialog />
            <SimpleSnackbar  />
        </AppLayout>

    )

}

export default NewSellPage;