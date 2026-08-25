// Fila de una acción dentro de la matriz de "Roles y permisos" (ver
// src/config/rolesPermissionsMatrix.ts). `labelKey`/`titleKey` son claves de
// traducción (namespace rolesPermissions.* en src/i18n/locales).
export interface RolePermissionAction {
    labelKey: string;
    adminOnly: boolean;
}

export interface RolePermissionDomain {
    titleKey: string;
    actions: RolePermissionAction[];
}
