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
    payload: { sellId: "sell-1", sellerId: "s1", sellerName: "Lucas Cantero", amount: 2530, currency: "ARS" },
    ...overrides,
});

describe("NotificationListItem", () => {
    it("muestra el mensaje corto de la notificación", () => {
        renderWithTheme(
            <NotificationListItem notification={buildNotification()} onToggleRead={vi.fn()} onGoToDetail={vi.fn()} />
        );

        expect(screen.getByText(/Lucas Cantero ha realizado una venta por/)).toBeInTheDocument();
    });

    it("muestra el ojo abierto cuando no está leída y llama a onToggleRead con el estado actual al presionarlo", () => {
        const onToggleRead = vi.fn();
        renderWithTheme(
            <NotificationListItem
                notification={buildNotification({ status: NotificationStatusEnum.NotReadYet })}
                onToggleRead={onToggleRead}
                onGoToDetail={vi.fn()}
            />
        );

        fireEvent.click(screen.getByLabelText("Marcar como leída"));

        expect(onToggleRead).toHaveBeenCalledWith("notification-1", NotificationStatusEnum.NotReadYet);
    });

    it("muestra el ojo cerrado y la etiqueta 'Marcar como no leída' cuando ya está leída", () => {
        renderWithTheme(
            <NotificationListItem
                notification={buildNotification({ status: NotificationStatusEnum.Readed })}
                onToggleRead={vi.fn()}
                onGoToDetail={vi.fn()}
            />
        );

        expect(screen.getByLabelText("Marcar como no leída")).toBeInTheDocument();
    });

    it("clickear en cualquier parte de la tarjeta llama a onToggleRead (toggle bidireccional)", () => {
        const onToggleRead = vi.fn();
        renderWithTheme(
            <NotificationListItem
                notification={buildNotification({ status: NotificationStatusEnum.Readed })}
                onToggleRead={onToggleRead}
                onGoToDetail={vi.fn()}
            />
        );

        fireEvent.click(screen.getByRole("button", { name: /Lucas Cantero/ }));

        expect(onToggleRead).toHaveBeenCalledWith("notification-1", NotificationStatusEnum.Readed);
    });

    it("la flecha de detalle navega sin togglear el estado de lectura", () => {
        const onToggleRead = vi.fn();
        const onGoToDetail = vi.fn();
        const notification = buildNotification();
        renderWithTheme(
            <NotificationListItem notification={notification} onToggleRead={onToggleRead} onGoToDetail={onGoToDetail} />
        );

        fireEvent.click(screen.getByLabelText("Ver venta"));

        expect(onGoToDetail).toHaveBeenCalledWith(notification);
        expect(onToggleRead).not.toHaveBeenCalled();
    });
});
