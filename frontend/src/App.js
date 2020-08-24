import React from "react";
import "./App.css";
import { ConnectedRouter } from "connected-react-router";
import routes from "./routes";

function App() {
  return (
    <ConnectedRouter history={history}>
      <link
        rel="stylesheet"
        href="https://stackpath.bootstrapcdn.com/bootstrap/4.1.0/css/bootstrap.min.css"
      ></link>
      {routes}
    </ConnectedRouter>
  );
}

export default App;
