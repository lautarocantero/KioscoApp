
/*══════════════════════════════════════════════════════════════════════╗
║ 🧱 BASES 🧱🧱🧱🧱🧱🧱🧱🧱🧱🧱🧱🧱🧱🧱🧱🧱🧱🧱🧱🧱                     ║
╚══════════════════════════════════════════════════════════════════════╝*/

interface AuthDataBase { // Este es el auth con TODOS sus campos
    _id: string | null,
    username: string,
    email: string,
    password: string,
    repeatPassword: string,
    token: string,
    refreshToken: string,
    status: AuthStatus,
    profilePhoto: string | null,
    errorMessage: string | null | undefined,
};


/*══════════════════════════════════════════════════════════════════════╗
║ 🌍 PUBLIC 🌍🌍🌍🌍🌍🌍🌍🌍🌍🌍🌍🌍🌍🌍🌍🌍🌍🌍🌍                      ║
╚══════════════════════════════════════════════════════════════════════╝*/
export type AuthPublic = Omit<AuthDataBase,'password', 'repeatPassword'>;


/*══════════════════════════════════════════════════════════════════════╗
║ 🍕 SLICE  🍕🍕🍕🍕🍕🍕🍕🍕🍕🍕🍕🍕🍕🍕🍕🍕🍕🍕🍕                       ║
╚══════════════════════════════════════════════════════════════════════╝*/

// state del slice
export type AuthSliceState = Pick<AuthDataBase, 
    '_id',
    'username',
    'email',
    'profilePhoto',
    'status',
    'errorMessage'>;

/*══════════════════════════════════════════════════════════════════════╗
║ 🔐 LOGIN  🔐🔐🔐🔐🔐🔐🔐🔐🔐🔐🔐🔐🔐🔐🔐🔐🔐🔐🔐                       ║
╚══════════════════════════════════════════════════════════════════════╝*/


// auth con los datos minimos del login
export type AuthLoginData = Pick<AuthDataBase, 'email', 'password'>;

export type AuthRegisterData = Pick<AuthDataBase, 'username', 'email','password', 'repeatPassword'>;


// payload del slice
export type AuthLoginPayload = Pick<AuthDataBase, 
    'email',
    'username',
    'photoUrl',
    '_id'>;

export type AuthErrorPayload = Pick<AuthDataBase, 'errorMessage'>;

// endpoint 

export type AuthLoginPayload = AuthLoginData;

// buttons

export type ErrorsInterface = Pick<AuthDataBase, 'email', 'password'>;


export type ErrorsFullInterface = Pick<AuthDataBase, 'username', 'repeatPassword'>;

export interface LoginFormButtonsInterface {
  errors: ErrorsInterface;
}

// pages

export interface LoginFormInputsInterface {    
  values: AuthLoginData;
  setFieldValue: (field: string, value: string) => void;
  errors: ErrorsInterface;
}

export type ToggleFormCallback = (value: boolean) => void;

export interface FormVisibilityState {
  showForm: boolean;
  setShowForm: ToggleFormCallback;
}

export type LoginFormInterface = Pick<FormVisibilityState, 'showForm'>;

export type FormToggleButtonInterface = Pick<FormVisibilityState, 'setShowForm'>;


/*══════════════════════════════════════════════════════════════════════╗
║ 📝 REGISTER  📝 📝 📝 📝 📝 📝 📝 📝 📝 📝 📝 📝                      ║
╚══════════════════════════════════════════════════════════════════════╝*/

export type AuthRegisterPayload = AuthRegisterData;

//form 

export interface RegisterFormInputsInterface {
  values: AuthRegisterPayload;
  setFieldValue: (field: string, value: string) => void;
  errors: ErrorsFullInterface;
}

// buttons 

export interface RegisterFormButtonsInterface {
  errors: AuthRegisterData;
}
