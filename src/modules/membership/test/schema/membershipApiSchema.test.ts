import { describe, it, expect } from "vitest";
import { CardPaymentSubmitDataSchema, CreateMembershipCheckoutResultSchema } from "../../schema/membershipApiSchema";

describe("CreateMembershipCheckoutResultSchema", () => {
    it("acepta init_point cuando es un dominio de Mercado Pago (flujo redirect)", () => {
        const result = CreateMembershipCheckoutResultSchema.safeParse({
            init_point: "https://www.mercadopago.com.ar/checkout/123",
            preapproval_id: "preapproval-1",
        });

        expect(result.success).toBe(true);
    });

    it("rechaza init_point si no es un dominio de Mercado Pago", () => {
        const result = CreateMembershipCheckoutResultSchema.safeParse({
            init_point: "https://evil.example.com/checkout/123",
            preapproval_id: "preapproval-1",
        });

        expect(result.success).toBe(false);
    });

    it("acepta la respuesta sin init_point (flujo con tarjeta, sin redirect)", () => {
        const result = CreateMembershipCheckoutResultSchema.safeParse({
            preapproval_id: "preapproval-1",
        });

        expect(result.success).toBe(true);
    });

    it("rechaza si falta preapproval_id", () => {
        const result = CreateMembershipCheckoutResultSchema.safeParse({
            init_point: "https://www.mercadopago.com.ar/checkout/123",
        });

        expect(result.success).toBe(false);
    });
});

describe("CardPaymentSubmitDataSchema", () => {
    it("acepta un token no vacío", () => {
        expect(CardPaymentSubmitDataSchema.safeParse({ token: "card-token-123" }).success).toBe(true);
    });

    it("rechaza un token vacío", () => {
        expect(CardPaymentSubmitDataSchema.safeParse({ token: "" }).success).toBe(false);
    });

    it("rechaza si falta el token", () => {
        expect(CardPaymentSubmitDataSchema.safeParse({}).success).toBe(false);
    });
});
