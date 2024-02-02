import { Route, Switch } from 'react-router-dom';
import Home from "./components/Home";
import Nfts from "./components/Nfts";
import Collection from './components/Collection';
import NftAnalytics from './components/NftAnalytics';

function App() {
  return (
    <div>
      <Switch>
        <Route path="/" exact>
          <Home />
        </Route>

        <Route path="/nfts/:network/:address" exact>
          <Nfts />
        </Route>

        <Route path="/collection/:network/:address" exact>
          <Collection />
        </Route>

        <Route path="/analytics/:network/:address/:tokenId" exact>
          <NftAnalytics />
        </Route>
      </Switch>
    </div>
  );
}

export default App;
