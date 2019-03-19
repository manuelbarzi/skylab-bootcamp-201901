import React, { Component } from "react";
import { Route, withRouter, Redirect } from "react-router-dom";

import logic from "../../logic";
import { Home } from "../Home";
import Login from "../Login";
import RegisterPlayer from "../RegisterPlayer";
import Ranking from "../Ranking";
import { Header } from "../Header/Header";
import Grid from "@material-ui/core/Grid";
import styles from "./index.module.scss";
import { MuiThemeProvider, createMuiTheme } from "@material-ui/core/styles";
import cyan from "@material-ui/core/colors/cyan";
const theme = createMuiTheme({
  palette: {
    primary: { main: cyan[200] }
  },
  typography: {
    // Tell Material-UI what's the font-size on the html element is.
    htmlFontSize: 15,
  },
});

class App extends Component {
  state = {
    player: null
  };
  handleLogin = (email, password) => {
    try {
      logic
      .loginPlayer(email, password)
      .then(response => {
        this.setState({ player: response.player });
        logic.storeToken(response.token);
        this.props.history.push("/home");
      })
      .catch(error => {
        throw Error(error);
      });
    } catch (error) {
      throw Error(error);
    }
  };
  
  handleRegister = (
    name,
    surname,
    email,
    password,
    passwordConfirm,
    preferedPosition,
    link
    ) => {
      try {
        logic
        .registerPlayer(
          name,
          surname,
          email,
          password,
          passwordConfirm,
          preferedPosition,
          link
          )
        .then(() => this.props.history.push("/login"))
        .catch(error => {
          throw Error(error);
        });
      } catch (error) {
        throw Error(error);
    }
  };
  
  handleSetAvailable = matchId => {
    logic.addAvalabilityPlayer(this.state.player._id, matchId);
  };
  
  handleSetUnavailable = matchId => {
    logic.deleteAvalabilityPlayer(this.state.player._id, matchId);
  };

  handleLogout = () => {
     logic.logout();
     this.props.history.push("/login");
  };
  
  componentDidMount() {
    const token = logic.getStoredtoken();
    if (!token) {
      this.props.history.push("/login");
    } else {
      logic.getPlayerById(token).then(response => {
        this.setState({ player: response });
      });
    }
  }

  render() {
    const {
      handleLogin,
      handleLogout,
      handleRegister,
      handleSetAvailable,
      handleSetUnavailable
    } = this;

    return (
      <MuiThemeProvider theme={theme}>
      <main className={styles.body}>
        <Header onLogout={handleLogout} navigation={this.props} />
        <div>
          <Route
            path="/register"
            render={() => <RegisterPlayer onRegister={handleRegister} />}
          />
          <Route path="/login" render={() => <Login onLogin={handleLogin} />} />
          <Route
            path="/home"
            render={() =>
              logic.isPlayerLoggedIn() ? (
                <Home
                  handleSetAvailable={handleSetAvailable}
                  handleSetUnavailable={handleSetUnavailable}
                  playerlogged={this.state.player}
                />
              ) : (
                <Redirect to={{ pathname: "/login" }} />
              )
            }
          />
          <Route
            exact
            path="/"
            render={() => <Redirect to={{ pathname: "/home" }} />}
          />
          <Route path="/players" component={Ranking} />
        </div>
      </main>
      </MuiThemeProvider>
    );
  }
}
export default withRouter(App);
