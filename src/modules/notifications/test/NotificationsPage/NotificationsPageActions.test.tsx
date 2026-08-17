import { describe, it, expect, vi } from "vitest";
import { screen, fireEvent } from "@testing-library/react";
import NotificationsPageActions from "../../pages/NotificationsPage/components/NotificationsPageActions";
import { renderWithTheme } from "../../../shared/test/utils/setupTests";

describe("NotificationsPageActions", () => {
    it("llama a onMarkAllAsRead al presionar 'Marcar todas como leídas'", () => {
        const onMarkAllAsRead = vi.fn();
        renderWithTheme(
            <NotificationsPageActions onMarkAllAsRead={onMarkAllAsRead} onDeleteAll={vi.fn()} disabled={false} />
        );

        fireEvent.click(screen.getByText("Marcar todas como leídas"));

        expect(onMarkAllAsRead).toHaveBeenCalled();
    });

    it("llama a onDeleteAll al presionar 'Eliminar todas'", () => {
        const onDeleteAll = vi.fn();
        renderWithTheme(
            <NotificationsPageActions onMarkAllAsRead={vi.fn()} onDeleteAll={onDeleteAll} disabled={false} />
        );

        fireEvent.click(screen.getByText("Eliminar todas"));

        expect(onDeleteAll).toHaveBeenCalled();
    });

    it("deshabilita ambos botones cuando disabled es true", () => {
        renderWithTheme(
            <NotificationsPageActions onMarkAllAsRead={vi.fn()} onDeleteAll={vi.fn()} disabled />
        );

        expect(screen.getByText("Marcar todas como leídas").closest("button")).toBeDisabled();
        expect(screen.getByText("Eliminar todas").closest("button")).toBeDisabled();
    });
});
