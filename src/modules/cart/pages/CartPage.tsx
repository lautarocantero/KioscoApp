
// # Componente: CartPage  

// ## Descripción 📦
// Página de carrito que simula la creación de un ticket de compra.  
// Renderiza un producto inicial y un botón para generar el ticket.  

// ## Funciones 🔧
// - `CartPage`: componente principal que controla la vista del carrito.  
//   - Usa `useState` para manejar el estado `showTicket`.  
//   - Si `showTicket` es `true`, renderiza mensajes de ticket creado.  
//   - Si `showTicket` es `false`, renderiza producto y botón para crear ticket.  

// ## Notas técnicas 💽
// - Estado booleano simple para alternar entre vista de producto y vista de ticket.  
// - Ejemplo básico de flujo condicional en React.  
//-----------------------------------------------------------------------------//


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













































