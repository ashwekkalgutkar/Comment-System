import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { GoogleOAuthProvider } from "@react-oauth/google";

const clientId =
  "595246114359-01oh2cfl6i47o5v6e83af40lt9fs97vc.apps.googleusercontent.com";

ReactDOM.render(
  <GoogleOAuthProvider clientId={clientId}>
    <App />
  </GoogleOAuthProvider>,
  document.getElementById("root")
);
