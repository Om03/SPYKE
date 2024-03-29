const reducer = (
  state = { ...JSON.parse(localStorage.getItem("profile")) },
  action
) => {
  switch (action.type) {
    case "LOGIN":
      localStorage.setItem(
        "profile",
        JSON.stringify({ ...action.data.result })
      );
      localStorage.setItem("token", action.data.token);
      return { ...action.data.result };
    case "UPDATE_PROFILE":
      const newstate = { ...state, ...action.data };
      localStorage.setItem("profile", JSON.stringify({ ...newstate }));
      return { ...newstate };
    case "LOGOUT":
      localStorage.clear();
      return {};
    default:
      return { ...state };
  }
};

export default reducer;
