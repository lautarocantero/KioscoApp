
//── Helper 🦸: getInitialProductDialogValues ──//

// Descripción 📝
// Genera los valores iniciales para el formulario del ProductDialog.

// Lógica 🔧
// - Toma la primera variante de producto o usa un objeto vacío.
// - Devuelve un objeto con `productVariantId`, `productVariant`, `requiredStock` y `totalPrice`.

// Notas técnicas 💽
// - Tipado con `DialogDataInterface` y `ProductVariant`.
// - Usado en el componente `ProductDialog` para inicializar Formik.

//-----------------------------------------------------------------------------//


import type { DialogDataInterface } from "@typings/sells/types";
import type { ProductVariant } from "@typings/productVariant/productVariant";

const emptyProductVariant: ProductVariant = {
  _id: "",
  name: "",
  description: "",
  created_at: "",
  updated_at: "",
  image_url: "",
  gallery_urls: [],
  brand: "",
  product_id: "",
  sku: "",
  model_type: "",
  model_size: "",
  min_stock: 0,
  stock: 0,
  price: 0,
  expiration_date: "",
};

const getInitialProductDialogValues = (productVariants: ProductVariant[]): DialogDataInterface => {
  const product: ProductVariant = productVariants?.length > 0 ? productVariants[0] : emptyProductVariant;
  const productId: string = product._id ?? "";

  return {
    productVariantId: productId,
    productVariant: product,
    requiredStock: product.stock > 0 ? 1 : 0,
    totalPrice: 0,
  };
};

export default getInitialProductDialogValues;
