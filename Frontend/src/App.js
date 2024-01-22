import { Route, Routes, Navigate } from 'react-router-dom';
import LoginComponent from './Js/Auth/login';
import 'bootstrap/dist/css/bootstrap.css';
import RegistrationForm from './Js/Auth/RegistrationForm';
import Skills from './Js/Skills/Skills'
import Header from './Js/Home/Header';
import Layout from './Js/Home/Layout';
import NoPage from './Js/Home/NoPage';
import AddSkill from './Js/Skills/AddSklill';
import FinalToDo from './Js/ToDo/FinalToDo';
import { useState } from 'react';
import User from './Js/Admin/User';
import AddUser from './Js/Admin/UserForm';

function App() {

  const isAuthenticated = localStorage.getItem('isAuthenticated');
  const isAdmin = localStorage.getItem('isAdmin');


  const [middle,setMiddle] = useState('')

  const privateRoute = (component) => {
    return isAuthenticated ? component : <Navigate to="/login" />;
  };

  const adminProtectedRoutes = (component) => {
    return isAuthenticated && isAdmin ? component : <Navigate to="/login" />;
  };

  return (
    <div className="App">
        <Header pageTitle={`${middle} Management With JWT`} />
      <Routes>
        <Route path="/home" element={privateRoute(<Layout setMiddle={setMiddle}/>)} />
        <Route path="/skills" element={privateRoute(<Skills setMiddle={setMiddle}/>)} />
        <Route path="/login" element={<LoginComponent setMiddle={setMiddle} />} />
        <Route path="/login" element={<LoginComponent setMiddle={setMiddle} />} />
        <Route path="/" element={<LoginComponent setMiddle={setMiddle} />} />
        <Route path="/addskill" element={privateRoute(<AddSkill />)} />
        <Route path="/editskill/:id" element={privateRoute(<AddSkill />)} />
        <Route path="/edituser/:id" element={adminProtectedRoutes(<AddUser />)} />
        <Route path="/adduser" element={adminProtectedRoutes(<AddUser />)} />
        <Route path="/*" element={privateRoute(<NoPage />)} />
        <Route path="/todo" element={privateRoute(<FinalToDo setMiddle={setMiddle}/>)} />
        <Route path="/users" element={adminProtectedRoutes(<User setMiddle={setMiddle}/>)} />
        <Route path="/register" element={<RegistrationForm setMiddle={setMiddle} />} />
      </Routes>
    </div>
  );
}

export default App;
