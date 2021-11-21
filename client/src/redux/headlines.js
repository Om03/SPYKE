const reducer = (state = { headlines: [], loading: true }, action) => {
  switch (action.type) {
    case "GET_HEADLINES":
      return { ...state, headlines: action.data, loading: false };
    default:
      return { ...state };
  }
};

export default reducer;
