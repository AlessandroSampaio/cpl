import { Route, Router } from "@solidjs/router";
import "./App.css";
import { Layout } from "./components/layout";
import { Home } from "./pages/home";
import { Producers } from "./pages/producers";

function App() {
  return (
    <Router root={(props) => <Layout>{props.children}</Layout>}>
      <Route path={"/"} component={Home} />
      <Route path="/producers">
        <Route path="/new" component={Producers} />
      </Route>
    </Router>
  );
}

export default App;
