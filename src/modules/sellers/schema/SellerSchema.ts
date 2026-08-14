import { z } from "zod";

export const CreateSellerSchema = z.object({
    name: z.string().min(1),
    email: z.string().email(),
    password: z.string().min(1),
    rol: z.string().min(1),
    created_at: z.string().min(1),
    user_status: z.string().min(1),
});

// Solo para edit-seller. Create/delete de Seller ya no existen en este dominio
// (ver /register y /delete-auth en Auth).
export const EditSellerSchema = z.object({
    _id:           z.string().min(1),
    name:          z.string().min(1).optional(),
    profilePhoto:  z.string().nullable().optional(),
    user_status:   z.string().min(1).optional(),
});