import react from 'react';
import Navbar from './components/Navbar';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import './App.css';
import HomePage from './components/Pages/HomePage'
import Products from './components/Pages/Products';
import Questions from './components/Pages/Questions';
import SignUp from './components/Pages/SignUp';



function App() {
  return (
    <>
    <Router>
      <Navbar />
      <switch>
        <Route path='/' exact component={HomePage}/>
        <Route path='/Products' component={Products} />
        <Route path='/Questions' component={Questions} />
        <Route path='/sign-up' component={SignUp} />
      </switch>
      </Router>

    </>
  );
}

export default App;
