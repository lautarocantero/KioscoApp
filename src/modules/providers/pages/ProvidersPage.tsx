import TrolleyIcon from '@mui/icons-material/Trolley';
import DisplayOptions from '../../shared/components/OptionsItems/DisplayOptions';
import { useProvidersPageLinks } from '../../../hooks/suppliers/useProvidersPageLinks';

const ProvidersPage = (): React.ReactNode => {
  const links = useProvidersPageLinks();

  return (
    <DisplayOptions title='Proveedores' icon={<TrolleyIcon />} links={links} />
  );
};

export default ProvidersPage;