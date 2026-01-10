
//─────────────────── Componente 🧩: SellsTable ───────────────────//

//─────────────────── Descripción 📝 ───────────────────//
// Componente encargado de renderizar la tabla de ventas utilizando `DataGrid` de MUI X.  
// Muestra información de cada venta como fecha, vendedor, productos, método de pago y total.  
// Incluye soporte para paginación, toolbar con filtros y traducción al español.  

//──────────────────── Funciones 🔧 ─────────────────────//
// - `columns`: definición de las columnas de la tabla con propiedades como `flex`, `minWidth`, `valueGetter` y `valueFormatter`.  
//   - `purchase_date`: fecha de la venta.  
//   - `seller_name`: nombre del vendedor.  
//   - `products`: concatena nombres de productos y los trunca si superan 20 caracteres.  
//   - `payment_method`: método de pago utilizado.  
//   - `total_amount`: monto total de la venta, formateado con símbolo de moneda.  
// - `paginationModel`: configuración inicial de paginación (página 0, tamaño 5).  
// - `SellsTable`: componente principal que:  
//   - Muestra un `CircularProgress` si `isLoading` es true o no hay ventas.  
//   - Mapea las ventas (`sells`) para generar filas con un `id` único.  
//   - Renderiza un `Paper` contenedor con el `DataGrid`.  
//   - Configura opciones de paginación, toolbar (`GridToolbar`) y traducción (`esES`).  

//─────────────────── Notas técnicas 💽 ───────────────────//
// - Se utiliza `flex` y `minWidth` en columnas para lograr un diseño responsivo y evitar espacios en blanco.  
// - `valueGetter` permite personalizar la visualización de productos concatenando nombres.  
// - `localeText` aplica traducción al español para labels y acciones del `DataGrid`.  
// - `disableRowSelectionOnClick` evita que se seleccionen filas al hacer clic.  
// - El componente está preparado para integrarse con datos dinámicos provenientes del store o API.  
//-----------------------------------------------------------------------------


import DeleteIcon from '@mui/icons-material/Delete';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import { CircularProgress, IconButton, Tooltip } from '@mui/material';
import Paper from '@mui/material/Paper';
import type { GridColDef } from '@mui/x-data-grid';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import { esES } from '@mui/x-data-grid/locales';
import { useContext } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate, type NavigateFunction } from 'react-router';
import { type AppDispatch } from '../../../../store/sell/sellSlice';
import { deleteSellThunk, getSells } from '../../../../store/sell/sellsThunks';
import type { ProductTicketType } from '../../../../typings/seller/sellerTypes';
import { AlertColor } from '../../../../typings/ui/ui';
import { SnackBarContext } from '../../../shared/components/SnackBar/SnackBarContext';
import type { SellTicketType } from '@typings/sells/types';

const handleDetail = (ticket_id: string, navigate: NavigateFunction) => { 
  navigate(`/sells-history/${ticket_id}`);
};

const handleDeleteSell = async(ticket_id: string, dispatch: AppDispatch, showSnackBar: (message: string, color: AlertColor) => void) => {
  const response: string | void = await dispatch(deleteSellThunk(ticket_id));

  if(!response) {
    showSnackBar(`Ocurrio un error al eliminar el producto. Intenta de nuevo.`, AlertColor.Error);
    return;
  }

  showSnackBar(`Producto eliminado correctamente.`, AlertColor.Success);
  setTimeout(() => dispatch(getSells()), 200);
}

const paginationModel = { page: 0, pageSize: 5 };

const SellsTable = ({isLoading, sells }: { isLoading: boolean; sells: SellTicketType[];}): React.ReactNode => {
  const dispatch = useDispatch<AppDispatch>();  

  const navigate = useNavigate();
  const { showSnackBar } = useContext(SnackBarContext)!;

  if (isLoading || !sells) {
    return <CircularProgress />;
  }

  const rows = sells.map((sell, index) => ({
    id: index,
    ...sell,
  }));

  const columns: GridColDef[] = [
    { field: 'purchase_date', headerName: 'Fecha', flex: 1, minWidth: 150, },
    { field: 'seller_name', headerName: 'Vendedor', flex: 1, minWidth: 150, },
    {
      field: 'products',
      headerName: 'Productos',
      minWidth: 250,
      flex: 2,
      /*─────────────────── 🔎 Concatenar nombres y truncar si supera 20 caracteres 🔎 ───────────────────*/
      valueGetter: (_value, row) => {
        const productsText = row.products.map((p: ProductTicketType) => p.name).join(', ');
        return productsText.length > 20
          ? productsText.slice(0, 20) + '...'
          : productsText;
      },
    },
    { field: 'payment_method', headerName: 'Método de pago', flex: 1, minWidth: 150, },
    {
      field: 'total_amount',
      headerName: 'Total',
      flex: 1,
      minWidth: 150,
      type: 'number',
      valueFormatter: (params: number) => `${params}$`,
    },
    { field: 'actions', headerName: 'Acciones', sortable: false, filterable: false, minWidth: 160, renderCell: (params) => ( 
      <>
        <Tooltip title="Ver detalles">
          <IconButton
            onClick={() => handleDetail(params.row.ticket_id, navigate)}  
            aria-label="ver"
          > 
            <RemoveRedEyeIcon /> 
          </IconButton> 
        </Tooltip>
        <Tooltip title="Borrar">
          <IconButton
            onClick={() => handleDeleteSell(params.row.ticket_id, dispatch, showSnackBar)}  
            aria-label="ver"
          > 
            <DeleteIcon /> 
          </IconButton> 
        </Tooltip>  
      </>
      ), 
    },
  ];

  return (
    <Paper sx={{ height: 500, width: '90%', margin: '0em auto 0em' }}>
      <DataGrid
        rows={rows}
        columns={columns}
        initialState={{ pagination: { paginationModel } }}
        pageSizeOptions={[5, 10]}
        disableRowSelectionOnClick
        slots={{ toolbar: GridToolbar }}  /*─────────────────── 🔎 Toolbar con filtros, exportación y búsqueda 🔎 ───────────────────*/
        localeText={esES.components.MuiDataGrid.defaultProps.localeText}
        sx={{ border: 0 }}
      />
    </Paper>
  );
}

export default SellsTable;