export const isAuthenticated = () => {
  const jwt = JSON.parse(window.localStorage.getItem("meezam"));
  if (jwt && jwt.token && jwt.admin._id && jwt.admin.email) {
    return {
      status: true,
      jwt: jwt,
    };
  }
  return {
    status: false,
    jwt: null,
  };
};
