import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Header from './components/Header';
import Adduser from './components/Adduser';
import AllUser from './components/AllUser';
import EditUser from './components/EditUser';
import Register from './pages/Register';
import Login from './pages/Login'
function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/add" element={<Adduser />} />
        <Route path='/all' element={<AllUser />} />
        <Route path='/edit/:id' element={<EditUser />} />
        <Route path='/register' element={<Register />} />
        <Route path='/login' element={<Login />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
