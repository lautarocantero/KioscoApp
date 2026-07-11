

export const truncate = (text: string, max = 50): string =>
  text.length <= max ? text : `${text.slice(0, max - 1)}…`;

