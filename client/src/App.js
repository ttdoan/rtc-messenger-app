import React from "react";
import { MuiThemeProvider } from "@material-ui/core";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import { Provider } from "react-redux";

import { theme } from "./themes/theme";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import ChatPage from "./pages/ChatPage";
import PrivateRoute from "./components/PrivateRoute";
import store from "./ducks/store";

import "./App.css";

function App() {
  return (
    <React.StrictMode>
      <MuiThemeProvider theme={theme}>
        <Provider store={store}>
          <BrowserRouter>
            <Switch>
              <Route path="/" exact component={LoginPage} />
              <Route path="/signup" exact component={SignupPage} />
              <Route path="/login" exact component={LoginPage} />
              <PrivateRoute path="/chat" exact component={ChatPage} />
            </Switch>
          </BrowserRouter>
        </Provider>
      </MuiThemeProvider>
    </React.StrictMode>
  );
}

export default App;
