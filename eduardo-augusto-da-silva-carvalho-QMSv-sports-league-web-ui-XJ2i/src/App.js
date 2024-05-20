import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Schedule from './pages/Schedule';
import Leaderboard from './pages/Leaderboard';
import NotFound from './pages/NotFound';

function App() {
  return React.createElement(
    Routes,
    null,
    React.createElement(Route, { path: '/', element: React.createElement(Schedule) }),
    React.createElement(Route, { path: '/schedule', element: React.createElement(Schedule) }),
    React.createElement(Route, { path: '/leaderboard', element: React.createElement(Leaderboard) }),
    React.createElement(Route, { path: '*', element: React.createElement(NotFound) })
  );
}

export default App;
