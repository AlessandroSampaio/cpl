import { Route, Router } from "@solidjs/router";
import "./App.css";
import { Layout } from "./components/layout";
import { Home } from "./pages/home";

function App() {
  return (
    <Router root={(props) => <Layout>{props.children}</Layout>}>
      <Route path={"/"} component={Home} />
    </Router>
  );
}

export default App;
