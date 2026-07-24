import type { Request } from "express";
import { SellerRol, SellerStatus } from "./sellerEnums";


export interface Seller {
    _id:          string;
    name:         string;
    email:        string;
    password:     string;
    rol:          SellerRol;
    created_at:   string;
    user_status:  SellerStatus;
    __v?:         number;
}

// /*══════════════════════════════════════════════════════════════════════╗
// ║ 🧩 DERIVADOS 🧩🧩🧩🧩🧩🧩🧩🧩🧩🧩🧩🧩🧩🧩🧩🧩🧩🧩🧩🧩🧩                ║
// ╚══════════════════════════════════════════════════════════════════════╝*/

// // derivado para el slice
export interface SellerSliceState {
    sellers:       Seller[];
    isLoading:     boolean;
    errorMessage:  string | null;
}


//──────────────────────────────────────────── 📦 Payloads ────────────────────────────────────────────//

export type CreateSellerPayload = Omit<Seller, "_id" | "__v">;

export type EditSellerPayload = Omit<Seller, "__v">;

export interface DeleteSellerPayload {
    _id: string;
}

//──────────────────────────────────────────── 🌐 Express Requests ────────────────────────────────────────────//

export interface CreateSellerRequest extends Request {
    body: CreateSellerPayload;
}

export interface EditSellerRequest extends Request {
    body: EditSellerPayload;
}

export interface DeleteSellerRequest extends Request {
    body: DeleteSellerPayload;
}

export interface GetSellerByIdRequest extends Request {
    body: { _id: string };
}

export interface GetSellerByNameRequest extends Request {
    body: { name: string };
}

export interface GetSellerByEmailRequest extends Request {
    body: { email: string };
}

export interface GetSellerByRolRequest extends Request {
    body: { rol: SellerRol };
}