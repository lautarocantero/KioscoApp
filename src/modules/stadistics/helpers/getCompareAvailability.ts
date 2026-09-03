import type { CompareAvailability } from "@typings/stadistics/stadisticsComponentTypes";

// La comparación puede estar bloqueada por dos motivos distintos y no hay
// que confundirlos en el mensaje: el plan Standard directamente no tiene el
// dato (meta.canCompare, resuelto server-side vía PlanService), y el rol
// seller no tiene permiso para verlo aunque el plan sí lo permita (mismo
// criterio que canChangeRange en getSellsPeriodOptionAvailability). El plan
// manda: si el plan ya lo bloquea, ese es el motivo a mostrar, sin importar
// el rol.
export const getCompareAvailability = (canCompareByPlan: boolean, isAdmin: boolean): CompareAvailability => {
    if (!canCompareByPlan) return { canCompare: false, disabledReason: "plan" };
    if (!isAdmin) return { canCompare: false, disabledReason: "admin" };
    return { canCompare: true, disabledReason: null };
};

export default getCompareAvailability;
