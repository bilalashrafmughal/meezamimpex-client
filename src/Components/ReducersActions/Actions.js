export const addToCartAction = (product) => {
  return (dispatch) => {
    return dispatch({ type: "ADD_TO_CART", product: product });
  };
};

export const deleteItemAction = (product) => {
  return (dispatch) => {
    return dispatch({ type: "DELETE_PRODUCT", product: product });
  };
};

export const qtyAction = (id) => {
  return (dispatch) => {
    dispatch({ type: "PLUS_QTY", id: id });
  };
};

export const minusQtyAction = (id) => {
  return (dispatch) => {
    dispatch({ type: "MINUS_QTY", id: id });
  };
};

export const addQtyAction = (reffObj) => {
  return (dispatch) => {
    dispatch({ type: "ADD_QTY", reffObj: reffObj });
  };
};

// auth acitons

export const loginAction = (payload) => {
  return (dispatch) => {
    dispatch({ type: "login", payload });
  };
};
export const logoutAction = () => {
  return (dispatch) => {
    dispatch({ type: "logout" });
  };
};
