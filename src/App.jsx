import { BrowserRouter, Routes, Route } from "react-router-dom";
import Evenement from "./pages utilisateurs/Evenement"
import NavBar from "./composants/navbar"
import Admin from "./pages admin/Admin"
import Dashboard from "./pages admin/Dashboard";
import Login from "./pages admin/Login";
import ProtectedRoute from "./composants/ProtectedRoute";

import "./App.css"

function App() {
  

  return (
    <BrowserRouter>
      <NavBar/>
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/admin" element={<ProtectedRoute><Admin/></ProtectedRoute>}/>
      <Route path="/dashboard" element={<ProtectedRoute><Dashboard/></ProtectedRoute>}/>
      <Route path="/evenement"  element={<Evenement/>}/>

    </Routes>
    </BrowserRouter>
  )
}

export default App
