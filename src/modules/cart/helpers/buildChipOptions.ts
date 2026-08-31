import type { CartChipOption } from "@typings/cart/cartTypes";

// Arma las options de un CartChipToggleGroup a partir de una lista de
// valores crudos (enum) + una función de label — único lugar donde se
// arma este shape, para no repetir el .map en cada componente que usa chips.
export const buildChipOptions = <T extends string>(
  values: T[],
  getLabel: (value: T) => string
): CartChipOption[] => values.map((value) => ({ value, label: getLabel(value) }));

export default buildChipOptions;
