import "./App.css";
import Dashboard from "../components/Dashboard";
import Header from "../components/layout/Header";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Route,Switch  } from "react-router-dom";
import AddProject from "../components/project/AddProject";
import { Provider } from "react-redux";
import store from "../store";
import UpdateProject from "../components/project/UpdateProject";
import ProjectBoard from "../components/projectBoard/ProjectBoard";
import AddProjectTask from "../components/project/projectTask/AddProjectTask";
import UpdateProjectTask from "../components/project/projectTask/UpdateProjectTask";
import AssignToUser from "../components/project/projectTask/AssignToUser";
import Landing from "../components/layout/Landing";
import Login from "../components/userManagement/Login";
import Register from "../components/userManagement/Register";

import jwt_decode from "jwt-decode";
import setJWTToken from "../securityUtils/setJWTToken";
import { SET_CURRENT_USER } from "../actions/action-types";
import { logout } from "../actions/securityActions";
import SecuredRoute from "../securityUtils/SecuredRoute";

const jwtToken = localStorage.jwtToken;

if (jwtToken) {
  setJWTToken(jwtToken);
  const decoded_jwtToken = jwt_decode(jwtToken);
  store.dispatch({
    type: SET_CURRENT_USER,
    payload: decoded_jwtToken,
  });

  const currentTime = Date.now() / 1000;
  if (decoded_jwtToken.exp < currentTime) {
    store.dispatch(logout());
    window.location.href = "/";
  }
}

function App() {
  return (
    <Provider store={store}>
      <Router>
        <div className="App">
          <Header />
            <Route exact path="/" component={Landing} />
            <Route exact path="/register" component={Register} />
            <Route exact path="/login" component={Login} />
            <Switch>
              <SecuredRoute exact path="/dashboard" component={Dashboard}></SecuredRoute>
              <SecuredRoute exact path="/addProject" component={AddProject}></SecuredRoute>
              <SecuredRoute exact path="/updateProject/:id" component={UpdateProject}></SecuredRoute>
              <SecuredRoute exact path="/projectBoard/:id" component={ProjectBoard}></SecuredRoute>
              <SecuredRoute exact path="/addProjectTask/:id" component={AddProjectTask}></SecuredRoute>
              <SecuredRoute exact path="/updateProjectTask/:backlog_id/:pt_id" component={UpdateProjectTask}></SecuredRoute>
              <SecuredRoute exact path="/AssignToUser/:backlog_id/:pt_id" component={AssignToUser}></SecuredRoute>
          </Switch>
        </div>
      </Router>
    </Provider>
  );
}

export default App;
