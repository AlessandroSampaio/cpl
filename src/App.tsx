import { Route, Router } from "@solidjs/router";
import "./App.css";
import { Layout } from "./components/layout";
import { Home } from "./pages/home";
import { CreateProducer } from "./pages/create-producer";

function App() {
  return (
    <Router root={(props) => <Layout>{props.children}</Layout>}>
      <Route path={"/"} component={Home} />
      <Route path="/producers">
        <Route path="/new" component={CreateProducer} />
      </Route>
    </Router>
  );
}

export default App;
