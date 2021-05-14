const reducer = (state, action) => {
  if (action.type === "TOGGLE_MENU") {
    return { ...state, menuOpen: !state.menuOpen };
  }
  if (action.type === "TOGGLE_MODAL") {
    return { ...state, modalOpen: !state.modalOpen };
  }
  if (action.type === "TOGGLE_LOGIN") {
    return { ...state, loggedIn: action.payload };
  }
  if (action.type === "GET_TOTAL") {
    let total = state.cart.items.reduce(
      (cartTotal, item) => {
        const { amount, price } = item;
        let itemTotal = price * amount;
        cartTotal.total += itemTotal;
        return cartTotal;
      },
      { total: 0 }
    );
    total.total = parseFloat(total.total.toFixed(2));
    return {
      ...state,
      cart: {
        ...state.cart,
        total: total.total,
      },
    };
  }
  if (action.type === "INCREASE_AMOUNT") {
    if (action.payload.type === "cart") {
      const tempItems = state.cart.items.map((item) => {
        if (item.id === action.payload.id) {
          return { ...item, amount: item.amount + 1 };
        }
        return item;
      });
      return { ...state, cart: { ...state.cart, items: tempItems } };
    }
    if (action.payload.type === "ind") {
      return {
        ...state,
        amountToCart: state.amountToCart < 99 ? state.amountToCart + 1 : 99,
      };
    }
  }
  if (action.type === "DECREASE_AMOUNT") {
    if (action.payload.type === "cart") {
      const tempItems = state.cart.items.map((item) => {
        if (item.id === action.payload.id) {
          return { ...item, amount: item.amount - 1 };
        }
        return item;
      });
      return { ...state, cart: { ...state.cart, items: tempItems } };
    }
    if (action.payload.type === "ind") {
      return {
        ...state,
        amountToCart: state.amountToCart > 1 ? state.amountToCart - 1 : 1,
      };
    }
  }
  if (action.type === "REMOVE_ITEM") {
    const tempItems = state.cart.items.map((item) => {
      if (item.id === action.payload) {
        return { ...item, amount: 0 };
      }
      return item;
    });
    return { ...state, cart: { ...state.cart, items: tempItems } };
  }
  if (action.type === "UPDATE_CART") {
    const itemsToCart = state.cart.items.filter((item) => {
      return item.amount > 0;
    });
    return { ...state, cart: { ...state.cart, items: itemsToCart } };
  }
  if (action.type === "TOGGLE_CART") {
    return { ...state, cartOpen: !state.cartOpen };
  }
  if (action.type === "TOGGLE_FILTER") {
    return { ...state, filterOpen: !state.filterOpen };
  }
  if (action.type === "SUBMIT_FILTER") {
    action.payload.preventDefault();
    const inputs = Array.from(action.payload.target.querySelectorAll("input"));
    const tempFilterConditions = {
      ...state.filterConditions,
      brand: [],
      category: [],
      condition: [],
    };
    inputs.forEach((input) => {
      if (
        (input.type === "text" || input.type === "number") &&
        input.value !== ""
      ) {
        if (input.id === "minPrice" || input.id === "maxPrice") {
          const number = parseFloat(input.value);
          tempFilterConditions[input.id] = number;
        } else {
          tempFilterConditions[input.id] = input.value;
        }
      }
      if (input.type === "checkbox" && input.checked) {
        const parent = input.parentElement.parentElement.id;
        if (tempFilterConditions[parent].indexOf(input.id) < 0) {
          tempFilterConditions[parent] = [
            ...tempFilterConditions[parent],
            input.id,
          ];
        }
      }
    });
    return {
      ...state,
      filterConditions: tempFilterConditions,
    };
  }
  if (action.type === "CLEAR_FILTER") {
    action.payload.preventDefault();
    const inputs = Array.from(
      action.payload.target.parentElement.parentElement.querySelectorAll(
        "input"
      )
    );
    inputs.forEach((input) => {
      if (input.type === "text" || input.type === "number") {
        input.value = "";
      }
      if (input.type === "checkbox") {
        input.checked = false;
      }
    });
    const resetedConditions = {
      search: "",
      minPrice: "",
      maxPrice: "",
      brand: [],
      category: [],
      condition: [],
    };

    return { ...state, filterConditions: resetedConditions, tagContent: [] };
  }
  if (action.type === "UPDATE_ITEMSFILTERED") {
    const conditions = Object.keys(state.filterConditions);
    let tempfilteredStock = [...state.stock];
    conditions.forEach((condition) => {
      const value = state.filterConditions[condition];
      if (typeof value === "string" && value !== "") {
        tempfilteredStock = tempfilteredStock.filter((product) => {
          var regex = new RegExp(value, "i");
          return regex.test(product.name);
        });
      }
      if (condition === "minPrice" && value !== "") {
        tempfilteredStock = tempfilteredStock.filter((product) => {
          return product.price >= value;
        });
      }
      if (condition === "maxPrice" && value !== "") {
        tempfilteredStock = tempfilteredStock.filter((product) => {
          return product.price <= value;
        });
      }
      if (condition === "brand" && value.length > 0) {
        tempfilteredStock = tempfilteredStock.filter((product) => {
          if (value.includes(product.brand)) {
            return true;
          }
          return false;
        });
      }
      if (condition === "category" && value.length > 0) {
        tempfilteredStock = tempfilteredStock.filter((product) => {
          if (value.includes(product.category)) {
            return true;
          }
          return false;
        });
      }
      if (condition === "condition" && value.length > 0) {
        tempfilteredStock = tempfilteredStock.filter((product) => {
          if (value.includes(product.condition)) {
            return true;
          }
          return false;
        });
      }
    });

    return { ...state, filteredStock: tempfilteredStock };
  }
  if (action.type === "SELECT_SORT") {
    let tempFilteredStock = state.filteredStock;
    switch (action.payload) {
      case "price-lowest":
        tempFilteredStock.sort((a, b) => {
          if (a.price > b.price) {
            return 1;
          }
          if (a.price < b.price) {
            return -1;
          }
          return 0;
        });
        break;
      case "price-highest":
        tempFilteredStock.sort((a, b) => {
          if (a.price < b.price) {
            return 1;
          }
          if (a.price > b.price) {
            return -1;
          }
          return 0;
        });
        break;
      case "name-a":
        tempFilteredStock.sort((a, b) =>
          a.nameShort.localeCompare(b.nameShort)
        );
        break;
      case "name-z":
        tempFilteredStock.sort((a, b) =>
          b.nameShort.localeCompare(a.nameShort)
        );
        break;
      default:
        console.log("We cannot find this sort property");
    }
    return {
      ...state,
      sortOption: action.payload,
      filteredStock: tempFilteredStock,
    };
  }
  if (action.type === "SET_TAGS") {
    let tempTagContent = [];
    for (let condition in state.filterConditions) {
      if (
        (state.filterConditions[condition] !== "" &&
          state.filterConditions[condition].length > 0) ||
        typeof state.filterConditions[condition] === "number"
      ) {
        if (condition === "minPrice") {
          tempTagContent.push(
            `min-price: ${state.filterConditions[condition]}`
          );
        } else if (condition === "maxPrice") {
          tempTagContent.push(
            `max-price: ${state.filterConditions[condition]}`
          );
        } else {
          tempTagContent.push(state.filterConditions[condition]);
        }
      }
    }
    tempTagContent = tempTagContent.flat(1);
    return { ...state, tagContent: tempTagContent };
  }
  if (action.type === "DELETE_TAG") {
    const conditions = Array.from(
      new Set(
        state.stock.map((item) => {
          return item.condition;
        })
      )
    );
    const brands = Array.from(
      new Set(
        state.stock.map((item) => {
          return item.brand;
        })
      )
    );
    const categories = Array.from(
      new Set(
        state.stock.map((item) => {
          return item.category;
        })
      )
    );
    const tempFilterConditions = { ...state.filterConditions };

    let type = "";
    const uncheck = (type) => {
      if (
        document.querySelector(`#${type} #${action.payload.target.id}`) ===
          null &&
        type === "condition"
      ) {
        document.querySelector(
          `#${type} article:nth-child(2) input`
        ).checked = false;
      } else {
        document.querySelector(
          `#${type} article #${action.payload.target.id}`
        ).checked = false;
      }
    };
    if (conditions.indexOf(action.payload.target.id) >= 0) {
      tempFilterConditions.condition = tempFilterConditions.condition.filter(
        (item) => {
          return item !== action.payload.target.id;
        }
      );
      type = "condition";
      uncheck(type);
    }
    if (brands.indexOf(action.payload.target.id) >= 0) {
      tempFilterConditions.brand = tempFilterConditions.brand.filter((item) => {
        return item !== action.payload.target.id;
      });
      type = "brand";
      uncheck(type);
    }
    if (categories.indexOf(action.payload.target.id) >= 0) {
      tempFilterConditions.category = tempFilterConditions.category.filter(
        (item) => {
          return item !== action.payload.target.id;
        }
      );
      type = "category";
      uncheck(type);
    }
    if (/max/.test(action.payload.target.id)) {
      tempFilterConditions.maxPrice = "";
      document.querySelector(`#maxPrice`).value = "";
    }
    if (/min/.test(action.payload.target.id)) {
      tempFilterConditions.minPrice = "";
      document.querySelector(`#minPrice`).value = "";
    }
    if (action.payload.target.id === tempFilterConditions.search) {
      tempFilterConditions.search = "";
      document.querySelector(`#search`).value = "";
    }
    let tempTagContent = state.tagContent.filter((tag) => {
      return tag !== action.payload.target.id;
    });
    return {
      ...state,
      tagContent: tempTagContent,
      filterConditions: tempFilterConditions,
    };
  }
  if (action.type === "ADD_TO_CART") {
    if (
      state.cart.items.some((item) => {
        return (
          item.id === action.payload.id && item.color === action.payload.color
        );
      })
    ) {
      const tempItems = state.cart.items.map((item) => {
        return item.id !== action.payload.id
          ? item
          : item.color !== action.payload.color
          ? item
          : { ...item, amount: item.amount + state.amountToCart };
      });
      return {
        ...state,
        cart: {
          ...state.cart,
          items: tempItems,
        },
      };
    } else {
      const itemToAdd = state.stock.filter((item) => {
        return item.id === action.payload.id;
      });
      itemToAdd[0].amount = state.amountToCart;
      const createId = (length) => {
        const result = [];
        const characters = "0123456789";
        const charactersLength = characters.length;
        for (let i = 0; i < length; i++) {
          result.push(
            characters.charAt(Math.floor(Math.random() * charactersLength))
          );
        }
        return result.join("");
      };
      return {
        ...state,
        cart: {
          ...state.cart,
          items: [
            ...state.cart.items,
            {
              id: parseInt(createId(5)),
              color: action.payload.color,
              amount: itemToAdd[0].amount,
              nameShort: itemToAdd[0].nameShort,
              price: itemToAdd[0].price,
              image: itemToAdd[0].image,
            },
          ],
        },
      };
    }
  }
  if (action.type === "TOGGLE_REGISTER") {
    return { ...state, register: !state.register };
  }
  if (action.type === "HANDLE_PERSON") {
    const name = action.payload.target.name;
    let value = action.payload.target.value;
    return {
      ...state,
      person: { ...state.person, [name]: value },
    };
  }
  if (action.type === "CHECK_FORM") {
    action.payload.preventDefault();
    let inputs = [];
    if (action.payload.target.id === "registerForm") {
      inputs.push(state.person);
      inputs = Array.from(action.payload.target.querySelectorAll("input"));
    }

    const name = action.payload.target.name;

    let tempAlert = { ...state.alert };
    if (
      (name === "email" || inputs.length > 0) &&
      state.person.fullName.length < 3
    ) {
      tempAlert.show = true;
      tempAlert.msg = "Please enter a valid name";
      tempAlert.type = "alert";
      tempAlert.caller = "name";
      if (inputs.length > 0) {
        return {
          ...state,
          alert: tempAlert,
          person: { ...state.person, fullName: "" },
        };
      }
    }
    if (name === "password" || inputs.length > 0) {
      const validate = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/g.test(
        state.person.email
      );
      if (!validate) {
        tempAlert.show = true;
        tempAlert.msg = "Please enter a valid email";
        tempAlert.type = "alert";
        tempAlert.caller = "email";
        if (inputs.length > 0) {
          return {
            ...state,
            alert: tempAlert,
            person: { ...state.person, email: "" },
          };
        }
      }
    }
    if (name === "confirmPassword" || inputs.length > 0) {
      const validate = /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.{8,})/g.test(
        state.person.password
      );
      if (!validate) {
        tempAlert.show = true;
        tempAlert.msg =
          "Your password must be at least 8 characters long and contain at least: 1 Uppercase letter, 1 Lowercase letter and 1 digit.";
        tempAlert.type = "password";
        tempAlert.caller = "password";
        if (inputs.length > 0) {
          return {
            ...state,
            alert: tempAlert,
            person: { ...state.person, password: "" },
          };
        }
      }
      if (inputs.length > 0) {
        if (state.person.password !== state.person.confirmPassword) {
          tempAlert.show = true;
          tempAlert.msg =
            "This password does not match the one entered above. ";
          tempAlert.type = "alert";
          tempAlert.caller = "confirmPassword";
          return {
            ...state,
            alert: tempAlert,
            person: { ...state.person, confirmPassword: "" },
          };
        }
      }
    }
    if (inputs.length > 0) {
      return {
        ...state,
        alert: tempAlert,
        formValid: true,
      };
    } else {
      return {
        ...state,
        alert: tempAlert,
      };
    }
  }
  if (action.type === "TOGGLE_FORM_VALID") {
    return {
      ...state,
      formValid: false,
    };
  }
  if (action.type === "HANDLE_LOGIN") {
    let tempAlert = { ...state.alert };
    if (action.payload === "success") {
      tempAlert.show = true;
      tempAlert.msg = "Login Succesful";
      tempAlert.type = "success";
      tempAlert.caller = "login";
      return {
        ...state,
        alert: tempAlert,
        modalOpen: !state.modalOpen,
      };
    }
    if (action.payload === "password") {
      tempAlert.show = true;
      tempAlert.msg = "Invalid Password";
      tempAlert.type = "alert";
      tempAlert.caller = "invalidPassword";
      return { ...state, alert: tempAlert };
    }
    if (action.payload === "email") {
      tempAlert.show = true;
      tempAlert.msg = "User not found. Please verify the user email inserted";
      tempAlert.type = "alert";
      tempAlert.caller = "invalidEmail";
      return { ...state, alert: tempAlert };
    }
  }
  if (action.type === "RESET_ALERT") {
    return { ...state, alert: { show: false, msg: "", type: "", caller: "" } };
  }
  if (action.type === "DISPLAY_ALERT") {
    return {
      ...state,
      alert: {
        show: action.payload.show,
        msg: action.payload.msg,
        type: action.payload.type,
        caller: action.payload.caller,
      },
    };
  }
  if (action.type === "SET_CURRENT_USER") {
    return {
      ...state,
      currentUser: action.payload,
    };
  }
  if (action.type === "RESET_PERSON") {
    const resetPerson = {
      fullName: "",
      email: "",
      phone: "",
      password: "",
      confirmPassword: "",
    };
    return {
      ...state,
      person: resetPerson,
      formValid: false,
    };
  }
  if (action.type === "UPDATE_LOCAL_STORAGE") {
    const cartItems = JSON.stringify({ cart: state.cart.items });
    window.localStorage.setItem("RESA_CART", cartItems);

    return {
      ...state,
    };
  }
  if (action.type === "SET_INITIAL_CART") {
    let cartItems = window.localStorage.getItem("RESA_CART");
    cartItems = JSON.parse(cartItems);
    return {
      ...state,
      cart: { ...state.cart, items: cartItems.cart },
    };
  }
  throw new Error("no matching action type");
};
export default reducer;
