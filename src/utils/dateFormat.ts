export const dateFormat = (date: string) => {
  if (date) {
    const findIndex = date.indexOf("T");
    return date.substring(0, findIndex).replaceAll("-", ".");
  }
  return "";
};
