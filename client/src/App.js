import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { Provider } from "react-redux";
import "core-js/stable";
import "regenerator-runtime/runtime";

import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import ChatPage from "./pages/ChatPage";
import PrivateRoute from "./components/PrivateRoute";
import PublicRoute from "./components/PublicRoute";
import Loading from "./components/Loading";
import SnackBar from "./components/SnackBar";
import store from "./ducks/store";

// Material UI
import Grid from "@material-ui/core/Grid";
import { theme } from "./themes/theme";
import { makeStyles, MuiThemeProvider } from "@material-ui/core";

import "./App.css";

const useStyles = makeStyles({
  pageContainer: {
    margin: "auto",
    width: "60%",
    // Based on height of SideBanner
    height: "700px",
  },
});

function App() {
  const classes = useStyles();

  return (
    // <React.StrictMode>
    <MuiThemeProvider theme={theme}>
      <Provider store={store}>
        <Grid container className={classes.pageContainer}>
          <Loading />
          <SnackBar />
          <BrowserRouter>
            <Switch>
              <PublicRoute path="/" exact component={LoginPage} />
              <PublicRoute path="/signup" exact component={SignupPage} />
              <PublicRoute path="/login" exact component={LoginPage} />
              <PrivateRoute path="/chat" exact component={ChatPage} />
              {/* <Route path="/chat" component={ChatPage} /> */}
            </Switch>
          </BrowserRouter>
        </Grid>
      </Provider>
    </MuiThemeProvider>
    // </React.StrictMode>
  );
}

export default App;
