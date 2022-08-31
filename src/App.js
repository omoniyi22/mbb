import React from "react";
import Router from "./Routes";
import { Provider } from "react-redux";
import { store } from "./store";
import "./asset/styles/index.scss"


const App = () => (
  <React.StrictMode>
    <Provider store={store}>
      <Router />
    </Provider>
  </React.StrictMode>
)

export default App;