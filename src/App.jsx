import { Routes, Route } from "react-router-dom"
import "./App.css"
import Signup from "./auth/Signup"
import Login from "./auth/Login"
import Dashboard from "./Dashboard"
import { ToastContainer } from 'react-toastify';
import ContactList from "./contact/ContactList"
import AddContact from "./contact/AddContact"
import Home from "./Home"
import ContactDetail from "./contact/ContactDetail"


const App = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Signup />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />}>
          <Route path="" element={<Home />} />
          <Route path="home" element={<Home />} />
          <Route path="addContact" element={<AddContact />} />
          <Route path="contactList" element={<ContactList/>} />
          <Route path="contactDetail/:id" element={<ContactDetail/>} />
          <Route path="edit" element={<AddContact/>}/>
        </Route>

      </Routes>
      <ToastContainer />
    </div >
  )
}

export default App