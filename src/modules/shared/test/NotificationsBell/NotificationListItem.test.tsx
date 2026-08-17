import { describe, it, expect, vi } from "vitest";
import { screen, fireEvent } from "@testing-library/react";
import NotificationListItem from "../../components/NotificationsBell/NotificationListItem";
import { NotificationStatusEnum, NotificationTypeEnum } from "@typings/notifications/notificationEnums";
import type { NotificationEntity } from "@typings/notifications/notificationTypes";
import { renderWithTheme } from "../utils/setupTests";

const buildNotification = (overrides: Partial<NotificationEntity> = {}): NotificationEntity => ({
    _id: "notification-1",
    type: NotificationTypeEnum.Sale,
    status: NotificationStatusEnum.NotReadYet,
    createdAt: new Date().toISOString(),
    payload: { sellerId: "s1", sellerName: "Lucas Cantero", amount: 2530, currency: "ARS" },
    ...overrides,
});

describe("NotificationListItem", () => {
    it("muestra el mensaje corto de la notificación", () => {
        renderWithTheme(<NotificationListItem notification={buildNotification()} onToggleRead={vi.fn()} />);

        expect(screen.getByText(/Lucas Cantero ha realizado una venta por/)).toBeInTheDocument();
    });

    it("muestra el ojo abierto cuando no está leída y llama a onToggleRead al hacer click", () => {
        const onToggleRead = vi.fn();
        renderWithTheme(
            <NotificationListItem
                notification={buildNotification({ status: NotificationStatusEnum.NotReadYet })}
                onToggleRead={onToggleRead}
            />
        );

        const button = screen.getByLabelText("Marcar como leída");
        fireEvent.click(button);

        expect(onToggleRead).toHaveBeenCalledWith("notification-1");
    });

    it("muestra el ojo cerrado cuando ya está leída", () => {
        renderWithTheme(
            <NotificationListItem
                notification={buildNotification({ status: NotificationStatusEnum.Readed })}
                onToggleRead={vi.fn()}
            />
        );

        expect(screen.getByLabelText("Ya leída")).toBeInTheDocument();
    });
});
