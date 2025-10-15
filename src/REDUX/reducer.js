const initialState = {
  isLoggedIn: false,
  user: null,
  selectedProduct: null,
  cartItems: [], // carrito
};

function userReducer(state = initialState, action) {
  switch (action.type) {
    case "LOGIN_SUCCESS":
      return { ...state, isLoggedIn: true, user: action.payload };

    case "LOGOUT":
      return { ...state, isLoggedIn: false, user: null, cartItems: [] };

    case "SET_SELECTED_PRODUCT":
      return { ...state, selectedProduct: action.payload };

    case "CLEAR_SELECTED_PRODUCT":
      return { ...state, selectedProduct: null };

    // Carrito: añade o incrementa
    case "ADD_TO_CART": {
      const incoming = action.payload; // {id, name, brand, price, currency, image, qty}
      const existingIndex = state.cartItems.findIndex((i) => i.id === incoming.id);

      if (existingIndex >= 0) {
        const updated = [...state.cartItems];
        updated[existingIndex] = {
          ...updated[existingIndex],
          qty: updated[existingIndex].qty + (incoming.qty || 1),
        };
        return { ...state, cartItems: updated };
      }

      return { ...state, cartItems: [...state.cartItems, { ...incoming, qty: incoming.qty || 1 }] };
    }

    // Actualiza cantidad explícitamente
    case "UPDATE_CART_QTY": {
      const { id, qty } = action.payload;
      const updated = state.cartItems.map((i) => (i.id === id ? { ...i, qty: Math.max(1, qty) } : i));
      return { ...state, cartItems: updated };
    }

    // Elimina un item del carrito
    case "REMOVE_FROM_CART": {
      const { id } = action.payload;
      return { ...state, cartItems: state.cartItems.filter((i) => i.id !== id) };
    }

    // Limpia el carrito
    case "CLEAR_CART":
      return { ...state, cartItems: [] };

    default:
      return state;
  }
}

export default userReducer;