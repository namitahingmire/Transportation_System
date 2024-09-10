import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './components/login/login';
import Register from './components/register/register';
import Home from './components/home/home';
import Navbar from './components/navbar/navbar';
import Logout from './components/logout/logout';
import NewRequest from './components/provider/new-request/new-request';
import MyRequest from './components/provider/my-request/my-request';
import CompletedRequest from './components/provider/completed-request/completed-request';
import AcceptRequest from './components/transporter/accept-request/accept-request';
import RequestDetails from './components/transporter/request-details/request-details';
import ViewBids from './components/provider/view-bids/view-bids';
import InTransistRequest from './components/provider/in-transist-request/in-transist-request';

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path='/' element={<Login />}></Route>
        <Route path='/register' element={<Register />}></Route>
        <Route path='/home' element={<Home />}></Route>
        <Route path='/logout' element={<Logout />}></Route>
        <Route path='/new-request' element={<NewRequest />}></Route>
        <Route path='/my-request' element={<MyRequest />}></Route>
        <Route path='/completed-request' element={<CompletedRequest />}></Route>
        <Route path='/accept-request' element={<AcceptRequest />}></Route>
        <Route path='/request-details/:data' element={<RequestDetails />}></Route>
        <Route path='/view-bids/:id' element={<ViewBids />}></Route>
        <Route path='/in-tansist-request' element={<InTransistRequest />}></Route>
        <Route path='/pending-bids' element={<InTransistRequest />}></Route>
      </Routes >
    </BrowserRouter >
  );
}

export default App;
