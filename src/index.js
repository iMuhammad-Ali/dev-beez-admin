import React from "react";
import ReactDOM from "react-dom";
import "./assets/css/tailwind.output.css";
import App from "./App";
import ThemedSuspense from "./components/ThemedSuspense";
import { Provider } from "react-redux";
import store from "./store/store";
import { Windmill } from "@windmill/react-ui";
import * as serviceWorker from "./serviceWorker";

ReactDOM.render(
  <Provider store={store}>
    <React.Suspense fallback={<ThemedSuspense />}>
      <Windmill usePreferences>
        <App />
      </Windmill>
    </React.Suspense>
  </Provider>,
  document.getElementById("root")
);

serviceWorker.register();
