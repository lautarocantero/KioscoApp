import type { Product } from "../../../../typings/product/productTypes";
import type { ProductListType } from "../../../../typings/sells/sellsComponentTypes";
import ProductItem from "./ProductItem";


const ProductsList = ({products}: ProductListType):React.ReactNode => {
    return (
        <>
            {products.map((prod: Product) => 
                (<ProductItem key={prod._id} product={prod as Product} />)
            )}
        </>
    )
}

export default ProductsList;