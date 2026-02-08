import { lazy } from "solid-js";
import { Route, Router } from "@solidjs/router";
import "~/App.css";
import { Layout } from "~/components/layout";

const Home = lazy(() => import("~/pages/home"));
const Producers = lazy(() => import("~/pages/producers"));
const Collectors = lazy(() => import("~/pages/collectors"));
const Collections = lazy(() => import("~/pages/collections"));
const Withdrawals = lazy(() => import("~/pages/withdrawals"));
const SplashScreen = lazy(() => import("~/pages/splash-screen"));

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
