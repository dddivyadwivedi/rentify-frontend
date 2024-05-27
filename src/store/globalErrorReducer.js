const initialState = {
    globalError: null,
  };
  
 export const globalErrorReducer = (state = initialState, action) => {
    switch (action.type) {
      case 'SET_GLOBAL_ERROR':
        return { ...state, globalError: action.payload };
      case 'CLEAR_GLOBAL_ERROR':
        return { ...state, globalError: null };
      default:
        return state;
    }
  };