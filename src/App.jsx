import React from 'react'
import DashboardLayout from './pages/DashboardLayout'
import { Routes, Route } from "react-router-dom";
import Overview from './pages/Overview';
import Eligible from './pages/Eligible';
import MemberShip from './pages/MemberShip';
import Meetings from './pages/Meetings';
import Navbar from './Components/Navbar';

const App = () => {
  return (
    <div>
      <Navbar/>
       <Routes>
      <Route path="/" element={<DashboardLayout />}>
        <Route index element={<Overview />} />
        <Route path="eligible" element={<Eligible />} />
        <Route path="membership" element={<MemberShip />} />
        <Route path="meetings" element={<Meetings />} />
    
      </Route>
    </Routes>
    </div>
  )
}

export default App