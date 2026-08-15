import { type GridColDef } from "@mui/x-data-grid";
import { Rating } from "@mui/material";
import type { BuildProviderColumnsArgs, Provider } from "@typings/provider/providerTypes";
import RowActionsCell from "../../../../shared/components/DataTable/RowActionsCell";
import { CellCenter } from "../../../../shared/components/DataTable/CellCenter";

export const buildColumnsForProviders = ({
    onDeleteRequest,
    navigate,
}: BuildProviderColumnsArgs): GridColDef<Provider>[] => [
    { field: "name", headerName: "Nombre", flex: 1.3, minWidth: 160 },
    {
        field: "valoration",
        headerName: "Valoración",
        flex: 1,
        minWidth: 150,
        renderCell: (params) => (
            <Rating
                value={params.row.valoration}
                readOnly
                size="small"
                aria-label={`Valoración: ${params.row.valoration} de 5`}
            />
        ),
    },
    { field: "contact_phone", headerName: "Teléfono", flex: 1, minWidth: 150 },
    { field: "contact_email", headerName: "Email", flex: 1.2, minWidth: 200 },
    {
        field: "actions",
        headerName: "Acciones",
        width: 160,
        sortable: false,
        filterable: false,
        align: "center",
        headerAlign: "center",
        renderCell: (params) => (
            <CellCenter>
                <RowActionsCell
                    onView={() => navigate(`/provider/${params.row._id}`)}
                    onEdit={() => navigate(`/provider/${params.row._id}/provider-edit`)}
                    onDelete={() => onDeleteRequest(params.row._id, params.row.name)}
                />
            </CellCenter>
        ),
    },
];
