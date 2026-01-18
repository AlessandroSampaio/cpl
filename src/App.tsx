import {
  ColorModeProvider,
  ColorModeScript,
  createLocalStorageManager,
} from "@kobalte/core";
import "./App.css";
import { Button } from "./components/ui/button";

function App() {
  const storageManager = createLocalStorageManager("vite-ui-theme");

  return (
    <>
      <ColorModeScript storageType={storageManager.type} />
      <ColorModeProvider storageManager={storageManager}>
        <main class="h-dvh flex flex-col gap-4">
          <h1 class="text-2xl text-center">Controle de Produção</h1>
          <div class="flex flex-col items-center justify-center gap-8 px-8">
            <div class="flex gap-8">
              <Button
                variant="outline"
                class="h-52 w-44 cursor-pointer flex flex-col p-4"
              >
                <div class="flex-1"></div>
                <span class="text-lg">Produtores</span>
              </Button>

              <Button
                variant="outline"
                class="h-52 w-44 cursor-pointer flex flex-col p-4"
              >
                <div class="flex-1"></div>
                <span class="text-lg">Coletores</span>
              </Button>
            </div>
            <div class="flex gap-8">
              <Button
                variant="outline"
                class="h-52 w-44 cursor-pointer flex flex-col p-4"
              >
                <div class="flex-1"></div>
                <span class="text-lg">Registrar Coleta</span>
              </Button>
              <Button
                variant="outline"
                class="h-52 w-44 cursor-pointer flex flex-col p-4"
              >
                <div class="flex-1"></div>
                <span class="text-lg">Registrar Retirada</span>
              </Button>
            </div>
          </div>
        </main>
      </ColorModeProvider>
    </>
  );
}

export default App;
