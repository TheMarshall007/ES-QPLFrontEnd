import React from "react";
import "./App.css";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
  useLocation,
} from "react-router-dom";
import NavigationComp from "./components/navigation/NavigationComp";
import Page404 from "./pages/page404/Page404";
import jwt from "jwt-decode";
import Home from "./pages/home/Home";
import Login from "./pages/login/Login";
import Student from "./pages/student/Student";
import Questions from "./pages/questions/Questions";
import AlertComp from "./services/alerts/AlertComp";
import Trail from "./pages/trail/Trail";
import Answers from "./pages/answers/Answers";

function getTokenInfos() {
  const jsonToken = localStorage.getItem("token");
  let decodedToken = null;
  let roles = {};
  let openRoutes = true;
  if (jsonToken) {
    decodedToken = jwt(jsonToken);
    openRoutes = false;
    if (decodedToken.roles.length !== 0) {
      roles = decodedToken?.roles[0];
    }
  }

  return { decodedToken, roles, openRoutes };
}

function useTokenAndRoles() {
  const location = useLocation();
  const { decodedToken, roles, openRoutes } = getTokenInfos();
  const [state, setState] = React.useState({
    decodedToken,
    roles,
    openRoutes,
  });

  React.useEffect(() => {
    const { decodedToken, roles, openRoutes } = getTokenInfos();
    if (Boolean(decodedToken)) {
      if (!state.decodedToken) {
        setState({ decodedToken, roles, openRoutes });
      } else if (state.decodedToken.roles[0] !== decodedToken?.roles[0]) {
        setState({ decodedToken, roles, openRoutes });
      }
    } else {
      if (Boolean(state.decodedToken)) {
        setState({ decodedToken: null, roles: null, openRoutes });
      }
    }
  }, [location, setState, state]);
  return { ...state, pathname: location.pathname };
}

function Pages() {
  const { decodedToken, roles, openRoutes, pathname } = useTokenAndRoles();

  function renderRoute(path, Component) {
    return <Route exact path={path} component={Component} />;
  }

  function renderLoggedRoute(path, Component) {
    return renderRoute(path, (props) => (
      <Component roles={roles} decodedToken={decodedToken} {...props} />
    ));
  }

  return openRoutes ? (
    <Switch>
      {renderRoute("/", Login)}
      {renderRoute("/404", Page404)}
      <Redirect to={"/404"} />
    </Switch>
  ) : (
    <NavigationComp
      decodedToken={decodedToken}
      roles={roles}
      selectedPath={pathname}
    >
      <Switch>
        {renderLoggedRoute("/", Home)}
        {renderLoggedRoute("/estudantes", Student)}
        {renderLoggedRoute("/perguntas", Questions)}
        {renderLoggedRoute("/trilha", Trail)}
        {renderLoggedRoute("/respostas", Answers)}
        {renderRoute("/404", Page404)}
        <Redirect to={"/404"} />
      </Switch>
    </NavigationComp>
  );
}

function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Pages />
        </Switch>
      </Router>
      <AlertComp />
    </div>
  );
}

export default App;
