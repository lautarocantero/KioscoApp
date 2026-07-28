// ShopPage.tsx
import StoreIcon from '@mui/icons-material/Store';
import DisplayOptions from '../../shared/components/OptionsItems/DisplayOptions';
import { useShopLinks } from '../../../hooks/shop/useLinksData';

const ShopPage = (): React.ReactNode => {
  const links = useShopLinks();

  return (
    <DisplayOptions title='Tienda' icon={<StoreIcon />} links={links} />
  );
};

export default ShopPage;