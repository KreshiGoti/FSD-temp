export const saveUserToStorage = (user, remember) => {
  const data = JSON.stringify(user);
  remember
    ? localStorage.setItem("user", data)
    : sessionStorage.setItem("user", data);
};

export const getUserFromStorage = () => {
  return JSON.parse(localStorage.getItem("user") || sessionStorage.getItem("user") || "null");
};

export const logout = () => {
  localStorage.removeItem("user");
  sessionStorage.removeItem("user");
};
