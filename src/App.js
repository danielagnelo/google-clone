import './App.css';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Home from './Components/Home/Home';
import Footer from './Components/Footer/Footer';
import SearchPage from './Components/SearchResults/SearchPage';
import SearchResults from './Components/SearchResults/SearchResults';

export default function App() {
  return (
    <Router>
      <Switch>
        <Route path='/search/image'>
          <SearchPage />
        </Route>
        <Route path='/search'>
          <SearchPage />
          <SearchResults />
        </Route>
        <Route path='/'>
          <Home />
        </Route>
      </Switch>
      <Footer />
    </Router>
  )
}
