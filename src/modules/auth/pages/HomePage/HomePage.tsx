import { useDispatch } from "react-redux";
import { startLogout } from "../../../../store/auth/thunks";
import type { AppDispatch } from "../../../../store/auth/authSlice";


const HomePage = (): React.ReactNode => {
    const dispatch = useDispatch<AppDispatch>();

    return (
        <>
            <h1>Home</h1>
            <button onClick={() => dispatch(startLogout())}>
              Desloguear
            </button>

        </>
    )
}

export default HomePage;