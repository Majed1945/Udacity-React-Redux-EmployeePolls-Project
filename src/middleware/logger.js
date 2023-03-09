const logger = (store) => (next) => (action) => {
    console.group(action.type);
    console.log("The action is ", action);
    //here we dispatch the action
    const returnValue = next(action);
    //after, the state will be updated
    console.log("The new state is ", store.getState());
    console.groupEnd();
    return returnValue;
  };
  export default logger;
  