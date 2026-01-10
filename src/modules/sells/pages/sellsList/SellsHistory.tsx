
//─────────────────── Componente 🧩: SellsHistoryPage ───────────────────//

//─────────────────── Descripción 📝 ───────────────────//
// Página principal para visualizar el historial de ventas.  
// Se encarga de obtener las ventas desde el store y renderizarlas en una tabla dentro del layout de la aplicación.  

//──────────────────── Funcionalidad ⚙️ ─────────────────────//
// - Ejecuta el thunk `getSells` al montar el componente para traer las ventas desde la API.  
// - Renderiza el componente `SellsTable` con las props `isLoading` y `sells`.  

//──────────────────── Datos 📊 ─────────────────────//
// - `sell`: estado proveniente del slice de ventas (`sellSlice`).  
// - `isLoading`: booleano que indica si las ventas están cargando.  
// - `sells`: arreglo de tipo `SellTicketType[]` con las ventas obtenidas.  

//-----------------------------------------------------------------------------

import type { SellTicketType } from '@typings/sells/types';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import type { AppDispatch, RootState as SellStateInterface } from '../../../../store/sell/sellSlice';
import { getSellsThunk } from '../../../../store/sell/sellsThunks';
import AppLayout from '../../../shared/layout/AppLayout';
import SellsTable from '../../components/sellsTable/SellsTable';

const SellsHistoryPage = ():React.ReactNode => {
  const dispatch = useDispatch<AppDispatch>();
  const { sell } = useSelector((state: SellStateInterface) => state);
  const { isLoading, sells} : { isLoading: boolean, sells: SellTicketType[]} = sell;

  useEffect(() => {
    const fetchProducts = async () => {
      await dispatch(getSellsThunk());
    };
    fetchProducts();
  }, []);

     return (
      <AppLayout isOptions title='Ventas'>
        <SellsTable isLoading={isLoading} sells={sells}/>
      </AppLayout>
    )
}

export default SellsHistoryPage;