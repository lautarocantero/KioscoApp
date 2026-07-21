import { PresentationCategory } from "@typings/presentation/presentationEnum";

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