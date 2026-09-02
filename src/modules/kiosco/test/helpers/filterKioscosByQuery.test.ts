import { describe, expect, it } from "vitest";
import type { KioscoWithStats } from "@typings/kiosco/kioscoTypes";
import { AuthRoleEnum } from "@typings/auth/authEnums";
import { filterKioscosByQuery } from "../../helpers/filterKioscosByQuery";

const buildKiosco = (overrides: Partial<KioscoWithStats> = {}): KioscoWithStats => ({
    _id: "kiosco-1",
    name: "Kiosco Centro",
    address: "Av. Corrientes 1234",
    owner_id: "owner-1",
    invite_code: "ABC123",
    currency: "ARS",
    created_at: "2026-01-01T00:00:00.000Z",
    updated_at: "2026-01-01T00:00:00.000Z",
    role: AuthRoleEnum.Admin,
    sellers_count: 1,
    sells_today_total: 0,
    last_accessed_at: null,
    ...overrides,
});

describe("filterKioscosByQuery", () => {
    const kioscos = [
        buildKiosco({ _id: "k1", name: "Kiosco Norte", address: "Av. Rivadavia 4820" }),
        buildKiosco({ _id: "k2", name: "Kiosco Sur", address: "Av. Sáenz 780, Pompeya" }),
    ];

    it("devuelve la lista completa cuando la query está vacía", () => {
        expect(filterKioscosByQuery(kioscos, "")).toEqual(kioscos);
    });

    it("devuelve la lista completa cuando la query es solo espacios", () => {
        expect(filterKioscosByQuery(kioscos, "   ")).toEqual(kioscos);
    });

    it("filtra por nombre, case-insensitive", () => {
        expect(filterKioscosByQuery(kioscos, "norte")).toEqual([kioscos[0]]);
    });

    it("filtra por dirección", () => {
        expect(filterKioscosByQuery(kioscos, "pompeya")).toEqual([kioscos[1]]);
    });

    it("devuelve un array vacío cuando ningún kiosco matchea", () => {
        expect(filterKioscosByQuery(kioscos, "no existe")).toEqual([]);
    });
});
