const reducer = (state = { watchlist: [], loading: true }, action) => {
    switch (action.type) {
      case "GET_WATCHLIST":
        return { ...state, watchlist: action.data, loading: false };
      case 'UPDATE_WATCHLIST':
        return { ...state, watchlist: action.data };
      case 'CHANGED':
          return { ...state , loading: true , watchlist: [] };
      default:
        return { ...state };
    }
  };
  
  export default reducer;
  