// Arma ventas artificiales (POST /sell/create-sell) repartidas a lo largo
// del mes en curso, rotando vendedor/medio de pago, sobre presentaciones ya
// creadas en el kiosco.

const PAYMENT_METHODS = ["cash", "debit", "credit", "transfer"];
const PARTIAL_SELL_CHANCE = 0.08; // ~8% de las ventas quedan como "parcial", para poder probar esa vista también

const pad2 = (n) => String(n).padStart(2, "0");

// dd/mm/yyyy — mismo formato que arma el resto de la app al generar un
// ticket (ver purchase_date en useCart.ts / settleSellDebtThunk).
const formatPurchaseDate = (date) => `${pad2(date.getDate())}/${pad2(date.getMonth() + 1)}/${date.getFullYear()}`;

const randomInt = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;

const pickRandom = (list) => list[randomInt(0, list.length - 1)];

// Una fecha por venta, entre el día 1 del mes actual y hoy (nunca a futuro).
export const generatePurchaseDates = (count) => {
  const now = new Date();
  const lastDay = now.getDate();
  return Array.from({ length: count }, () => formatPurchaseDate(new Date(now.getFullYear(), now.getMonth(), randomInt(1, lastDay))));
};

const buildLineItem = (presentation) => {
  const isWeight = presentation.sale_type === "weight";
  const units = randomInt(1, 3);
  const stockRequired = isWeight ? units * 100 : units; // venta por peso avanza de a 100g

  return {
    _id: presentation.id,
    product_id: presentation.productId,
    sku: presentation.sku,
    name: presentation.name,
    description: presentation.description ?? "",
    brand: presentation.brand ?? "",
    model_type: presentation.model_type,
    model_size: presentation.model_size,
    price: presentation.price,
    expiration_date: "",
    image_url: "",
    stock_required: stockRequired,
    sale_type: presentation.sale_type,
  };
};

const calculateAmount = (item) =>
  item.sale_type === "weight" ? (item.price * item.stock_required) / 100 : item.price * item.stock_required;

export const buildArtificialSell = ({ presentations, sellers, ivaPercentage, purchaseDate }) => {
  const lineCount = randomInt(1, 4);
  const items = Array.from({ length: lineCount }, () => buildLineItem(pickRandom(presentations)));

  const subTotal = Math.round(items.reduce((sum, item) => sum + calculateAmount(item), 0));
  const ivaAmount = Math.round((subTotal * ivaPercentage) / 100);
  const total = subTotal + ivaAmount;

  const seller = pickRandom(sellers);
  const isPartial = Math.random() < PARTIAL_SELL_CHANCE;

  return {
    purchase_date: purchaseDate,
    seller_id: seller.id,
    seller_name: seller.name,
    payment_method: pickRandom(PAYMENT_METHODS),
    products: items,
    sub_total: subTotal,
    iva: ivaPercentage,
    total_amount: total,
    currency: "ars",
    status: isPartial ? "parcial" : "completada",
    amount_paid: isPartial ? Math.round(total / 2) : total,
    debtor_name: isPartial ? "Cliente moroso de prueba" : null,
  };
};

export default buildArtificialSell;
