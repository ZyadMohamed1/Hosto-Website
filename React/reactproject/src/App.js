import react from 'react';
import Navbar from './components/Navbar';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import './App.css';
import './components/Login/Form.css'
import HomePage from './components/Pages/HomePage'
import Products from './components/Pages/Products';
import Questions from './components/Pages/Questions';
import SignUp from './components/Pages/SignUp';
import Form from './components/Login/Form';
import Footer from './components/Footer';
import Checkout from './components/Products/Checkout';
import FormLogin from './components/Login/FormLogin';
import DetailProductPage from './components/Products/DetailProductPage';
import UploadProductPage from './components/Products/UploadProductPage';




function App() {
  return (
    <>
    <Router>
      <Navbar />
      <switch>
        <Route path='/' exact component={HomePage}/>
        <Route path='/products' component={Products} />
        <Route path='/product/upload' component={UploadProductPage} />
        <Route path='/Details' component={DetailProductPage} />
        <Route path='/Questions' component={Questions} />
        <Route path='/sign-up' component={SignUp} />
        <Route path='/login-page' component={FormLogin} />
        <Route path='/checkout' component={Checkout} />
      </switch>
      </Router>


    </>
  );
}

export default App;
