// AccountPage.tsx
import PersonIcon from '@mui/icons-material/Person';
import DisplayOptions from '../../shared/components/OptionsItems/DisplayOptions';
import { useAccountLinks } from '../../../hooks/account/useLinksData';

const AccountPage = (): React.ReactNode => {
  const links = useAccountLinks();

  return (
    <DisplayOptions title='Cuenta' icon={<PersonIcon />} links={links} />
  );
};

export default AccountPage;