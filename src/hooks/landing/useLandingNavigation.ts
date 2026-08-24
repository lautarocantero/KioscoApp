import { useNavigate } from "react-router-dom";

export const useLandingNavigation = () => {
  const navigate = useNavigate();

  const goToLogin = (): void => { navigate("/login"); };
  const goToRegister = (): void => { navigate("/register"); };
  const goToJoinKiosco = (): void => { navigate("/join-kiosco"); };

  return { goToLogin, goToRegister, goToJoinKiosco };
};
