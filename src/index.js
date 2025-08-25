import React from "react";
import ReactDOM from "react-dom";
import "./assets/css/tailwind.output.css";
import App from "./App";
import { Provider } from "react-redux";
import store from "./store/store";
import { Windmill } from "@windmill/react-ui";
import * as serviceWorker from "./serviceWorker";

ReactDOM.render(
  <Provider store={store}>
    <Windmill usePreferences>
      <App />
    </Windmill>
  </Provider>,
  document.getElementById("root")
);

serviceWorker.register();
