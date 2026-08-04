// import { Box, CircularProgress, Typography, type Theme } from "@mui/material";
// import { CheckCircle, ErrorOutline } from "@mui/icons-material";
// import type { ReactNode } from "react";
// import { useVerifyEmailForm } from "../../../../../hooks/auth/useAuthForm";
// import VerificationFormButtons from "./VerificationFormButton";


// const VerificationForm = (): ReactNode => {
//     const { status, errorMessage, handleGoToLogin, handleGoToRegister } = useVerifyEmailForm();

//     return (
//         <Box
//             component="div"
//             role="status"
//             sx={{
//                 width: { xs: "90%" },
//                 height: "100%",
//                 boxSizing: "border-box",
//                 display: "flex",
//                 flexDirection: "column",
//                 justifyContent: "center",
//                 alignItems: "center",
//                 margin: "auto",
//                 gap: 2,
//             }}
//         >
//             {status === "verifying" && (
//                 <>
//                     <CircularProgress sx={{ color: (theme: Theme) => theme?.palette?.primary?.main }} />
//                     <Typography sx={{ color: (theme: Theme) => theme?.custom?.fontColor }}>
//                         Verificando tu email...
//                     </Typography>
//                 </>
//             )}

//             {status === "success" && (
//                 <>
//                     <CheckCircle sx={{ fontSize: 48, color: (theme: Theme) => theme?.palette?.success?.main }} />
//                     <Typography sx={{ color: (theme: Theme) => theme?.custom?.fontColor }}>
//                         ¡Tu email fue verificado con éxito!
//                     </Typography>
//                 </>
//             )}

//             {status === "error" && (
//                 <>
//                     <ErrorOutline sx={{ fontSize: 48, color: (theme: Theme) => theme?.palette?.error?.main }} />
//                     <Typography sx={{ color: (theme: Theme) => theme?.palette?.error?.main }}>
//                         {errorMessage}
//                     </Typography>
//                 </>
//             )}

//             <VerificationFormButtons
//                 status={status}
//                 onGoToLogin={handleGoToLogin}
//                 onGoToRegister={handleGoToRegister}
//             />
//         </Box>
//     );
// };

// export default VerificationForm;