import type { ReactNode } from "react";
import type { GridColDef, DataGridProps } from "@mui/x-data-grid";

export interface DataTableSearchConfig {
    value: string;
    onChange: (value: string) => void;
    placeholder?: string;
}

export interface DataTableNewItemConfig {
    label?: string;
    href?: string;
    onClick?: () => void;
}

export interface DataTableDeleteDialogConfig {
    open: boolean;
    title?: string;
    description: ReactNode;
    warningText?: string;
    confirmLabel?: string;
    cancelLabel?: string;
    onConfirm: () => void;
    onCancel: () => void;
}

export interface DataTableToolbarProps {
    search?: DataTableSearchConfig;
    newItem?: DataTableNewItemConfig;
}

export interface DataTableDeleteDialogProps {
    config?: DataTableDeleteDialogConfig;
}

export interface DataTableErrorAlertProps {
    error?: string | null;
    onClose?: () => void;
}

export interface DataTableProps<T extends object>
    extends Omit<DataGridProps, "rows" | "columns" | "getRowId" | "loading"> {
    rows: T[];
    columns: GridColDef[];
    loading?: boolean;
    error?: string | null;
    onClearError?: () => void;
    emptyMessage?: string;
    height?: number | string;
    title?: string;
    search?: DataTableSearchConfig;
    newItem?: DataTableNewItemConfig;
    deleteDialog?: DataTableDeleteDialogConfig;
    getRowId?: (row: T) => string;
}

export interface DataTableHeaderProps {
    title?: string;
    search?: DataTableSearchConfig;
    newItem?: DataTableNewItemConfig;
}

export interface GenericCellProps<T> {
  items: T[];
  emptyLabel: string;
  getLabel: (item: T) => string;
  getTooltipLine: (item: T) => string;
  getKey: (item: T, index: number) => string;
}

export interface GenericDataGridProps<T extends object>
  extends Omit<DataGridProps, "rows" | "columns" | "getRowId"> {
  rows: T[];
  columns: GridColDef[];
  height?: number | string;
  emptyMessage?: string;
  getRowId?: (row: T) => string;
}

export interface PageHeaderProps {
  title: string;
  action?: React.ReactNode;
}

export interface RowActionsCellProps {
  onView?: () => void;
  onEdit?: () => void;
  onDelete?: () => void;
  onPresentations?: () => void;
}