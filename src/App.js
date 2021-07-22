import React, { useEffect, useState } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";

import Index from "./components/index";
import Register from "./components/register";
import Navbar from "./components/navbar.js";
import Profile from "./components/profile";
import { ChakraProvider } from "@chakra-ui/react";

function getToken() {
  return localStorage.getItem("token") ? localStorage.getItem("token") : "";
}

export default function App() {
  const [token, setToken] = useState("");

  useEffect(() => {
    setToken(getToken());
  }, []);

  return (
    <ChakraProvider>
      <Router>
        <div>
          <Navbar parentState={token} parentStateSetter={setToken} />
          {/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
          <Switch>
            <Route exact path="/">
              <Index parentState={token} parentStateSetter={setToken} />
            </Route>
            <Route exact path="/register">
              <Register />
            </Route>
            <Route exact path="/profile">
              <Profile />
            </Route>
            <Route path="*" exact={true}>
              <Redirect to="/" />
            </Route>
          </Switch>
        </div>
      </Router>
    </ChakraProvider>
  );
}
