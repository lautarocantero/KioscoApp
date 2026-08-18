import { z } from "zod";

// Validación de forma antes de sacar/editar el rol de un vendedor del
// kiosco activo. El back también valida (y devuelve 403 si quien llama
// no es admin) — esto solo evita pegarle a la API con ids vacíos.
export const RemoveKioscoMemberSchema = z.object({
    kioscoId: z.string().min(1),
    userId: z.string().min(1),
});

export const UpdateKioscoMemberRoleSchema = z.object({
    kioscoId: z.string().min(1),
    userId: z.string().min(1),
    role: z.string().min(1),
});
