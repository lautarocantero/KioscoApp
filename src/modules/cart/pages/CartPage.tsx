import { useState } from "react";


const CartPage = ():React.ReactNode => {
    const [showTicket, setShowTicket] = useState<boolean>(false);


    if(showTicket) return (
    <>
        <p>se creo tu ticket</p>
        <p>si no se descargo, presiona aqui</p>
    </>
)

    return (
        <>
            <p>coca-cola</p>
            <button onClick={ () => setShowTicket(true)}>hacer ticket</button>
        </>
    )

};

export default CartPage;













































