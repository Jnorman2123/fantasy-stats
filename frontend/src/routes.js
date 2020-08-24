import React from "react";
import { Route, Switch } from "react-router";
import PlayersContainer from "./containers/PlayersContainer";
import Home from "./components/home/Home";

const routes = (
  <div>
    <Switch>
      <Route exact path="/" component={Home} />
      <Route exact path="/players" component={PlayersContainer} />
    </Switch>
  </div>
);

export default routes;
