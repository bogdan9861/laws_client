export const reduceString = (str, limit) => {
  if (!str) return;

  return str.length > limit ? `${str.substring(0, limit)}...` : str;
};
