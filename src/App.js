import { Route, Routes } from 'react-router-dom';
import './App.css';
import { CreateItem } from './components/create-item/CreateItem';
import HomePage from './components/home-page/HomePage';
import { Login } from './components/login-page/login';
import { TopMenu } from './components/top-menu/TopMenu';

function App() {
  
  return (
    <>
      <TopMenu />
      <Routes>
        <Route path="/login" element={<Login/>} />
        <Route path="/create" element={<CreateItem/>} />
        <Route path="/" element={<HomePage />}> 
          <Route path="/requests" element={<HomePage/>} />
          <Route path="/users" element={<HomePage/>} />
        </Route>
      </Routes>
      
    </>
  );
}

export default App;
