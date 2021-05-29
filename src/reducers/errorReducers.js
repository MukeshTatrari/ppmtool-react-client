import { GET_ERRORS } from "../actions/action-types";
const initialState = { errors: "" };

export default function editMessage(state = initialState, action) {
  switch (action.type) {
    case GET_ERRORS:
      return action.payload;
    default:
      return state;
  }
}
