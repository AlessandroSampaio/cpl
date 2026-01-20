import { Route, Router } from "@solidjs/router";
import "./App.css";
import { Layout } from "./components/layout";
import { Home } from "./pages/home";
import { Producers } from "./pages/producers";
import { Collectors } from "./pages/collectors";

function App() {
  return (
    <Router root={(props) => <Layout>{props.children}</Layout>}>
      <Route path={"/"} component={Home} />
      <Route path="/producers" component={Producers} />
      <Route path="/collectors" component={Collectors} />
    </Router>
  );
}

export default App;
