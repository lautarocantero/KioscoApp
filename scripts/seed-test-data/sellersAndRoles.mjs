// Vendedores = cuentas de Auth completas que se unen al kiosco por código de
// invitación (el backend no tiene un "seller" liviano separado — ver
// README). Y el cambio de rol de un miembro, sobre el kiosco del dueño.

import { ApiClient } from "./apiClient.mjs";

export const setMemberRole = async (ownerClient, kioscoId, userId, role) => {
  ownerClient.setActiveKiosco(kioscoId);
  await ownerClient.request(`/kiosco/${kioscoId}/member/${userId}/role`, {
    method: "PUT",
    json: { role },
  });
};

// Registra una cuenta nueva, la loguea, y la une al kiosco con `inviteCode`.
// Devuelve su propio ApiClient (sesión independiente) + credenciales, para
// poder usarla después como seller_id/seller_name de una venta.
export const createAndJoinSeller = async ({ apiUrl, inviteCode, index, namePrefix }) => {
  const runId = Math.random().toString(36).slice(2, 8);
  const email = `stocko.qa+seller${index}.${runId}@example.com`;
  const password = `Qa${runId}Sx1!9`;
  const name = `${namePrefix} Vendedor ${index}`;

  const client = new ApiClient(apiUrl);
  await client.postJson("/auth/register", { name, email, password, repeatPassword: password, profilePhoto: null });
  const { user } = await client.postJson("/auth/login", { email, password, rememberMe: true });
  const { kiosco } = await client.postJson("/kiosco/join", { invite_code: inviteCode });

  return { client, id: user._id, name, email, password, kioscoId: kiosco._id };
};

export default createAndJoinSeller;
