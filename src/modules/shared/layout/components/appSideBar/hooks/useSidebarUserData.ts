import { useSelector } from "react-redux";
import type { RootState } from "../../../../../../store/auth/authSlice";
import type { UserData } from "@typings/account/accountComponentTypes";
import type { UseSidebarUserDataReturn } from "@typings/auth/authTypes";


export const useSidebarUserData = (): UseSidebarUserDataReturn => {
  const { _id, username, role, email, profilePhoto, isLoading, isAuthenticated } = useSelector(
    (state: RootState) => state.auth
  );

  if (isLoading || !isAuthenticated || !_id) {
    return { userData: null, isLoading };
  }

  const userData: UserData = {
    id: _id,
    name: username,
    role: role,
    avatarUrl: profilePhoto ?? undefined,
    email,
  };

  return { userData, isLoading: false };
};