import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { Tournaments } from './pages/Tournaments/Tournaments';
import { TournamentDetail } from './pages/TournamentDetail/TournamentDetail';

export const Routing = () => {
  return (
    <Routes>
      <Route path="/" element={<Tournaments />} />
      <Route path="/tournaments" element={<Tournaments />} />
      <Route path="/tournament/:tournamentId" element={<TournamentDetail />} />
    </Routes>
  );
};
