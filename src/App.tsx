import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Layout from './components/layout/Layout';
import HomePage from './pages/HomePage';
import HistoryPage from './pages/HistoryPage';
import AboutEALEAPPage from './pages/AboutEALEAPPage';
import ServicesPage from './pages/ServicesPage';
import ContactUsPage from './pages/ContactUsPage';
import EventsPage from './pages/events.tsx';
import OurTeam from './pages/OurTeamPage.tsx';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route index element={<HomePage />} />
          <Route path="/our-team" element={<OurTeam />} />
          <Route path="/history" element={<HistoryPage />} />
          <Route path="/equine-services" element={<AboutEALEAPPage />} />
          <Route path="/events" element={<EventsPage />} />
          <Route path="/services" element={<ServicesPage />} />
          <Route path="/contact" element={<ContactUsPage />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
