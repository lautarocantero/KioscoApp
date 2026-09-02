import { describe, it, expect, vi } from "vitest";
import { screen, fireEvent } from "@testing-library/react";
import { AuthRoleEnum } from "@typings/auth/authEnums";
import type { KioscoWithStats } from "@typings/kiosco/kioscoTypes";
import { renderWithTheme } from "../../../shared/test/utils/setupTests";
import KioscoGrid from "../../components/KioscoGrid/KioscoGrid";

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

describe("KioscoGrid", () => {
    it("siempre muestra AddKioscoCard primero", () => {
        renderWithTheme(
            <KioscoGrid
                kioscos={[buildKiosco()]}
                loading={false}
                noResults={false}
                entering={null}
                onEnter={vi.fn()}
                onCreate={vi.fn()}
                onJoin={vi.fn()}
            />
        );

        expect(screen.getByText("Sumar un kiosco")).toBeInTheDocument();
    });

    it("muestra 3 skeletons mientras loading es true", () => {
        const { container } = renderWithTheme(
            <KioscoGrid
                kioscos={[buildKiosco()]}
                loading={true}
                noResults={false}
                entering={null}
                onEnter={vi.fn()}
                onCreate={vi.fn()}
                onJoin={vi.fn()}
            />
        );

        expect(container.querySelectorAll(".MuiSkeleton-root").length).toBeGreaterThan(0);
        expect(screen.queryByText("Kiosco Centro")).not.toBeInTheDocument();
    });

    it("renderiza una KioscoCard por cada kiosco recibido", () => {
        renderWithTheme(
            <KioscoGrid
                kioscos={[buildKiosco({ _id: "k1", name: "Kiosco Uno" }), buildKiosco({ _id: "k2", name: "Kiosco Dos" })]}
                loading={false}
                noResults={false}
                entering={null}
                onEnter={vi.fn()}
                onCreate={vi.fn()}
                onJoin={vi.fn()}
            />
        );

        expect(screen.getByText("Kiosco Uno")).toBeInTheDocument();
        expect(screen.getByText("Kiosco Dos")).toBeInTheDocument();
    });

    it("llama a onEnter con el kiosco correspondiente al clickear su botón", () => {
        const onEnter = vi.fn();
        const kiosco = buildKiosco();
        renderWithTheme(
            <KioscoGrid
                kioscos={[kiosco]}
                loading={false}
                noResults={false}
                entering={null}
                onEnter={onEnter}
                onCreate={vi.fn()}
                onJoin={vi.fn()}
            />
        );

        fireEvent.click(screen.getByRole("button", { name: /ingresar al kiosco/i }));

        expect(onEnter).toHaveBeenCalledWith(kiosco);
    });

    it("muestra KioscoNoResults cuando noResults es true y no está cargando", () => {
        renderWithTheme(
            <KioscoGrid
                kioscos={[]}
                loading={false}
                noResults={true}
                entering={null}
                onEnter={vi.fn()}
                onCreate={vi.fn()}
                onJoin={vi.fn()}
            />
        );

        expect(screen.getByText("Ningún kiosco coincide con tu búsqueda.")).toBeInTheDocument();
    });

    it("llama a onCreate/onJoin desde la tarjeta AddKioscoCard", () => {
        const onCreate = vi.fn();
        const onJoin = vi.fn();
        renderWithTheme(
            <KioscoGrid
                kioscos={[]}
                loading={false}
                noResults={false}
                entering={null}
                onEnter={vi.fn()}
                onCreate={onCreate}
                onJoin={onJoin}
            />
        );

        fireEvent.click(screen.getByText("Crear un nuevo kiosco"));
        expect(onCreate).toHaveBeenCalledTimes(1);

        fireEvent.click(screen.getByText("Unirme a un kiosco existente"));
        expect(onJoin).toHaveBeenCalledTimes(1);
    });
});
