export const shortNumberString = (
  value: number,
  toFixed: number = 2
): string => {
  const absValue = Math.abs(value);
  if (absValue >= 1e6) return (absValue / 1e6).toFixed(toFixed) + "M";
  if (absValue >= 1e3) return (absValue / 1e3).toFixed(toFixed) + "K";
  return value.toFixed(toFixed);
};

export const numberPercent = (
  value: number,
  toFixed: number,
): string => {
  return value.toFixed(toFixed) + "%";
};