import "./App.css";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import ProductDetail from "./pages/ProductDetail";

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/">
          <ProductDetail />
        </Route>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
