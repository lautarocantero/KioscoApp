import { Link, type Theme } from '@mui/material';
import { Link as LinkReactRouter} from 'react-router-dom';

const SellsPage = () => {

    return (
        <>
            <Link
              component={LinkReactRouter}
              to={"/new-sell"}
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
              nueva venta
            </Link>
            <Link
              component={LinkReactRouter}
              to={"/sells-history"}
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
              ver venta
            </Link>
        </>
    )
}

export default SellsPage;