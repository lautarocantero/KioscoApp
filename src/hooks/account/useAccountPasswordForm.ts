import { useContext, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useFormik, type FormikHelpers, type FormikProps } from "formik";
import { useTranslation } from "react-i18next";
import type { AppDispatch, RootState } from "../../store/auth/authSlice";
import { startRequestPasswordReset, startResetPassword } from "../../store/auth/authThunks";
import { authLoginRequest } from "../../modules/auth/api/authApi";
import { extractAuthErrorMessage } from "../../store/shared/handlerStoreError";
import {
  getAccountPasswordInitialValues,
  accountPasswordFormSchema,
} from "../../modules/shared/components/SettingsModal/schema/accountPasswordFormSchema";
import type { AccountPasswordFormValues, UseAccountPasswordFormReturn } from "@typings/settings/settingsTypes";
import { SnackBarContext } from "../../modules/shared/components/SnackBar/SnackBarContext";
import { AlertColor } from "@typings/ui/ui";

/*══════════ 🪝 useAccountPasswordForm ══════════╗
║ No existe (todavía) un endpoint de "cambiar       ║
║ contraseña estando logueado". En vez de inventar   ║
║ uno o dejar "contraseña actual" sin validar,        ║
║ reutilizamos dos endpoints existentes:              ║
║   1. POST /auth/login (authLoginRequest, directo,   ║
║      sin pasar por el thunk: el thunk desloguea al  ║
║      usuario si falla, algo que NO queremos acá) —   ║
║      para verificar la contraseña actual.            ║
║   2. El flujo de recuperación de contraseña          ║
║      (startRequestPasswordReset + startResetPassword) ║
║      para aplicar la nueva.                            ║
╚═════════════════════════════════════════════════════╝*/
export const useAccountPasswordForm = (): UseAccountPasswordFormReturn => {
  const { t } = useTranslation();
  const dispatch = useDispatch<AppDispatch>();
  const { email } = useSelector((state: RootState) => state.auth);
  const snackBarContext = useContext(SnackBarContext);

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const openDialog = () => {
    setErrorMessage(null);
    setIsDialogOpen(true);
  };

  const closeDialog = () => setIsDialogOpen(false);

  const onSubmit = async (
    values: AccountPasswordFormValues,
    { resetForm }: FormikHelpers<AccountPasswordFormValues>
  ) => {
    if (!email) return;

    setIsSubmitting(true);
    setErrorMessage(null);

    try {
      await authLoginRequest({ email, password: values.currentPassword, rememberMe: true });
    } catch (error: unknown) {
      setErrorMessage(extractAuthErrorMessage(error));
      setIsSubmitting(false);
      return;
    }

    const tokenResult = await dispatch(startRequestPasswordReset({ email }));

    if (!tokenResult.success || !tokenResult.token) {
      setErrorMessage(tokenResult.errorMessage ?? "No se pudo iniciar el cambio de contraseña");
      setIsSubmitting(false);
      return;
    }

    const result = await dispatch(
      startResetPassword({
        token: tokenResult.token,
        newPassword: values.newPassword,
        repeatNewPassword: values.repeatNewPassword,
      })
    );

    if (!result.success) {
      setErrorMessage(result.errorMessage);
      setIsSubmitting(false);
      return;
    }

    snackBarContext?.showSnackBar(t("settings.account.password.successMessage"), AlertColor.Success);
    resetForm();
    setIsSubmitting(false);
    closeDialog();
  };

  const formik: FormikProps<AccountPasswordFormValues> = useFormik({
    initialValues: getAccountPasswordInitialValues(),
    onSubmit,
    validateOnBlur: false,
    validateOnChange: false,
    validationSchema: accountPasswordFormSchema,
  });

  return { formik, isSubmitting, errorMessage, isDialogOpen, openDialog, closeDialog };
};
