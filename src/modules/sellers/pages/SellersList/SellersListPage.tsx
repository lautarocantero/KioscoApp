import { type ReactNode } from "react";
import GroupOutlinedIcon from "@mui/icons-material/GroupOutlined";
import DataTable from "../../../shared/components/DataTable/DataTable";
import TableIconHeader from "../../../shared/components/DataTable/TableIconHeader";
import AppLayout from "../../../shared/layout/AppLayout";
import { useSellers } from "../../../../hooks/sellers/useSellers";
import type { Seller } from "@typings/seller/sellerTypes";
import InviteSellerModal from "../../components/InviteSellerModal/InviteSellerModal";

const SellersListPage = (): ReactNode => {
    const {
        sellers,
        loading,
        error,
        clearError,
        deleteDialog,
        handleDeleteCancel,
        handleDeleteConfirm,
        searchTerm,
        setSearchTerm,
        columns,
        isAdmin,
        inviteModalOpen,
        openInviteModal,
        closeInviteModal,
    } = useSellers();

    return (
        <AppLayout fullWidth>
            <TableIconHeader
                icon={<GroupOutlinedIcon />}
                title="Vendedores"
                subtitle="Gestioná el equipo de vendedores de tu negocio."
            />

            <DataTable<Seller>
                rows={sellers}
                columns={columns}
                loading={loading}
                error={error}
                onClearError={clearError}
                emptyMessage="No hay vendedores registrados"
                height={"35em"}
                search={{ value: searchTerm, onChange: setSearchTerm, placeholder: "Nombre del vendedor..." }}
                newItem={isAdmin ? { label: "Agregar vendedor", onClick: openInviteModal } : undefined}
                deleteDialog={{
                    open: deleteDialog.open,
                    title: "Confirmar eliminación",
                    description: (
                        <>
                            ¿Estás seguro de que querés eliminar el vendedor{" "}
                            <strong>{deleteDialog.name}</strong>? Esta acción no se puede deshacer.
                        </>
                    ),
                    confirmLabel: "Eliminar",
                    onConfirm: () => void handleDeleteConfirm(),
                    onCancel: handleDeleteCancel,
                }}
            />

            <InviteSellerModal open={inviteModalOpen} onClose={closeInviteModal} />
        </AppLayout>
    );
};

export default SellersListPage;
