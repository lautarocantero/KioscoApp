// ─── Componente 🧩: ProductsListPage ─────────────────────────────────────────
// Página de administración del listado de productos.
// Orquesta GenericDataGrid + ConfirmDialog + PageHeader + RowActionsCell.
// Toda la lógica de negocio (fetch, delete, estado) vive acá;
// los componentes hijos son puramente presentacionales.

import React, { useCallback, useEffect, useState } from "react";
import { Alert, Button, Chip, Tooltip, Typography } from "@mui/material";
import { type GridColDef, type GridRenderCellParams } from "@mui/x-data-grid";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import type { Product } from "@typings/product/productTypes";
import {
  deleteProductRequest,
  getProductsRequest,
} from "../../api/productApi";
import RowActionsCell from "../../../shared/components/GenericDataGrid/RowActionsCell";
import PageHeader from "../../../shared/components/GenericDataGrid/PageHeader";
import GenericDataGrid from "../../../shared/components/GenericDataGrid/GenericDataGrid";
import ConfirmDialog from "../../../shared/components/ConfirmDialog/ConfirmDialog";
import AppLayout from "../../../../modules/shared/layout/AppLayout";
import LoupeIcon from '@mui/icons-material/Loupe';

// ─── helpers ──────────────────────────────────────────────────────────────────

const formatDate = (iso: string): string =>
  new Date(iso).toLocaleDateString("es-AR", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });

const truncate = (text: string, max = 50): string =>
  text.length <= max ? text : `${text.slice(0, max - 1)}…`;

const resolveErrorMessage = (err: unknown): string => {
  if (axios.isAxiosError(err)) {
    return (
      (err.response?.data as { message?: string })?.message ?? err.message
    );
  }
  return err instanceof Error ? err.message : "Error desconocido";
};

// ─── tipos locales ────────────────────────────────────────────────────────────

interface DeleteDialogState {
  open: boolean;
  id: string;
  name: string;
}

const CLOSED_DIALOG: DeleteDialogState = { open: false, id: "", name: "" };

// ─── columnas de producto ─────────────────────────────────────────────────────
// Se definen fuera del componente para evitar recrearlas en cada render.
// Las acciones se inyectan desde la página vía `buildColumns`.

type BuildColumnsArgs = {
  onDeleteRequest: (id: string, name: string) => void;
  navigate: ReturnType<typeof useNavigate>;
};

const buildColumns = ({
  onDeleteRequest,
  navigate,
}: BuildColumnsArgs): GridColDef[] => [
  {
    field: "name",
    headerName: "Nombre",
    flex: 1.5,
    minWidth: 160,
  },
  {
    field: "brand",
    headerName: "Marca",
    flex: 1,
    minWidth: 120,
  },
  {
    field: "description",
    headerName: "Descripción",
    flex: 2,
    minWidth: 200,
    renderCell: (params: GridRenderCellParams<Product, string>) => (
      <Tooltip title={params.value ?? ""}>
        <span>{truncate(params.value ?? "", 60)}</span>
      </Tooltip>
    ),
  },
  {
    field: "variants",
    headerName: "Presentaciones",
    flex: 1.5,
    minWidth: 180,
    sortable: false,
    renderCell: (params: GridRenderCellParams<Product>) => {
      const variants = params.row.variants ?? [];
      const variantNames: string = variants
        .map((v: { name?: string }) => v.name ?? "")
        .filter(Boolean)
        .join(", ");
      const display = truncate(variantNames, 50);

      return (
        <Tooltip title={variantNames}>
          <>
            {variants.length > 0 ? (
              <Chip
                label={display}
                size="small"
                variant="outlined"
                sx={{ maxWidth: 160, fontSize: "0.72rem" }}
              />
            ) : (
              <Typography variant="caption" color="text.disabled">
                Sin presentaciones
              </Typography>
            )}
          </>
        </Tooltip>
      );
    },
  },
  {
    field: "created_at",
    headerName: "Creado",
    width: 110,
    renderCell: (params: GridRenderCellParams<Product, string>) =>
      formatDate(params.value ?? ""),
  },
  {
    field: "updated_at",
    headerName: "Actualizado",
    width: 120,
    renderCell: (params: GridRenderCellParams<Product, string>) =>
      formatDate(params.value ?? ""),
  },
  {
    field: "actions",
    headerName: "Acciones",
    width: 160,
    sortable: false,
    filterable: false,
    align: "center",
    headerAlign: "center",
    renderCell: (params: GridRenderCellParams<Product>) => (
      <RowActionsCell
        onPresentations={() => navigate(`/products/${params.row._id}/presentations`)}
        onView={() => navigate(`/product/${params.row._id}`)}
        onEdit={() => navigate(`/products/${params.row._id}/edit`)}
        onDelete={() => onDeleteRequest(params.row._id, params.row.name)}
      />
    ),
  },
];

// ─── página principal ─────────────────────────────────────────────────────────

const ProductsListPage = (): React.ReactNode => {
  const navigate = useNavigate();

  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [deleteDialog, setDeleteDialog] =
    useState<DeleteDialogState>(CLOSED_DIALOG);

  // ── fetch ──────────────────────────────────────────────────────────────────
  const fetchProducts = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await getProductsRequest();
      setProducts(data);
    } catch (err: unknown) {
      setError(resolveErrorMessage(err));
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    void fetchProducts();
  }, [fetchProducts]);

  // ── handlers de eliminación ────────────────────────────────────────────────
  const handleDeleteRequest = (id: string, name: string) =>
    setDeleteDialog({ open: true, id, name });

  const handleDeleteCancel = () => setDeleteDialog(CLOSED_DIALOG);

  const handleDeleteConfirm = async () => {
    try {
      await deleteProductRequest(deleteDialog.id);
      setProducts((prev) => prev.filter((p) => p._id !== deleteDialog.id));
    } catch (err: unknown) {
      setError(resolveErrorMessage(err));
    } finally {
      handleDeleteCancel();
    }
  };

  // ── columnas (memorizadas por dependencias estables) ───────────────────────
  const columns = buildColumns({ onDeleteRequest: handleDeleteRequest, navigate });

  // ── render ─────────────────────────────────────────────────────────────────
  return (
    <AppLayout>
      <div style={{ padding: 24 }}>
        <PageHeader
          title="Productos"
          action={
            <Button variant="contained" size="small" href="/products-create">
              <LoupeIcon />
              Nuevo producto
            </Button>
          }
        />

        {error && (
          <Alert severity="error" sx={{ mb: 2 }} onClose={() => setError(null)}>
            {error}
          </Alert>
        )}

        <GenericDataGrid<Product>
          rows={products}
          columns={columns}
          loading={loading}
          emptyMessage="No hay productos registrados"
        />

        <ConfirmDialog
          open={deleteDialog.open}
          title="Confirmar eliminación"
          description={
            <>
              ¿Estás seguro de que querés eliminar el producto{" "}
              <strong>{deleteDialog.name}</strong>? Esta acción no se puede
              deshacer.
            </>
          }
          confirmLabel="Eliminar"
          onConfirm={() => void handleDeleteConfirm()}
          onCancel={handleDeleteCancel}
        />
      </div>
    </AppLayout>
  );
};

export default ProductsListPage;
