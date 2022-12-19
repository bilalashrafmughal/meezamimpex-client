export const init = (state = {}, action) => {
  if (action.type === "INIT_APP") {
    return action.initData;
  } else {
    return state;
  }
};

export const addToCartReducer = (state = [], action) => {
  if (action.type === "ADD_TO_CART") {
    return [...state, action.product];
  } else if (action.type === "DELETE_PRODUCT") {
    const newState = [];
    state.forEach((p) => {
      if (p !== action.product) {
        newState.push(p);
      }
    });
    return newState;
  } else if (action.type === "PLUS_QTY") {
    let dummyState = [...state];
    state.forEach((obj, i) => {
      if (obj.id === action.id) {
        let objClone = obj;
        objClone.product.qty = objClone.product.qty + 1;
        dummyState[i] = objClone;
      }
    });
    return dummyState;
  } else if (action.type === "MINUS_QTY") {
    let dummyState = [...state];
    state.forEach((obj, i) => {
      if (obj.id === action.id && obj.product.qty > 1) {
        let objClone = obj;
        objClone.product.qty = objClone.product.qty - 1;
        dummyState[i] = objClone;
      }
    });
    return dummyState;
  } else if (action.type === "ADD_QTY") {
    let dummyState = [...state];
    state.forEach((obj, i) => {
      if (obj.id === action.reffObj.id && action.reffObj.qty >= 1) {
        obj.product.qty = action.reffObj.qty;
        dummyState[i] = obj;
      }
    });

    return dummyState;
  } else {
    return state;
  }
};

export const authReducer = (state = null, action) => {
  if (action.type === "login") {
    return action.payload;
  }
  if (action.type === "logout") {
    return state === null;
  }
  return state;
};
