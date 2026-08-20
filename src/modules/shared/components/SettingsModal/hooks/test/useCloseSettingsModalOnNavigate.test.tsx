import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter, Routes, Route, useNavigate } from "react-router-dom";
import { useCloseSettingsModalOnNavigate } from "../useCloseSettingsModalOnNavigate";

const TestComponent = ({ open, onClose }: { open: boolean; onClose: () => void }) => {
    const navigate = useNavigate();
    useCloseSettingsModalOnNavigate(open, onClose);

    return <button onClick={() => navigate("/other-page")}>go</button>;
};

describe("useCloseSettingsModalOnNavigate", () => {
    it("no cierra el modal en el render inicial (la ruta no cambió)", () => {
        const onClose = vi.fn();

        render(
            <MemoryRouter initialEntries={["/shop"]}>
                <TestComponent open onClose={onClose} />
            </MemoryRouter>
        );

        expect(onClose).not.toHaveBeenCalled();
    });

    it("cierra el modal cuando la ruta cambia mientras está abierto", async () => {
        const user = userEvent.setup();
        const onClose = vi.fn();

        render(
            <MemoryRouter initialEntries={["/shop"]}>
                <Routes>
                    <Route path="*" element={<TestComponent open onClose={onClose} />} />
                </Routes>
            </MemoryRouter>
        );

        await user.click(screen.getByText("go"));

        expect(onClose).toHaveBeenCalledTimes(1);
    });

    it("no hace nada si el modal ya está cerrado (open=false)", async () => {
        const user = userEvent.setup();
        const onClose = vi.fn();

        render(
            <MemoryRouter initialEntries={["/shop"]}>
                <Routes>
                    <Route path="*" element={<TestComponent open={false} onClose={onClose} />} />
                </Routes>
            </MemoryRouter>
        );

        await user.click(screen.getByText("go"));

        expect(onClose).not.toHaveBeenCalled();
    });
});
