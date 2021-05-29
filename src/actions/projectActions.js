import axios from "axios";
import {
  GET_ERRORS,
  GET_PROJECTS,
  GET_PROJECT,
  DELETE_PROJECT,
} from "./action-types";

export const createProject = (project, history) => async (dispatch) => {
  try {
    const res = await axios.post("/api/project", project);
    history.push("/dashboard");
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

export const getProjects = () => async (dispatch) => {
  const res = await axios.get("/api/project/all");
  dispatch({
    type: GET_PROJECTS,
    payload: res.data,
  });
};

export const getProject = (projectId, history) => async (dispatch) => {
  try {
    const res = await axios.get(`/api/project/${projectId}`);
    dispatch({
      type: GET_PROJECT,
      payload: res.data,
    });
  } catch (err) {
    history.push("/dashboard");
  }
};

export const deleteProject = (projectId) => async (dispatch) => {
  try {
    if (
      window.confirm(
        "Are you sure? This will delete the project and all the data related to it"
      )
    ) {
      const res = await axios.delete(`/api/project/${projectId}`);
      dispatch({
        type: DELETE_PROJECT,
        payload: projectId,
      });
    }
  } catch (err) {
    console.log(err);
  }
};
