import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Initial from './pages/initial';
import Login from './pages/login';
import SignUp from './pages/signup';
import Dashboard from './pages/dashboard';
import Header from './components/header';
import Footer from './components/footer';
import AccountProvider from './providers/account-provider';
import PrivateRoute from './components/private-route';

function App() {
  return (
    <BrowserRouter>
      <AccountProvider>
        <div className="App">
          <Header />
          <div className='routes flex grow'>
            <Routes>
              <Route path='/' element={<Initial />}  />
              <Route path='/signup' element={<SignUp />}  />
              <Route path='/login' element={<Login />}  />
              <Route path='/dashboard' element={
                <PrivateRoute>
                  <Dashboard />
                </PrivateRoute>}
              />
            </Routes>
          </div>
          <Footer />
        </div>
      </AccountProvider>
    </BrowserRouter>
  );
}

export default App;
