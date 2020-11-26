import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import { Header } from './components/Header';
import { Main } from './pages/Main';
import { Favorites } from './pages/Favorites';

function App() {
  return (
    <div className='App'>
      <Router>
        <Header />
        <Switch>
          <Route path='/' exact component={Main} />
          <Route path='/favorites' component={Favorites} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
