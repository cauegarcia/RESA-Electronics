import React, { useEffect, useContext, useReducer, useCallback } from "react";
import reducer from "./reducer";
import { stock } from "./stock";

const AppContext = React.createContext();

const initialState = {
  menuOpen: false,
  modalOpen: false,
  loggedIn: false,
  register: false,
  cartOpen: false,
  filterOpen: true,
  stock: stock,
  cart: {
    items: [],
    total: 0,
  },
  filterConditions: {
    search: "",
    minPrice: "",
    maxPrice: "",
    brand: [],
    category: [],
    condition: [],
  },
  filteredStock: stock,
  tagContent: [],
  amountToCart: 1,
  person: {
    fullName: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
  },
  currentUser: "",
  registerConfirmation: false,
  alert: {
    show: false,
    msg: "",
    type: "",
    caller: "",
  },
  formValid: false,
};

const AppProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const toggleMenu = () => {
    dispatch({ type: "TOGGLE_MENU" });
  };
  const toggleModal = useCallback(() => {
    dispatch({ type: "TOGGLE_MODAL" });
  }, []);
  const toggleLogin = useCallback((e) => {
    dispatch({ type: "TOGGLE_LOGIN", payload: e });
  }, []);
  const increaseAmount = (id, type) => {
    dispatch({ type: "INCREASE_AMOUNT", payload: { id, type } });
  };
  const decreaseAmount = (id, type) => {
    dispatch({ type: "DECREASE_AMOUNT", payload: { id, type } });
    dispatch({ type: "UPDATE_CART" });
  };
  const removeItem = (id) => {
    dispatch({ type: "REMOVE_ITEM", payload: id });
    dispatch({ type: "UPDATE_CART" });
  };
  const toggleCart = useCallback((e) => {
    dispatch({ type: "TOGGLE_CART", payload: e });
  }, []);
  const toggleFilter = () => {
    dispatch({ type: "TOGGLE_FILTER" });
  };
  const submitFilter = (e) => {
    dispatch({ type: "SUBMIT_FILTER", payload: e });
    dispatch({ type: "UPDATE_ITEMSFILTERED" });
    toggleFilter();
    dispatch({ type: "SET_TAGS" });
  };
  const clearFilter = (e) => {
    dispatch({ type: "CLEAR_FILTER", payload: e });
    dispatch({ type: "UPDATE_ITEMSFILTERED" });
  };
  const selectSort = (value) => {
    dispatch({ type: "SELECT_SORT", payload: value });
  };
  const deleteTag = (e) => {
    dispatch({ type: "DELETE_TAG", payload: e });
    dispatch({ type: "UPDATE_ITEMSFILTERED" });
  };
  const addToCart = ({ id, color }) => {
    dispatch({ type: "ADD_TO_CART", payload: { id, color } });
  };
  const toggleRegister = useCallback(() => {
    dispatch({ type: "TOGGLE_REGISTER" });
  }, []);
  const handlePerson = (e) => {
    dispatch({ type: "HANDLE_PERSON", payload: e });
    dispatch({ type: "CHECK_FORM", payload: e });
  };
  const handleRegister = (e) => {
    dispatch({ type: "CHECK_FORM", payload: e });
  };
  const handleLogin = (e) => {
    dispatch({ type: "HANDLE_LOGIN", payload: e });
  };
  const resetAlert = useCallback(() => {
    dispatch({ type: "RESET_ALERT" });
  }, []);
  const displayAlert = useCallback(({ show, msg, type, caller }) => {
    dispatch({ type: "DISPLAY_ALERT", payload: { show, msg, type, caller } });
  }, []);
  const setCurrentUser = useCallback((user) => {
    dispatch({ type: "SET_CURRENT_USER", payload: user });
  }, []);
  const resetPerson = () => {
    dispatch({ type: "RESET_PERSON" });
  };
  const setInitialCart = useCallback(() => {
    dispatch({ type: "SET_INITIAL_CART" });
  }, []);
  const toggleFormValid = useCallback(() => {
    dispatch({ type: "TOGGLE_FORM_VALID" });
  }, []);

  useEffect(() => {
    selectSort("price-lowest");
  }, []);
  useEffect(() => {
    dispatch({ type: "GET_TOTAL" });
    dispatch({ type: "UPDATE_LOCAL_STORAGE" });
  }, [state.cart.items]);

  return (
    <AppContext.Provider
      value={{
        ...state,
        toggleMenu,
        toggleModal,
        increaseAmount,
        decreaseAmount,
        removeItem,
        toggleCart,
        toggleFilter,
        submitFilter,
        clearFilter,
        selectSort,
        deleteTag,
        addToCart,
        toggleRegister,
        handlePerson,
        handleRegister,
        resetAlert,
        displayAlert,
        handleLogin,
        toggleLogin,
        setCurrentUser,
        resetPerson,
        setInitialCart,
        toggleFormValid,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
export const useGlobalContext = () => {
  return useContext(AppContext);
};
export { AppContext, AppProvider };
