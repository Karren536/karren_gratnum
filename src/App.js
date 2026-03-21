import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import SignInComponent from './components/SignInComponent';
import SignUpComponent from './components/SignUpComponent';
import MakePaymentComponent from './components/MakePaymentComponent';
import "bootstrap/dist/css/bootstrap.min.css";
import"bootstrap/dist/js/bootstrap.min.js";
import GetProductComponent from './components/GetProductComponent';
import AddProductComponent from './components/AddProductComponent';

function App() {
  return (
   <BrowserRouter>
   <div className="container-fluid">
     <div className="App">
      <header className="App-header">
        <h1>Gratnum Electronics</h1>
      </header>
      <Routes>
        <Route path='/login' element ={<SignInComponent/>} />
        <Route path='/signup' element ={<SignUpComponent/>} />
        <Route path='/makepayment' element ={<MakePaymentComponent/>} />
        <Route path='/' element ={<GetProductComponent/>}/>
        <Route path='/addproduct' element ={<AddProductComponent/>} />
      </Routes>
    </div>
   </div>
   </BrowserRouter>
  );
}

export default App;
