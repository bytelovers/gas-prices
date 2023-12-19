export const getGasDateTime = (str) => {
  // Dividir la cadena en componentes de fecha y hora
  const [date, time] = str.split(" ");

  // Extraer los componentes de fecha y hora
  const [day, month, year] = date.split("/");
  const [hour, mins, sec] = time.split(":");

  // Crear el objeto Date
  const dateTime = new Date(year, month - 1, day, hour, mins, sec);

  return dateTime;
};
