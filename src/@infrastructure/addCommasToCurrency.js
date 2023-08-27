/** @format */
export const addCommasToCurrency = (value) => {
  // Convert value to string
  let stringValue = String(value);

  // Split the string into whole and decimal parts (if any)
  let parts = stringValue.split(".");
  let wholePart = parts[0];
  let decimalPart = parts[1] || "";

  // Add commas to the whole part
  let thousand = wholePart.split("");
  let __thousand =
    "," +
    thousand[thousand.length - 3] +
    thousand[thousand.length - 2] +
    thousand[thousand.length - 1];

  let formattedWholePart =
    wholePart
      .slice(0, wholePart.length - 3)
      .replace(/\B(?=(\d{2})+(?!\d))/g, ",") + __thousand;

  // Combine the whole and decimal parts
  let formattedValue = formattedWholePart;

  return formattedValue;
};
