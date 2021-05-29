import axios from "axios";
import { GET_ERRORS, SET_CURRENT_USER } from "./action-types";
import setJWTToken from "../securityUtils/setJWTToken";
import jwt_decode from "jwt-decode";

export const createNewUser = (user, history) => async (dispatch) => {
  try {
    const res = await axios.post("/api/users/register", user);
    history.push("/login");
    dispatch({
      type: GET_ERRORS,
      payload: {},
    });
  } catch (err) {
    dispatch({
      type: GET_ERRORS,
      payload: err.response.data,
    });
  }
};

export const login = (loginRequest) => async (dispatch) => {
  try {
    const res = await axios.post("/api/users/login", loginRequest);
    const { token } = res.data;
    localStorage.setItem("jwtToken", token);
    setJWTToken(token);
    const decodedToken = jwt_decode(token);
    dispatch({
      type: SET_CURRENT_USER,
      payload: decodedToken,
    });
  } catch (err) {
    dispatch({
      type: GET_ERRORS,
      payload: err.response.data,
    });
  }
};

export const logout = () => (dispatch) => {
  localStorage.removeItem("jwtToken");
  setJWTToken(false);
  dispatch({
    type: SET_CURRENT_USER,
    payload: {},
  });
};
