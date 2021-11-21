const reducer = (state = { marketmovers: [], loading: true }, action) => {
    switch (action.type) {
      case "GET_MARKETMOVERS":
        return { ...state, marketmovers: action.data, loading: false };
      default:
        return { ...state };
    }
  };
  
  export default reducer;