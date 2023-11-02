const autoHyphenBirth = (value: string) => {
  let formattedValue = value.replace(/\D/g, "").slice(0, 8);

  if (formattedValue.length > 3 && formattedValue.length <= 7) {
    formattedValue = formattedValue.replace(/(\d{4})(\d{1,2})/, "$1-$2");
  } else if (formattedValue.length > 7) {
    formattedValue = formattedValue.replace(
      /(\d{4})(\d{2})(\d{1,2})/,
      "$1-$2-$3"
    );
  }

  return formattedValue;
};

export default autoHyphenBirth;
