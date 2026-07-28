// ShopAdminPage.tsx
import StarPurple500Icon from '@mui/icons-material/StarPurple500';
import DisplayOptions from '../../shared/components/OptionsItems/DisplayOptions';
import { useShopAdminLinks } from '../../../hooks/shopAdmin/useLinksData';

const ShopAdminPage = (): React.ReactNode => {
  const links = useShopAdminLinks();

  return (
    <DisplayOptions title='Administradores' icon={<StarPurple500Icon />} links={links} />
  );
};

export default ShopAdminPage;