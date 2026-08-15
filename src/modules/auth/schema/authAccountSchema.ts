import { z } from "zod";

// Edición administrativa de rol (PUT /auth/edit-auth). El back también
// valida (y devuelve 403 si quien llama no es admin) — esto es la
// validación de forma antes de pegarle a la API.
export const EditAuthRoleSchema = z.object({
    _id:  z.string().min(1),
    role: z.string().min(1),
});

// Borrado de cuenta en cascada (DELETE /auth/delete-auth).
export const DeleteAuthAccountSchema = z.object({
    _id: z.string().min(1),
});
