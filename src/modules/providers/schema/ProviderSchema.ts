import { z } from "zod";

export const CreateProviderSchema = z.object({
    name:           z.string().min(1),
    valoration:     z.number().min(1).max(5),
    contact_phone:  z.string().min(1),
    contact_email:  z.string().email(),
});

export const EditProviderSchema = z.object({
    _id:            z.string().min(1),
    name:           z.string().min(1).optional(),
    valoration:     z.number().min(1).max(5).optional(),
    contact_phone:  z.string().min(1).optional(),
    contact_email:  z.string().email().optional(),
});

export const DeleteProviderSchema = z.object({
    _id: z.string().min(1),
});
