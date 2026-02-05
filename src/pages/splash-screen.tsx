import { A } from "@solidjs/router";
import { createSignal, onMount } from "solid-js";
import { Button } from "~/components/ui/button";
import { createTauRPCProxy } from "~/types/rpc";

export const SplashScreen = () => {
  const rpc = createTauRPCProxy();

  const [msg, setMsg] = createSignal("");

  onMount(() =>
    rpc.setup.on_progress((progress) => {
      console.log(`Progress (${progress.progress}%): ${progress.message}`);
      setMsg(`Progress (${progress.progress}%): ${progress.message}`);
    }),
  );
  return (
    <div class="size-full flex flex-col items-center justify-center gap-4">
      <h1 class="text-3xl">Splash Screen</h1>
      <h2 class="text-xl">Say hi to me!!</h2>
      <span>{msg()}</span>
      <Button as={A} href="/home">
        Go Home
      </Button>
    </div>
  );
};
