import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Initial from './pages/initial';
import Login from './pages/login';
import Dashboard from './pages/dashboard';
import Header from './components/header';
import Footer from './components/footer';

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Header />
        <div className='routes flex grow'>
          <Routes>
            <Route path='/' element={<Initial />}  />
            <Route path='/login' element={<Login />}  />
            <Route path='/dashboard' element={<Dashboard />}  />
          </Routes>
        </div>
        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;
