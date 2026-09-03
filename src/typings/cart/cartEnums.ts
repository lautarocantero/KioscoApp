export enum SortOption {
  NameAsc = 'name-asc',
  NameDesc = 'name-desc',
}

export enum ViewMode {
  Grid = 'grid',
  List = 'list',
  Collapsed = 'collapsed',
}

export enum CartAmount {
    All = 'all',
    One = 'one',
}

export enum CartSide {
    Left = 'left',
    Right = 'right',
}

export enum StockStatus {
    Low = 'low',
    Ok = 'ok',
    Weight = 'weight',
}

// Fases de la animación de "la mano agarra la bolsa": reposo, agarre (la
// mano aparece y las asas se aprietan), levantada (bolsa+mano salen de
// cuadro) y vuelta (la bolsa cae de nuevo, ya vacía).
export enum CartBagAnimationPhase {
    Idle = 'idle',
    Grab = 'grab',
    Lift = 'lift',
    Back = 'back',
}
