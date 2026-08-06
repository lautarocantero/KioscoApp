import { ModelType, ModelUnit, PresentationCategory, type SaleType } from "@typings/presentation/presentationEnum";

export const PRESENTATION_CATEGORY_LABELS: Record<PresentationCategory, string> = {
  [PresentationCategory.Food]: "Comida",
  [PresentationCategory.Grocery]: "Almacén",
  [PresentationCategory.Bakery]: "Panadería",
  [PresentationCategory.Dairy]: "Lácteos",
  [PresentationCategory.DeliAndCheese]: "Fiambres y Quesos",
  [PresentationCategory.MeatsAndColdCuts]: "Carnes y Embutidos",
  [PresentationCategory.FruitsAndVegetables]: "Frutas y Verduras",
  [PresentationCategory.Frozen]: "Congelados",
  [PresentationCategory.Snacks]: "Snacks",
  [PresentationCategory.CookiesAndPastries]: "Galletitas y Repostería",
  [PresentationCategory.CondimentsAndSauces]: "Condimentos y Aderezos",

  [PresentationCategory.NonAlcoholicBeverages]: "Bebidas sin Alcohol",
  [PresentationCategory.AlcoholicBeverages]: "Bebidas Alcohólicas",
  [PresentationCategory.HotBeverages]: "Bebidas Calientes",

  [PresentationCategory.PersonalHygiene]: "Higiene Personal",
  [PresentationCategory.HairCare]: "Cuidado del Cabello",
  [PresentationCategory.Cosmetics]: "Cosmética",

  [PresentationCategory.HouseholdCleaning]: "Limpieza del Hogar",
  [PresentationCategory.Disposables]: "Descartables",

  [PresentationCategory.Baby]: "Bebés",
  [PresentationCategory.Pets]: "Mascotas",
  [PresentationCategory.Pharmacy]: "Farmacia",
  [PresentationCategory.TobaccoAndCigarettes]: "Cigarrillos y Tabaco",
  [PresentationCategory.StationeryAndKiosk]: "Librería y Kiosco",
  [PresentationCategory.Deli]: "Rotisería",
};

export const SALE_TYPE_LABELS: Record<SaleType, string> = {
  unit: "Por unidad",
  weight: "Por peso",
};

export const MODEL_TYPE_LABELS: Record<ModelType, string> = {
  [ModelType.Can]: "Lata",
  [ModelType.Bottle]: "Botella",
  [ModelType.TetraPack]: "Tetra Pack",
  [ModelType.Bag]: "Bolsa",
  [ModelType.Box]: "Caja",
  [ModelType.Jar]: "Frasco",
  [ModelType.Sachet]: "Sachet",
  [ModelType.Blister]: "Blister",
  [ModelType.Pack]: "Pack",
  [ModelType.Roll]: "Rollo",
  [ModelType.Aerosol]: "Aerosol",
  [ModelType.SoftCover]: "Tapa blanda",
  [ModelType.HardCover]: "Tapa dura",
  [ModelType.Other]: "Otro",
};

export const MODEL_UNIT_LABELS: Record<ModelUnit, string> = {
  [ModelUnit.Units]: "Unidades",
  [ModelUnit.Milliliters]: "Mililitros (ml)",
  [ModelUnit.Liters]: "Litros (l)",
  [ModelUnit.Grams]: "Gramos (g)",
  [ModelUnit.Kilograms]: "Kilogramos (kg)",
  [ModelUnit.Ounces]: "Onzas (oz)",
  [ModelUnit.Pounds]: "Libras (lb)",
  [ModelUnit.Sheets]: "Hojas",
  [ModelUnit.Meters]: "Metros (m)",
  [ModelUnit.Centimeters]: "Centímetros (cm)",
};