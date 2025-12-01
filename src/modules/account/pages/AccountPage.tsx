import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
import WorkspacePremiumIcon from '@mui/icons-material/WorkspacePremium';
import PersonIcon from '@mui/icons-material/Person';
import DisplayOptions from '../../shared/components/Options/DisplayOptions';

const accountLinks = [
  { icon: <ManageAccountsIcon />, description: 'Editar cuenta', url: '/account-edit'},
  { icon: <WorkspacePremiumIcon />, description: 'Plan de subscripcion', url: '/account-subscription'},
]

const AccountPage = ():React.ReactNode => {
    return (
      <DisplayOptions title='Cuenta' icon={<PersonIcon />}  links={accountLinks}/>
    )
}

export default AccountPage;