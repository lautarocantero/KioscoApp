// Maneja el plan de la cuenta (KioscoPlanEnum: "standard" | "deluxe").
// El único endpoint de escritura es POST /membership/checkout, que devuelve
// un link de pago real de Mercado Pago — este script NUNCA completa ese
// pago (no está permitido ni es deseable que un script lo haga solo).
// Si hace falta activar el plan, imprime el link y espera a que la persona
// pague a mano antes de seguir.

export const ensurePlan = async (client, desiredPlan, { ask }) => {
  const status = await client.get("/membership/status");
  console.log(`   Plan actual: ${status.plan} (${status.plan_status})`);

  if (status.plan === desiredPlan && status.plan_status === "active") {
    console.log("   Ya está en el plan pedido y activo — no hace falta pagar.");
    return status;
  }

  const checkout = await client.postJson("/membership/checkout", { plan: desiredPlan });
  console.log(`
   💳 Activar el plan "${desiredPlan}" requiere un pago real por Mercado Pago.
   No lo voy a completar por vos — abrí este link y pagá:

     ${checkout.init_point}
`);

  const answer = await ask('   Presioná Enter cuando termines el pago (o escribí "skip" para seguir sin confirmarlo): ');
  if (answer.toLowerCase() === "skip") {
    console.log("   Sigo sin confirmar el plan — puede que algunos pasos siguientes fallen por límites del plan actual.");
    return status;
  }

  const finalStatus = await client.get("/membership/status");
  console.log(`   Plan luego del pago: ${finalStatus.plan} (${finalStatus.plan_status})`);
  return finalStatus;
};

export default ensurePlan;
