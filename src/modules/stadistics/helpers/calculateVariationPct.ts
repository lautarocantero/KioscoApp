// Variación porcentual entre el valor actual y el de comparación. null
// cuando no hay base contra la cual comparar (evita dividir por cero o
// mostrar un "+Infinity%" engañoso).
export const calculateVariationPct = (current: number, previous: number): number | null => {
    if (previous <= 0) return null;
    return ((current - previous) / previous) * 100;
};

export default calculateVariationPct;
