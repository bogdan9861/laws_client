export const getEnglishLetter = (index) => {
  const letters = Array.from({ length: 26 }, (_, i) =>
    String.fromCharCode(97 + i)
  );

  return letters[index];
};
