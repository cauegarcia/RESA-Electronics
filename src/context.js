import React, { useEffect, useContext, useReducer } from "react";
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
  users: [],
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
  const toggleModal = () => {
    dispatch({ type: "TOGGLE_MODAL" });
  };
  const toggleLogin = () => {
    dispatch({ type: "TOGGLE_LOGIN" });
  };
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
  const toggleCart = () => {
    dispatch({ type: "TOGGLE_CART" });
  };
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
  const addToCart = (id) => {
    dispatch({ type: "ADD_TO_CART", payload: id });
  };
  const toggleRegister = () => {
    dispatch({ type: "TOGGLE_REGISTER" });
  };
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
  const resetAlert = () => {
    dispatch({ type: "RESET_ALERT" });
  };
  const displayAlert = ({ show, msg, type, caller }) => {
    dispatch({ type: "DISPLAY_ALERT", payload: { show, msg, type, caller } });
  };
  useEffect(() => {
    if (state.formValid) {
      dispatch({ type: "HANDLE_REGISTER" });
      displayAlert({
        show: true,
        msg: "Register Succesful",
        type: "success",
        caller: "register",
      });
    }
  }, [state.formValid]);
  useEffect(() => {
    selectSort("price-lowest");
  }, []);
  useEffect(() => {
    dispatch({ type: "GET_TOTAL" });
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
