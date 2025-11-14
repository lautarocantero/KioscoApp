import { useState } from "react";
import { Link, type Theme } from '@mui/material';
import { Link as LinkReactRouter, useNavigate} from 'react-router-dom';


const NewSellPage = () => {

    const [showProducts, setShowProducts] = useState<boolean>(false);
    const navigate = useNavigate();

    if(!showProducts) return (
        <>
            <button onClick={ () => navigate('/qr-scan')}>escanear qr</button>
            <button onClick={ () => setShowProducts(true)}>manualmente</button>
        </>
    )

    return (
        <>
            <div>
                <Link
                  component={LinkReactRouter}
                  to={"/cart"}
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
                  ver carrito
                </Link>
            </div>
            
            <div>
                <p>coca cola</p>
                <button>agregar</button>
            </div>

            <div>
                <p>cigarrillos</p>
                <button>agregar</button>
            </div>

            <div>
                <p>alfajores</p>
                <button>agregar</button>
            </div>
            
            
        </>
    )

}

export default NewSellPage;