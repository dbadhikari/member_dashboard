import React from 'react'
import DashboardLayout from './pages/DashboardLayout'
import { Routes, Route } from "react-router-dom";
import Overview from './pages/Overview';
import Eligible from './pages/Eligible';
import MemberShip from './pages/MemberShip';
import Meetings from './pages/Meetings';
import Navbar from './Components/Navbar';
import Events from './pages/Events';
import Training from './pages/Training';
import Resources from './pages/Resources';
import Branches from './pages/Branches';

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
        <Route path="events" element={<Events/>}/>
        <Route path="training" element={<Training/>}/>
        <Route path="resources" element={<Resources/>}/>
        <Route path="branches" element={<Branches/>}/>
      </Route>
    </Routes>
    </div>
  )
}

export default App