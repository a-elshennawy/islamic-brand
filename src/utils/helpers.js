// truncate name
export const truncateName = (name, maxLength = 20) => {
  if (name.length <= maxLength) return name;
  return `${name.slice(0, maxLength)}...`;
};
