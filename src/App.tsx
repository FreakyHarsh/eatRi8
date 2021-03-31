import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";

import { HomeScreen } from "./pages/HomeScreen";
import { Result } from "./pages/Result";

(window as any).baseURL = process.env.REACT_APP_BASE_URL;
function App() {
  return (
    <Router>
      <Route path='/' exact>
        <HomeScreen />
      </Route>
      <Route path='/plan'>
        <Result />
      </Route>
    </Router>
  );
}

export default App;
