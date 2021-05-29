import { SET_CURRENT_USER } from "../actions/action-types";

const initialState = {
  user: {},
  isAuthenticated : false
};


const checkIsAuthenticated = payload => {
    if (payload) {
      return true;
    } else {
      return false;
    }
  };
  


export default function getProjects(state = initialState, action) {
    switch (action.type) {
      case SET_CURRENT_USER:
        return {
          ...state,
          user: action.payload,
          isAuthenticated :checkIsAuthenticated(action.payload)
        };
      default:
        return state;
    }
  }