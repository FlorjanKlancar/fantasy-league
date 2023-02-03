export const dateFormat = "DD. MM. YYYY";

export function toJson(data: unknown) {
  return JSON.stringify(data, (_, v) =>
    typeof v === "bigint" ? `${v}n` : v
  ).replace(/"(-?\d+)n"/g, (_, a) => a);
}

export const generateFlagURL = (countryCode: string) =>
  `https://countryflagsapi.com/png/${countryCode}`;
