import { createStore } from "redux";

let initSate = {
  words: null,
};

const mainReducer = (state=initSate, action) => {
  switch (action.type) {
    case "SET_WORDS":
    return {
    ...state,
    words: action.payload,
    };
    default:
    return {
        ...state,
    };
  }
};

let store = createStore(mainReducer);

export default store;