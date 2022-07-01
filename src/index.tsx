/* @refresh reload */
// import "bootstrap/scss/bootstrap.scss";
import "@picocss/pico/scss/pico.scss";
import "./index.scss";

import { render } from "solid-js/web";
import App from "./App";

render(() => <App />, document.getElementById("root") as HTMLElement);
