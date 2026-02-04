import { Route, Router } from "@solidjs/router";
import "~/App.css";
import { Layout } from "~/components/layout";
import { Home } from "~/pages/home";
import { Producers } from "~/pages/producers";
import { Collectors } from "~/pages/collectors";
import { Collections } from "~/pages/collections";
import { Withdrawals } from "./pages/withdrawals";
import { SplashScreen } from "./pages/splash-screen";

function App() {
  return (
    <Router>
      <Route path="/splashscreen" component={SplashScreen} />
      <Route path="/" component={Layout}>
        <Route path={"/home"} component={Home} />
        <Route path="/producers" component={Producers} />
        <Route path="/collectors" component={Collectors} />
        <Route path="/collections" component={Collections} />
        <Route path="/withdrawals" component={Withdrawals} />
      </Route>
    </Router>
  );
}

export default App;
