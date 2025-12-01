
/*══════════════════════════════════════════════════════════════════════╗
║ ██ ERRORS   🚨🚨🚨🚨🚨🚨🚨🚨🚨🚨🚨🚨🚨🚨🚨🚨🚨🚨🚨🚨🚨🚨🚨🚨🚨🚨🚨🚨    ║ 
╚══════════════════════════════════════════════════════════════════════╝*/

export interface HandleErrorInterface {
    error: unknown,
}

export interface HandleErrorWithActionProps {
  error: unknown;
  dispatch: AppDispatch;
  action: (payload: { errorMessage: string | null }) => void;
}

export interface FormErrorsHandlerInterface {
    error: string | null;
}