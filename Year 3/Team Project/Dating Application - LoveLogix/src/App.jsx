import React from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from './config/firebase';

import { Main } from './pages/main';
import { Login } from './pages/login';
import { Signup } from './pages/signup';
import { Navbar } from './components/navbar';
import { CreateForm } from './pages/create/createForm';
import { ReceiveUser } from './pages/retrieve/receiveUser';
import { UpdateForm } from './pages/update/updateForm';
import { DeleteAccount } from './pages/delete/deleteAccount';
import { AboutUs } from './pages/about-us';
import { MyAccount } from './pages/myAccount';
import { WIP } from './pages/WIP';
import { ForgotPassword } from './pages/forgot-password';

function App() {
  const [user, loading] = useAuthState(auth);

  // Display a loading indicator while checking the auth state
  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <div className="App">
      <Router>
        <Navbar />
        <Routes>
          {/* Redirect based on user authentication */}
          <Route path="/" element={user ? <Main /> : <Navigate to="/login" replace />} />

          {/* Public Routes */}
          <Route path="/login" element={<Login />} />
          <Route path="/create-account" element={<Signup />} />

          {/* Protected Routes */}
          <Route path="/userForm" element={user ? <CreateForm /> : <Navigate to="/login" replace />} />
          <Route path="/findAMatch" element={user ? <ReceiveUser /> : <Navigate to="/login" replace />} />
          <Route path="/updateForm" element={user ? <UpdateForm /> : <Navigate to="/login" replace />} />
          <Route path="/deleteAccount" element={user ? <DeleteAccount /> : <Navigate to="/login" replace />} />
          <Route path="/about_us" element={<AboutUs />} />
          <Route path="/myAccount" element={user ? <MyAccount /> : <Navigate to="/login" replace />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/WIP" element={<WIP />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
