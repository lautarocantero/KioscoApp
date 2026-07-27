// /*══════════════════════════════════════════════════════════════════════╗
// ║ 📑 CATALOG HEADER 📑📑📑📑📑📑📑📑📑📑📑📑📑📑                       ║
// ╚══════════════════════════════════════════════════════════════════════╝*/

export enum SortOption {
  NameAsc = 'name-asc',
  NameDesc = 'name-desc',
}

export enum ViewMode {
  Grid = 'grid',
  List = 'list',
}

export enum SellerRol {
  Admin = 'admin',
  Seller = 'seller',
}

export enum SellerStatus {
  Online = 'online',
  Offline = 'Offline',
}

// /*══════════════════════════════════════════════════════════════════════╗
// ║ 🛒 CART 🛒🛒🛒🛒🛒🛒🛒🛒🛒🛒🛒🛒🛒🛒🛒🛒🛒🛒                       ║
// ╚══════════════════════════════════════════════════════════════════════╝*/

export enum CartAmount {
    All = 'all',
    One = 'one',
}

export enum CartSide {
    Left = 'left',
    Right = 'right',
}