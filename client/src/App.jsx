import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import SignIn from './pages/SignIn'
import SignUp from './pages/SignUp'
import About from './pages/About'
import Profile from './pages/Profile'
import Contact from './pages/Contact'
import Service from './pages/Service'
import CreateListing from './pages/CreateListing'
import UpdateListing from './pages/UpdateListing'
import Header from './components/header/Header'
import Footer from './components/footer/Footer'
import PrivateRoute from './components/PrivateRoute'

const App = () => {
  return (
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/home' element={<Home />} />
          <Route path='/sign-in' element={<SignIn />} />
          <Route path='/sign-up' element={<SignUp />} />
          <Route path='/contact' element={<Contact />} />
          <Route path='/about' element={<About />} />
          <Route path='/services' element={<Service />} />
          {/* <Route path='/listing/:listingId' element={<Listing />} /> */}

          <Route element={<PrivateRoute />}>
            <Route path='/profile' element={<Profile />} />
            <Route path='/create-listing' element={<CreateListing />} />
            <Route
              path='/update-listing/:listingId'
              element={<UpdateListing />}
            />
          </Route>
        </Routes>
        <Footer />
      </BrowserRouter>
  )
}

export default App