import { Link, type Theme } from '@mui/material';
import { Link as LinkReactRouter} from 'react-router-dom';

const AccountPage = () => {
    return (
        <>
            <p>AccountPage</p>
            <Link
                component={LinkReactRouter}
                to={"/account-edit"}
                sx={{
                    mt: "1em",
                    textDecoration: "none",
                    textAlign: "center",
                    display: "block",
                    color: (theme: Theme) => theme?.custom?.fontColor,
                    fontSize: (theme: Theme) => theme?.typography?.body2.fontSize,
                    backgroundColor: (theme: Theme) => theme?.custom?.background,
                    borderRadius: "1em",
                    width: "100%",
                }}
            >
            Editar cuenta
            </Link>   
            <Link
                component={LinkReactRouter}
                to={"/account-subscription"}
                sx={{
                    mt: "1em",
                    textDecoration: "none",
                    textAlign: "center",
                    display: "block",
                    color: (theme: Theme) => theme?.custom?.fontColor,
                    fontSize: (theme: Theme) => theme?.typography?.body2.fontSize,
                    backgroundColor: (theme: Theme) => theme?.custom?.background,
                    borderRadius: "1em",
                    width: "100%",
                }}
            >
            Plan de subscripcion
            </Link>                     

        </>
    )
}

export default AccountPage;