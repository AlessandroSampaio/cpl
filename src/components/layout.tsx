import {
  ColorModeProvider,
  ColorModeScript,
  createLocalStorageManager,
} from "@kobalte/core";
import { children, ParentComponent } from "solid-js";
import { SidebarProvider, SidebarTrigger } from "./ui/sidebar";
import { AppSidebar } from "./app-sidebar";
import { LayoutContent } from "./layout-content";
import { Toaster } from "./ui/toast";

export const Layout: ParentComponent = (props) => {
  const storageManager = createLocalStorageManager("vite-ui-theme");
  const resolved = children(() => props.children);

  return (
    <>
      <ColorModeScript storageType={storageManager.type} />
      <ColorModeProvider storageManager={storageManager}>
        <SidebarProvider>
          <AppSidebar />
          <LayoutContent>
            <SidebarTrigger class="absolute z-10 top-5 left-4" />
            {resolved()}
            <Toaster />
          </LayoutContent>
        </SidebarProvider>
      </ColorModeProvider>
    </>
  );
};
