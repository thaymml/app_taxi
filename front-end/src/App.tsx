import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import RequestForm from './components/RequestForm';
import RideOptions from './components/RideOptions';
import RideHistory from './components/RideHistory';
import './styles.css';

const App: React.FC = () => {
  const [rideOptions, setRideOptions] = useState<any>(null);
  const [routeResponse, setRouteResponse] = useState<any>(null);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<RequestForm setRideOptions={setRideOptions} setRouteResponse={setRouteResponse} />} />
        <Route path="/options" element={<RideOptions routeResponse={routeResponse} options={rideOptions} />} />
        <Route path="/history" element={<RideHistory />} />
      </Routes>
    </Router>
  );
};

export default App;
