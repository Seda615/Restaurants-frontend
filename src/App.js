import './assets/style.css'
import Restaurants from './container/restaurants-list';
import AboutRestaurant from './container/restaurant';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";

function App() {
  return (
      <Router>
        <Switch>
          <Route path="/about">
            <AboutRestaurant />
          </Route>
          <Route path="/">
            <Restaurants />
          </Route>
        </Switch>
      </Router>
  );
}

export default App;
