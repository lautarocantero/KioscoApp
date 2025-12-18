
//─────────────────── Componente 🧩: ProductsExhibitorComponent ───────────────────//

//─────────────────── Descripción 📝 ───────────────────//
// -Renderiza el listado de productos con stock disponible

//──────────────────── Funciones 🔧 ─────────────────────//
// -ProductsExhibitorComponent Vista del listado
//    -ProductsList Listado que muestra los productos 

//-----------------------------------------------------------------------------//

import type { ProductsExhibitorComponentInterface } from "../../../../typings/sells/sellsComponentTypes";
import SimpleGrid from "../../../shared/components/SimpleGrid/SimpleGridComponent";
import ProductsNotFound from "./ProductNotFound";
import ProductsList from "./ProductsList";

const ProductsExhibitorComponent = ({ products, title }: ProductsExhibitorComponentInterface): React.ReactNode => {
  if (!products || !Array.isArray(products)) return <ProductsNotFound />;

  return (
    <SimpleGrid title={title} position={undefined}>
      <ProductsList products={products}/>
    </SimpleGrid>
  );
};

export default ProductsExhibitorComponent;
