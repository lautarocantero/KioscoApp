import { describe, it, expect, vi } from "vitest";
import { screen, fireEvent } from "@testing-library/react";
import type { GridRenderCellParams } from "@mui/x-data-grid";
import i18n from "@i18n/i18n";
import type { NotificationEntity } from "@typings/notifications/notificationTypes";
import { NotificationStatusEnum, NotificationTypeEnum } from "@typings/notifications/notificationEnums";
import { buildColumnsForNotifications } from "../../pages/NotificationsPage/components/notificationColumns";
import { renderWithTheme } from "../../../shared/test/utils/setupTests";

const buildNotification = (overrides: Partial<NotificationEntity> = {}): NotificationEntity => ({
    _id: "notification-1",
    type: NotificationTypeEnum.LowStock,
    status: NotificationStatusEnum.NotReadYet,
    createdAt: new Date().toISOString(),
    payload: { presentationId: "p1", productId: "prod-1", productName: "Fideo Matarazzo 500g", units: 5, minStock: 20 },
    ...overrides,
});

const getColumn = (field: string) => {
    const onDeleteRequest = vi.fn();
    const onToggleRead = vi.fn();
    const onGoToDetail = vi.fn();
    const column = buildColumnsForNotifications({ onDeleteRequest, onToggleRead, onGoToDetail, t: i18n.t }).find((col) => col.field === field);
    if (!column) throw new Error(`Column "${field}" not found`);
    return { column, onDeleteRequest, onToggleRead, onGoToDetail };
};

// El DataGrid real completa `value` desde `row[field]`; acá lo simulamos con
// `status` (el único campo que `chipColumn` lee de `.value` en vez de `.row`).
const buildCellParams = (notification: NotificationEntity): GridRenderCellParams<NotificationEntity> =>
    ({ row: notification, value: notification.status } as GridRenderCellParams<NotificationEntity>);

describe("buildColumnsForNotifications", () => {
    it("define las columnas type, date, message, status y actions", () => {
        const columns = buildColumnsForNotifications({ onDeleteRequest: vi.fn(), onToggleRead: vi.fn(), onGoToDetail: vi.fn(), t: i18n.t });
        expect(columns.map((c) => c.field)).toEqual(["type", "date", "message", "status", "actions"]);
    });

    describe("columna type", () => {
        it("muestra el chip de categoría según el tipo", () => {
            const { column } = getColumn("type");

            renderWithTheme(column.renderCell!(buildCellParams(buildNotification({ type: NotificationTypeEnum.LowStock }))));
            expect(screen.getByText("Inventario")).toBeInTheDocument();
        });
    });

    describe("columna message", () => {
        it("renderiza el mensaje corto de stock bajo", () => {
            const { column } = getColumn("message");
            const notification = buildNotification();

            renderWithTheme(column.renderCell!(buildCellParams(notification)));

            expect(screen.getByText("Fideo Matarazzo 500g necesita reposición (5 unidades)")).toBeInTheDocument();
        });
    });

    describe("columna status", () => {
        it("muestra 'No leída' sin color de fondo (chip default)", () => {
            const { column } = getColumn("status");
            renderWithTheme(column.renderCell!(buildCellParams(buildNotification({ status: NotificationStatusEnum.NotReadYet }))));

            const chip = screen.getByText("No leída").closest(".MuiChip-root");
            expect(chip).toHaveClass("MuiChip-colorDefault");
        });

        it("muestra 'Leída' con color de fondo (chip primary)", () => {
            const { column } = getColumn("status");
            renderWithTheme(column.renderCell!(buildCellParams(buildNotification({ status: NotificationStatusEnum.Readed }))));

            const chip = screen.getByText("Leída").closest(".MuiChip-root");
            expect(chip).toHaveClass("MuiChip-colorPrimary");
        });
    });

    describe("columna actions", () => {
        it("llama a onToggleRead con id y estado actual al presionar el ojo", () => {
            const { column, onToggleRead } = getColumn("actions");
            const notification = buildNotification({ status: NotificationStatusEnum.NotReadYet });

            renderWithTheme(column.renderCell!(buildCellParams(notification)));
            fireEvent.click(screen.getByLabelText("Marcar como leída"));

            expect(onToggleRead).toHaveBeenCalledWith("notification-1", NotificationStatusEnum.NotReadYet);
        });

        it("usa la etiqueta 'Marcar como no leída' cuando ya está leída", () => {
            const { column } = getColumn("actions");
            const notification = buildNotification({ status: NotificationStatusEnum.Readed });

            renderWithTheme(column.renderCell!(buildCellParams(notification)));

            expect(screen.getByLabelText("Marcar como no leída")).toBeInTheDocument();
        });

        it("llama a onGoToDetail con la notificación al presionar la flecha", () => {
            const { column, onGoToDetail } = getColumn("actions");
            const notification = buildNotification();

            renderWithTheme(column.renderCell!(buildCellParams(notification)));
            fireEvent.click(screen.getByLabelText("Ver presentación"));

            expect(onGoToDetail).toHaveBeenCalledWith(notification);
        });

        it("llama a onDeleteRequest con id y título al presionar Eliminar", () => {
            const { column, onDeleteRequest } = getColumn("actions");
            const notification = buildNotification();

            renderWithTheme(column.renderCell!(buildCellParams(notification)));
            fireEvent.click(screen.getByLabelText("Eliminar"));

            expect(onDeleteRequest).toHaveBeenCalledWith(
                "notification-1",
                "Fideo Matarazzo 500g necesita reposición (5 unidades)"
            );
        });
    });
});
