import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom'
import { AnimatePresence } from 'framer-motion'
import { AuthProvider } from './context/AuthContext'

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
import ManageContact from './pages/admin/ManageContact'
import ManageEvents from './pages/admin/ManageEvents'

import Navbar from './components/Navbar'
import Footer from './components/Footer'
import ProtectedRoute from './components/ProtectedRoute'
import Grain from './components/Grain'
import PageTransition from './components/PageTransition'

function AnimatedRoutes() {
  const location = useLocation()

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        {/* Public pages — Navbar + Footer */}
        <Route path="/" element={<PageTransition><Navbar /><Home /><Footer /></PageTransition>} />
        <Route path="/about" element={<PageTransition><Navbar /><About /><Footer /></PageTransition>} />
        <Route path="/artists" element={<PageTransition><Navbar /><Artists /><Footer /></PageTransition>} />
        <Route path="/artists/:id" element={<PageTransition><Navbar /><ArtistProfile /><Footer /></PageTransition>} />
        <Route path="/music" element={<PageTransition><Navbar /><Music /><Footer /></PageTransition>} />
        <Route path="/events" element={<PageTransition><Navbar /><Events /><Footer /></PageTransition>} />
        <Route path="/booking" element={<PageTransition><Navbar /><Booking /><Footer /></PageTransition>} />
        <Route path="/contact" element={<PageTransition><Navbar /><Contact /><Footer /></PageTransition>} />

        {/* Admin pages */}
        <Route path="/admin" element={<Login />} />
        <Route path="/admin/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
        <Route path="/admin/artists" element={<ProtectedRoute><ManageArtists /></ProtectedRoute>} />
        <Route path="/admin/releases" element={<ProtectedRoute><ManageReleases /></ProtectedRoute>} />
        <Route path="/admin/bookings" element={<ProtectedRoute><ManageBookings /></ProtectedRoute>} />
        <Route path="/admin/subscribers" element={<ProtectedRoute><Subscribers /></ProtectedRoute>} />
        <Route path="/admin/contact" element={<ProtectedRoute><ManageContact /></ProtectedRoute>} />
        <Route path="/admin/events" element={<ProtectedRoute><ManageEvents /></ProtectedRoute>} />
      </Routes>
    </AnimatePresence>
  )
}

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Grain />
        <AnimatedRoutes />
      </BrowserRouter>
    </AuthProvider>
  )
}
