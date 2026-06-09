
//── Helper 🦸: getInitialProductDialogValues ──//

// Descripción 📝
// Genera los valores iniciales para el formulario del ProductDialog.

// Lógica 🔧
// - Toma la primera variante de producto o usa un objeto vacío.
// - Devuelve un objeto con `productVariantId`, `productVariant`, `requiredStock` y `totalPrice`.

// Notas técnicas 💽
// - Usado en el componente `ProductDialog` para inicializar Formik.

//-----------------------------------------------------------------------------//

import type { Presentation } from "@typings/productVariant/productVariantTypes";
import type { DialogDataInterface } from "@typings/sells/types";

const emptyProductVariant: Presentation = {
  _id: "",
  brand: "",
  created_at: "",
  description: "",
  expiration_date: "",
  gallery_urls: [],
  image_url: "",
  min_stock: 0,
  model_size: "",
  model_type: "",
  name: "",
  price: 0,
  product_id: "",
  sku: "",
  stock: 0,
  updated_at: "",
};

const getInitialProductDialogValues = (productVariants: Presentation[]): DialogDataInterface => {
  const product: Presentation = productVariants?.length > 0 ? productVariants[0] : emptyProductVariant;
  const productId: string = product._id ?? "";

  return {
    productVariantId: productId,
    productVariant: product,
    requiredStock: product.stock > 0 ? 1 : 0,
    totalPrice: 0,
  };
};

export default getInitialProductDialogValues;
