import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import store from "@qwhub/store";
import { TwitchAuthProvider } from "./TwitchAuth.jsx";
import VideoOverlayApp from "./VideoOverlayApp.jsx";
import "@qwhub/styles/index.scss";

ReactDOM.createRoot(document.getElementById("root")).render(
  // <React.StrictMode>
  <TwitchAuthProvider>
    <Provider store={store}>
      <VideoOverlayApp />
    </Provider>
  </TwitchAuthProvider>,
  // </React.StrictMode>,
);
