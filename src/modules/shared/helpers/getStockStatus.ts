
export const getStockStatus = ({stock, minStock} : {stock: number, minStock: number}) => {
  if (stock <= 0) return { label: 'Sin stock', color: 'error' as const };
  if (stock <= minStock) return { label: 'Stock bajo', color: 'warning' as const };
  return { label: 'En stock', color: 'success' as const };
};