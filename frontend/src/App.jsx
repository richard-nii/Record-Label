import { BrowserRouter, Routes, Route } from 'react-router-dom'

import Home from './pages/Home'
import About from './pages/About'
import Artists from './pages/Artists'
import ArtistProfile from './pages/ArtistProfile'
import Music from './pages/Music'
import Events from './pages/Events'
import Booking from './pages/Booking'
import Contact from './pages/Contact'

import Login from './pages/admin/Login'
import Dashboard from './pages/admin/Dashboard'
import ManageBookings from './pages/admin/ManageBookings'
import ManageArtists from './pages/admin/ManageArtists'
import ManageReleases from './pages/admin/ManageReleases'
import Subscribers from './pages/admin/Subscribers'

import Navbar from './components/Navbar'
import Footer from './components/Footer'
import ProtectedRoute from './components/ProtectedRoute'

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public pages */}
        <Route path="/" element={<><Navbar/><Home/><Footer/></>} />
        <Route path="/about" element={<><Navbar/><About/><Footer/></>} />
        <Route path="/artists" element={<><Navbar/><Artists/><Footer/></>} />
        <Route path="/artists/:id" element={<><Navbar/><ArtistProfile/><Footer/></>} />
        <Route path="/music" element={<><Navbar/><Music/><Footer/></>} />
        <Route path="/events" element={<><Navbar/><Events/><Footer/></>} />
        <Route path="/booking" element={<><Navbar/><Booking/><Footer/></>} />
        <Route path="/contact" element={<><Navbar/><Contact/><Footer/></>} />

        {/* Admin pages */}
        <Route path="/admin" element={<Login/>} />
        <Route path="/admin/dashboard" element={<ProtectedRoute><Dashboard/></ProtectedRoute>} />
        <Route path="/admin/bookings" element={<ProtectedRoute><ManageBookings/></ProtectedRoute>} />
        <Route path="/admin/artists" element={<ProtectedRoute><ManageArtists/></ProtectedRoute>} />
        <Route path="/admin/releases" element={<ProtectedRoute><ManageReleases/></ProtectedRoute>} />
        <Route path="/admin/subscribers" element={<ProtectedRoute><Subscribers/></ProtectedRoute>} />
      </Routes>
    </BrowserRouter>
  )
}