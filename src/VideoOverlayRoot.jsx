import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import store from "@qwhub/store";
import VideoOverlayApp from "./VideoOverlayApp.jsx";
import "@qwhub/styles/index.scss";

window.Twitch.ext.onAuthorized(async function (auth) {
  renderApp(auth.channelId);
});

function renderApp(channelId) {
  ReactDOM.createRoot(document.getElementById("root")).render(
    <React.StrictMode>
      <Provider store={store}>
        <VideoOverlayApp channelId={channelId} />
      </Provider>
    </React.StrictMode>,
  );
}
