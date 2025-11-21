import type { ProductInterface } from "../../../../typings/sells/sellsTypes";
import ProductItem from "./ProductItem";


const ProductsList = ({products}: {products: ProductInterface[]}):React.ReactNode => {
    return (
        <>
            {products.map((prod: ProductInterface) => 
                (<ProductItem product={prod} key={prod._id}/>)
            )}
        </>
    )
}

export default ProductsList;