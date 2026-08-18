import { useSelector } from "react-redux";
import type { RootState } from "../../../../../../store/auth/authSlice";
import type { UserData } from "@typings/account/accountComponentTypes";
import type { UseSidebarUserDataReturn } from "@typings/auth/authTypes";
import { useActiveKiosco } from "../../../../../../hooks/kiosco/useActiveKiosco";
import { AuthRoleEnum } from "@typings/auth/authEnums";


export const useSidebarUserData = (): UseSidebarUserDataReturn => {
  const { _id, name, email, profilePhoto, isLoading, isAuthenticated } = useSelector(
    (state: RootState) => state.auth
  );
  const { activeKiosco } = useActiveKiosco();

  if (isLoading || !isAuthenticated || !_id) {
    return { userData: null, isLoading };
  }

  const userData: UserData = {
    id: _id,
    name: name,
    role: activeKiosco?.role ?? AuthRoleEnum.Seller,
    avatarUrl: profilePhoto ?? undefined,
    email,
  };

  return { userData, isLoading: false };
};