import React from "react";
import { HashRouter as Router, Route, Switch } from "react-router-dom";

import Header from "./header";
import { FilesPage, SearchPage } from "../pages";

import "./layout.scss";

class Layout extends React.Component {
  render() {
    return (
      <div className="layout">
        <Header />
        <Router>
          <Switch>
            <Route path="/:username/:id">
              <FilesPage />
            </Route>
            <Route path="/:username">
              <SearchPage />
            </Route>
            <Route path="/">
              <SearchPage />
            </Route>
          </Switch>
        </Router>
      </div>
    );
  }
}

export default Layout;
