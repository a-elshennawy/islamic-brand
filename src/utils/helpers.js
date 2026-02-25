// truncate name
export const truncateName = (name, maxLength = 20) => {
  if (name.length <= maxLength) return name;
  return `${name.slice(0, maxLength)}...`;
};

// generate temp_user_id
export const generateTempUserId = () => {
  const now = new Date();

  const month = String(now.getMonth() + 1).padStart(2, "0");
  const day = String(now.getDate()).padStart(2, "0");
  const hours = String(now.getHours()).padStart(2, "0");
  const minutes = String(now.getMinutes()).padStart(2, "0");
  const seconds = String(now.getSeconds()).padStart(2, "0");

  const timestamp = `${month}${day}${hours}${minutes}${seconds}`;

  return `islamic-${timestamp}`;
};

// get userId or generate it
export const getUserId = () => {
  let userId = localStorage.getItem("userId");

  if (!userId) {
    userId = generateTempUserId();
    localStorage.setItem("userId", userId);
  }

  return userId;
};

// clear if needed
export const clearTempUserId = () => {
  localStorage.removeItem("userId");
};
