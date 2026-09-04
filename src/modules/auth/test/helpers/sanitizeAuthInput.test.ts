import { describe, expect, it } from "vitest";
import { sanitizeInput, sanitizeRegisterValues } from "../../helpers/sanitizeAuthInput";

describe("sanitizeInput", () => {
    it("no toca nombres legítimos con tildes o ñ", () => {
        expect(sanitizeInput("José Ñuñez", "Name")).toBe("José Ñuñez");
    });

    it("no toca emails válidos", () => {
        expect(sanitizeInput("lautaro@example.com", "Email")).toBe("lautaro@example.com");
    });

    it("reemplaza caracteres fuera del set permitido por '?'", () => {
        expect(sanitizeInput("<script>", "Name")).toBe("?script?");
    });

    it("fuerza a string un valor que no lo es", () => {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        expect(sanitizeInput(123 as any, "Name")).toBe("123");
    });
});

describe("sanitizeRegisterValues", () => {
    it("sanitiza name y email, pero deja password/repeatPassword intactos", () => {
        const result = sanitizeRegisterValues({
            name: "José<script>",
            email: "jose@example.com",
            password: "p@ss<word>",
            repeatPassword: "p@ss<word>",
        });

        expect(result.name).toBe("José?script?");
        expect(result.email).toBe("jose@example.com");
        expect(result.password).toBe("p@ss<word>");
        expect(result.repeatPassword).toBe("p@ss<word>");
    });
});
