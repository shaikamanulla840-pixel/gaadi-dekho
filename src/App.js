import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Auth from './pages/Auth';
import TwoWheelerList from './pages/TwoWheelerList';
import ProductPage from './pages/ProductPage';
import TwoWheelerForm from './pages/TwoWheelerForm';
import ShowroomList from './pages/ShowroomList';
import ShowroomForm from './pages/ShowroomForm';
import TestRideForm from './pages/TestRideForm';
import Dashboard from './pages/Dashboard';
import CompareModels from './pages/CompareModels';
import Calculators from './pages/Calculators';
import UsedBikesList from './pages/UsedBikesList';
import SellUsedBikeForm from './pages/SellUsedBikeForm';
import UpcomingLaunches from './pages/UpcomingLaunches';
import Favorites from './pages/Favorites';
import Navbar from './components/Navbar';
import EditVehicleForm from './pages/EditVehicleForm';
import AboutPage from './pages/AboutPage';

function App() {
  return (
    <Router>
      <div className="animated-gradient">
        <Navbar />
        <main>
          <Routes>
            <Route path="/" element={<TwoWheelerList />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/auth" element={<Auth />} />
            <Route path="/product/:id" element={<ProductPage />} />
            <Route path="/add-two-wheeler" element={<TwoWheelerForm />} />
            <Route path="/edit-vehicle/:id" element={<EditVehicleForm />} />
            <Route path="/showrooms" element={<ShowroomList />} />
            <Route path="/add-showroom" element={<ShowroomForm />} />
            <Route path="/book-test-ride" element={<TestRideForm />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/compare" element={<CompareModels />} />
            <Route path="/calculators" element={<Calculators />} />
            <Route path="/used-bikes" element={<UsedBikesList />} />
            <Route path="/sell-used-bike" element={<SellUsedBikeForm />} />
            <Route path="/upcoming-launches" element={<UpcomingLaunches />} />
            <Route path="/favorites" element={<Favorites />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;