import {ApolloClient, InMemoryCache, ApolloProvider} from "@apollo/client"
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import HomePage from './pages/Homepage'
import ReviewDetails from './pages/ReviewDetails'
import Category from './pages/Category'
import SiteHeader from './component/SiteHeader'
const client = new ApolloClient({
  uri : 'http://localhost:1337/graphql',
  cache : new InMemoryCache()
})
function App() {
 
  return (
    <div className="App">
      <Router>
      <ApolloProvider client={client}  >
        <SiteHeader />
        <Switch>
          <Route exact path="/">
            <HomePage />
          </Route>
          <Route path="/details/:id">
            <ReviewDetails />
          </Route>
          <Route path="/category/:id">
            <Category />
          </Route>
        </Switch>
        </ApolloProvider>
      </Router>
    </div>
  );
}

export default App;
