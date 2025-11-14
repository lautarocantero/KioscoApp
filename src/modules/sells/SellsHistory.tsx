import { Link, type Theme } from '@mui/material';
import { Link as LinkReactRouter} from 'react-router-dom';

const SellsHistoryPage = () => {

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
              ultimo dia
            </Link>

            <Link
              component={LinkReactRouter}
              to={"/login"}
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
              ultima semana
            </Link>

            <Link
              component={LinkReactRouter}
              to={"/login"}
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
              ultimo mes
            </Link>
          
            <Link
              component={LinkReactRouter}
              to={"/sells-history-filters"}
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
                filtros
            </Link>
        </>
    )
}

export default SellsHistoryPage;