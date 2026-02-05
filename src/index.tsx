/* @refresh reload */
import { render } from "solid-js/web";
import App from "./App";
import { onMount } from "solid-js";
import { getCurrentWindow } from "@tauri-apps/api/window";

const AppWrappper = () => {
  onMount(async () => {
    const appWindow = getCurrentWindow();

    await appWindow.show();
  });

  return <App />;
};

render(() => <AppWrappper />, document.getElementById("root") as HTMLElement);
