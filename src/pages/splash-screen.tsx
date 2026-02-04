import { A } from "@solidjs/router";
import { Button } from "~/components/ui/button";

export const SplashScreen = () => {
  return (
    <div class="size-full flex flex-col items-center justify-center gap-4">
      <h1 class="text-3xl">Splash Screen</h1>
      <h2 class="text-xl">Say hi to me!!</h2>
      <Button as={A} href="/home">
        Go Home
      </Button>
    </div>
  );
};
