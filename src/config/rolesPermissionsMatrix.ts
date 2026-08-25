import type { RolePermissionDomain } from "@typings/permissions/permissionsTypes";

// Fuente de verdad de la info pública "¿Qué puede hacer un vendedor?"
// (RolesPermissionsDialog, disparado desde InviteSellerModal). Cada fila
// debe reflejar una restricción real ya implementada en código — no
// funcionalidades planeadas a futuro — para no mostrarle al usuario algo
// que no es cierto hoy. Actualizar esta lista cada vez que se agregue o
// saque un gate de admin en algún módulo.
export const ROLES_PERMISSIONS_MATRIX: RolePermissionDomain[] = [
    {
        titleKey: "rolesPermissions.domains.kiosco.title",
        actions: [
            { labelKey: "rolesPermissions.domains.kiosco.actions.create", adminOnly: false },
            { labelKey: "rolesPermissions.domains.kiosco.actions.join", adminOnly: false },
            { labelKey: "rolesPermissions.domains.kiosco.actions.switch", adminOnly: false },
            { labelKey: "rolesPermissions.domains.kiosco.actions.invite", adminOnly: true },
            { labelKey: "rolesPermissions.domains.kiosco.actions.changeRole", adminOnly: true },
        ],
    },
    {
        titleKey: "rolesPermissions.domains.products.title",
        actions: [
            { labelKey: "rolesPermissions.domains.products.actions.create", adminOnly: false },
            { labelKey: "rolesPermissions.domains.products.actions.edit", adminOnly: false },
            { labelKey: "rolesPermissions.domains.products.actions.delete", adminOnly: true },
            { labelKey: "rolesPermissions.domains.products.actions.view", adminOnly: false },
            { labelKey: "rolesPermissions.domains.products.actions.stats", adminOnly: false },
        ],
    },
    {
        titleKey: "rolesPermissions.domains.presentations.title",
        actions: [
            { labelKey: "rolesPermissions.domains.presentations.actions.create", adminOnly: false },
            { labelKey: "rolesPermissions.domains.presentations.actions.edit", adminOnly: false },
            { labelKey: "rolesPermissions.domains.presentations.actions.delete", adminOnly: true },
            { labelKey: "rolesPermissions.domains.presentations.actions.restock", adminOnly: false },
            { labelKey: "rolesPermissions.domains.presentations.actions.view", adminOnly: false },
            { labelKey: "rolesPermissions.domains.presentations.actions.providers", adminOnly: false },
        ],
    },
    {
        titleKey: "rolesPermissions.domains.providers.title",
        actions: [
            { labelKey: "rolesPermissions.domains.providers.actions.create", adminOnly: false },
            { labelKey: "rolesPermissions.domains.providers.actions.edit", adminOnly: false },
            { labelKey: "rolesPermissions.domains.providers.actions.delete", adminOnly: true },
            { labelKey: "rolesPermissions.domains.providers.actions.view", adminOnly: false },
            { labelKey: "rolesPermissions.domains.providers.actions.stats", adminOnly: false },
        ],
    },
    {
        titleKey: "rolesPermissions.domains.sells.title",
        actions: [
            { labelKey: "rolesPermissions.domains.sells.actions.sell", adminOnly: false },
            { labelKey: "rolesPermissions.domains.sells.actions.view", adminOnly: false },
            { labelKey: "rolesPermissions.domains.sells.actions.edit", adminOnly: true },
            { labelKey: "rolesPermissions.domains.sells.actions.delete", adminOnly: true },
            { labelKey: "rolesPermissions.domains.sells.actions.settleDebt", adminOnly: false },
        ],
    },
    {
        titleKey: "rolesPermissions.domains.receipts.title",
        actions: [
            { labelKey: "rolesPermissions.domains.receipts.actions.upload", adminOnly: false },
        ],
    },
    {
        titleKey: "rolesPermissions.domains.sellers.title",
        actions: [
            { labelKey: "rolesPermissions.domains.sellers.actions.invite", adminOnly: true },
            { labelKey: "rolesPermissions.domains.sellers.actions.view", adminOnly: false },
            { labelKey: "rolesPermissions.domains.sellers.actions.editOwnName", adminOnly: false },
            { labelKey: "rolesPermissions.domains.sellers.actions.editOtherName", adminOnly: true },
            { labelKey: "rolesPermissions.domains.sellers.actions.editRole", adminOnly: true },
            { labelKey: "rolesPermissions.domains.sellers.actions.remove", adminOnly: true },
        ],
    },
    {
        titleKey: "rolesPermissions.domains.dashboard.title",
        actions: [
            { labelKey: "rolesPermissions.domains.dashboard.actions.view", adminOnly: false },
            { labelKey: "rolesPermissions.domains.dashboard.actions.changeRange", adminOnly: true },
        ],
    },
    {
        titleKey: "rolesPermissions.domains.membership.title",
        actions: [
            { labelKey: "rolesPermissions.domains.membership.actions.manage", adminOnly: true },
        ],
    },
    {
        titleKey: "rolesPermissions.domains.settings.title",
        actions: [
            { labelKey: "rolesPermissions.domains.settings.actions.personal", adminOnly: false },
        ],
    },
];
