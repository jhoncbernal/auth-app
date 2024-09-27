export function getISOtoStringDate(weekDate: string) {
  if (!weekDate) return "";

  const date = new Date(weekDate);
  const options: Intl.DateTimeFormatOptions = {
    day: "numeric",
    month: "short",
  };
  const dateFormat = new Intl.DateTimeFormat("es-ES", options);

  return dateFormat.format(date);
}
