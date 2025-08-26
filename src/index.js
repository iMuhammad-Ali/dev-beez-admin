import React from "react";
import ReactDOM from "react-dom";
import "./assets/css/tailwind.output.css";
import App from "./App";
import { Provider } from "react-redux";
import store from "./store/store";
import { Windmill } from "@windmill/react-ui";
import * as serviceWorker from "./serviceWorker";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./firebase/firebaseConfig";
import { setUser } from "./store/authSlice";

ReactDOM.render(
  <Provider store={store}>
    <Windmill usePreferences>
      <App />
    </Windmill>
  </Provider>,
  document.getElementById("root")
);

// keep redux auth state in sync with Firebase SDK
onAuthStateChanged(auth, (user) => {
  if (user) {
    store.dispatch(setUser({ uid: user.uid, email: user.email }));
  } else {
    store.dispatch(setUser(null));
  }
});

serviceWorker.register();
