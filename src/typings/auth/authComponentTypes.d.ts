/*══════════════════════════════════════════════════════════════════════╗
║ ██ BUTTONS   🟦 🟩 🟥 🟨🟦 🟩 🟥 🟨🟦 🟩 🟥 🟨🟦 🟩 🟥 🟨🟦 🟩 🟥 🟨   ║
╚══════════════════════════════════════════════════════════════════════╝*/

export type ErrorsInterface = AuthRegisterRequest;

export interface LoginFormButtonsInterface {
  errors: ErrorsInterface;
}

export type RegisterFormButtonsInterface = LoginFormButtonsInterface;

/*══════════════════════════════════════════════════════════════════════╗
║ ██ FORMS   📝📝📝📝📝📝📝📝📝📝📝📝📝📝📝📝📝📝📝📝📝📝📝📝📝📝📝📝     
╚══════════════════════════════════════════════════════════════════════╝*/

export interface FormVisibilityState {
  showForm: boolean;
  setShowForm: ToggleFormCallback;
}

export type LoginFormType = Pick<FormVisibilityState, 'showForm'>;

export type FormToggleButtonInterface = Pick<FormVisibilityState, 'setShowForm'>;

export interface LoginFormInputsInterface {    
  values: AuthLoginData;
  setFieldValue: (field: string, value: string) => void;
  errors: ErrorsInterface;
}

export interface RegisterFormInputsInterface {
  values: AuthRegisterPayload;
  setFieldValue: (field: string, value: string) => void;
  errors: ErrorsFullInterface;
}










