export enum NotificationTypeEnum {
    LowStock = "low_stock",
    Sale = "sale",
}

// Valores literales pedidos por el negocio: se guardan y comparan tal cual.
export enum NotificationStatusEnum {
    NotReadYet = "not-read-yet",
    Readed = "readed",
}

export enum NotificationFilterEnum {
    All = "all",
    Alerts = "alerts",
    News = "news",
}
