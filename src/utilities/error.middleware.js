const errorMiddleware = store => next => action => {
    if (action.type.endsWith('Failure')) {
      store.dispatch({ type: 'SET_GLOBAL_ERROR', payload: action.payload });
    }
    return next(action);
  };
  
  export default errorMiddleware;
  